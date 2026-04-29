'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Link from 'next/link';
import {
  US_STATES,
  CUSTODIANS,
  PII_TYPES,
  SERVICE_TYPES,
  type FirmData,
  type ServiceProvider,
} from '@/lib/types';

const STEPS = ['Firm Basics', 'Key Personnel', 'Data & Custodians', 'Service Providers', 'Review'];

const defaultProvider: ServiceProvider = { name: '', serviceType: '', description: '' };

export default function StartPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1: Firm Basics
  const [legalName, setLegalName] = useState('');
  const [secNumber, setSecNumber] = useState('');
  const [crdNumber, setCrdNumber] = useState('');
  const [state, setState] = useState('');
  const [aumRange, setAumRange] = useState('');
  const [employees, setEmployees] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  // Step 2: Key Personnel
  const [ccoName, setCcoName] = useState('');
  const [ccoEmail, setCcoEmail] = useState('');
  const [ccoPhone, setCcoPhone] = useState('');
  const [itName, setItName] = useState('');
  const [itEmail, setItEmail] = useState('');

  // Step 3: Data & Custodians
  const [custodian, setCustodian] = useState('');
  const [otherCustodians, setOtherCustodians] = useState('');
  const [piiTypes, setPiiTypes] = useState<string[]>([]);

  // Step 4: Service Providers
  const [providers, setProviders] = useState<ServiceProvider[]>([
    { ...defaultProvider },
    { ...defaultProvider },
  ]);

  // Email for delivery
  const [email, setEmail] = useState('');

  function togglePii(type: string) {
    setPiiTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function updateProvider(index: number, field: keyof ServiceProvider, value: string) {
    setProviders((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function addProvider() {
    setProviders((prev) => [...prev, { ...defaultProvider }]);
  }

  function removeProvider(index: number) {
    if (providers.length <= 1) return;
    setProviders((prev) => prev.filter((_, i) => i !== index));
  }

  function validateStep(): boolean {
    const errs: Record<string, string> = {};

    if (step === 0) {
      if (!legalName.trim()) errs.legalName = 'Required';
      if (!state) errs.state = 'Required';
      if (!aumRange) errs.aumRange = 'Select your AUM range';
      if (!employees) errs.employees = 'Required';
      if (!address.trim()) errs.address = 'Required';
      if (!phone.trim()) errs.phone = 'Required';
    } else if (step === 1) {
      if (!ccoName.trim()) errs.ccoName = 'Required';
      if (!ccoEmail.trim()) errs.ccoEmail = 'Required';
      if (!ccoPhone.trim()) errs.ccoPhone = 'Required';
    } else if (step === 2) {
      if (!custodian) errs.custodian = 'Select your primary custodian';
      if (piiTypes.length === 0) errs.pii = 'Select at least one type of data';
    } else if (step === 3) {
      const hasAny = providers.some((p) => p.name.trim());
      if (!hasAny) errs.providers = 'Add at least one service provider';
    } else if (step === 4) {
      if (!email.trim()) errs.email = 'Required for document delivery';
      if (email && !email.includes('@')) errs.email = 'Enter a valid email';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep()) return;
    setSubmitting(true);

    const firmData: FirmData = {
      legalName,
      secRegistrationNumber: secNumber || undefined,
      crdNumber: crdNumber || undefined,
      stateOfRegistration: state,
      aumRange: aumRange as FirmData['aumRange'],
      numberOfEmployees: parseInt(employees),
      firmAddress: address,
      firmPhone: phone,
      firmWebsite: website || undefined,
      ccoName,
      ccoEmail,
      ccoPhone,
      itContactName: itName || undefined,
      itContactEmail: itEmail || undefined,
      primaryCustodian: custodian,
      otherCustodians: otherCustodians ? otherCustodians.split(',').map((s) => s.trim()) : undefined,
      piiTypes,
      serviceProviders: providers.filter((p) => p.name.trim()),
    };

    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firmData, email }),
      });
      const { sessionId } = await res.json();

      // Redirect to Stripe checkout
      const checkoutRes = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const { url } = await checkoutRes.json();

      if (url) {
        window.location.href = url;
      } else {
        // If Stripe isn't configured, go directly to results (dev mode)
        router.push(`/results/${sessionId}`);
      }
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="border-b border-navy-border">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield size={22} className="text-cyan" />
            <span className="font-bold font-[family-name:var(--font-heading)] text-white text-lg">
              RegShield
            </span>
          </Link>
          <span className="text-sm text-slate-500">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Progress bar */}
        <div className="flex gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-2">
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${
                  i <= step ? 'bg-cyan' : 'bg-navy-border'
                }`}
              />
              <span
                className={`text-xs hidden sm:block ${
                  i <= step ? 'text-cyan' : 'text-slate-500'
                }`}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* Step 0: Firm Basics */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-2">
                About Your Firm
              </h2>
              <p className="text-slate-400">
                Basic information about your registered investment adviser firm.
              </p>
            </div>

            <Input
              label="Firm Legal Name"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              placeholder="e.g. Smith Capital Advisors, LLC"
              error={errors.legalName}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="SEC Registration Number"
                optional
                value={secNumber}
                onChange={(e) => setSecNumber(e.target.value)}
                placeholder="801-XXXXX"
              />
              <Input
                label="CRD Number"
                optional
                value={crdNumber}
                onChange={(e) => setCrdNumber(e.target.value)}
                placeholder="e.g. 123456"
              />
            </div>

            <Select
              label="State of Registration"
              value={state}
              onChange={(e) => setState(e.target.value)}
              options={US_STATES}
              placeholder="Select state..."
              error={errors.state}
            />

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Assets Under Management (AUM)
              </label>
              {errors.aumRange && <p className="text-sm text-red-400 mb-2">{errors.aumRange}</p>}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '<100m', label: 'Under $100M' },
                  { value: '100m-500m', label: '$100M - $500M' },
                  { value: '500m-1b', label: '$500M - $1B' },
                  { value: '1b-1.5b', label: '$1B - $1.5B' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAumRange(opt.value)}
                    className={`p-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                      aumRange === opt.value
                        ? 'border-cyan bg-cyan/10 text-cyan'
                        : 'border-navy-border bg-navy-card text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Number of Employees"
              type="number"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
              placeholder="e.g. 8"
              error={errors.employees}
            />

            <Input
              label="Firm Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, Suite 200, City, ST 12345"
              error={errors.address}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Firm Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                error={errors.phone}
              />
              <Input
                label="Firm Website"
                optional
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="www.yourfirm.com"
              />
            </div>
          </div>
        )}

        {/* Step 1: Key Personnel */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-2">
                Key Personnel
              </h2>
              <p className="text-slate-400">
                Identify the individuals responsible for your firm&apos;s compliance and IT security.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-navy-card border border-navy-border space-y-4">
              <h3 className="text-lg font-semibold text-white">Chief Compliance Officer</h3>
              <Input
                label="Full Name"
                value={ccoName}
                onChange={(e) => setCcoName(e.target.value)}
                placeholder="Jane Smith"
                error={errors.ccoName}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={ccoEmail}
                  onChange={(e) => setCcoEmail(e.target.value)}
                  placeholder="jane@yourfirm.com"
                  error={errors.ccoEmail}
                />
                <Input
                  label="Phone"
                  value={ccoPhone}
                  onChange={(e) => setCcoPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  error={errors.ccoPhone}
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-navy-card border border-navy-border space-y-4">
              <h3 className="text-lg font-semibold text-white">
                IT / Security Contact <span className="text-slate-500 text-sm font-normal">(optional)</span>
              </h3>
              <Input
                label="Full Name"
                optional
                value={itName}
                onChange={(e) => setItName(e.target.value)}
                placeholder="John Doe"
              />
              <Input
                label="Email"
                optional
                type="email"
                value={itEmail}
                onChange={(e) => setItEmail(e.target.value)}
                placeholder="john@yourfirm.com"
              />
            </div>
          </div>
        )}

        {/* Step 2: Data & Custodians */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-2">
                Data & Custodians
              </h2>
              <p className="text-slate-400">
                Tell us about the custodians you work with and the types of customer data your firm handles.
              </p>
            </div>

            <Select
              label="Primary Custodian"
              value={custodian}
              onChange={(e) => setCustodian(e.target.value)}
              options={CUSTODIANS}
              placeholder="Select custodian..."
              error={errors.custodian}
            />

            <Input
              label="Other Custodians"
              optional
              value={otherCustodians}
              onChange={(e) => setOtherCustodians(e.target.value)}
              placeholder="Separate multiple with commas"
            />

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Types of Customer PII Held
              </label>
              {errors.pii && <p className="text-sm text-red-400 mb-2">{errors.pii}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PII_TYPES.map((type) => (
                  <Checkbox
                    key={type}
                    label={type}
                    checked={piiTypes.includes(type)}
                    onChange={() => togglePii(type)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Service Providers */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-2">
                Service Providers
              </h2>
              <p className="text-slate-400">
                List the third-party service providers that have access to your customer data or systems.
              </p>
            </div>

            {errors.providers && <p className="text-sm text-red-400">{errors.providers}</p>}

            <div className="space-y-4">
              {providers.map((provider, i) => (
                <div key={i} className="p-5 rounded-xl bg-navy-card border border-navy-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-400">Provider {i + 1}</span>
                    {providers.length > 1 && (
                      <button
                        onClick={() => removeProvider(i)}
                        className="text-xs text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <Input
                    label="Provider Name"
                    value={provider.name}
                    onChange={(e) => updateProvider(i, 'name', e.target.value)}
                    placeholder="e.g. Orion Advisor Tech"
                  />
                  <Select
                    label="Service Type"
                    value={provider.serviceType}
                    onChange={(e) => updateProvider(i, 'serviceType', e.target.value)}
                    options={SERVICE_TYPES}
                    placeholder="Select type..."
                  />
                  <Input
                    label="Description"
                    optional
                    value={provider.description || ''}
                    onChange={(e) => updateProvider(i, 'description', e.target.value)}
                    placeholder="Brief description of services"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={addProvider}
              className="w-full p-4 rounded-xl border-2 border-dashed border-navy-border text-slate-500 hover:border-slate-500 hover:text-slate-400 transition-colors text-sm cursor-pointer"
            >
              + Add Another Provider
            </button>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-2">
                Review & Checkout
              </h2>
              <p className="text-slate-400">
                Review your information, then proceed to payment. Your documents will be generated immediately after.
              </p>
            </div>

            {/* Summary cards */}
            <div className="space-y-4">
              <SummaryCard title="Firm" onEdit={() => setStep(0)}>
                <SummaryRow label="Name" value={legalName} />
                <SummaryRow label="State" value={state} />
                <SummaryRow label="AUM" value={aumRange} />
                <SummaryRow label="Employees" value={employees} />
              </SummaryCard>

              <SummaryCard title="Personnel" onEdit={() => setStep(1)}>
                <SummaryRow label="CCO" value={ccoName} />
                <SummaryRow label="CCO Email" value={ccoEmail} />
                {itName && <SummaryRow label="IT Contact" value={itName} />}
              </SummaryCard>

              <SummaryCard title="Data & Custodians" onEdit={() => setStep(2)}>
                <SummaryRow label="Primary Custodian" value={custodian} />
                <SummaryRow label="PII Types" value={`${piiTypes.length} selected`} />
              </SummaryCard>

              <SummaryCard title="Service Providers" onEdit={() => setStep(3)}>
                <SummaryRow
                  label="Providers"
                  value={providers.filter((p) => p.name.trim()).map((p) => p.name).join(', ') || 'None'}
                />
              </SummaryCard>
            </div>

            {/* Email */}
            <div className="p-6 rounded-xl bg-navy-card border border-cyan/20 space-y-4">
              <h3 className="text-lg font-semibold text-white">Delivery Email</h3>
              <p className="text-sm text-slate-400">
                We&apos;ll also send your documents to this email for safekeeping.
              </p>
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourfirm.com"
                error={errors.email}
              />
            </div>

            {/* Price */}
            <div className="p-6 rounded-xl bg-cyan/5 border border-cyan/20 flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-white">Complete Compliance Kit</div>
                <div className="text-sm text-slate-400">4 SEC Regulation S-P documents</div>
              </div>
              <div className="text-3xl font-bold font-[family-name:var(--font-heading)] text-white">
                $299
              </div>
            </div>

            {errors.submit && (
              <div className="p-4 rounded-lg bg-red-400/10 border border-red-400/30 text-red-400 text-sm">
                {errors.submit}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-navy-border">
          {step > 0 ? (
            <Button variant="ghost" onClick={prev} className="gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
          ) : (
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft size={16} /> Home
              </Button>
            </Link>
          )}

          {step < STEPS.length - 1 ? (
            <Button onClick={next} className="gap-2">
              Continue <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              variant="secondary"
              size="lg"
              className="gap-2"
            >
              {submitting ? (
                'Processing...'
              ) : (
                <>
                  <Check size={18} /> Pay $299 & Generate
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-xl bg-navy-card border border-navy-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white">{title}</h3>
        <button onClick={onEdit} className="text-xs text-cyan hover:underline cursor-pointer">
          Edit
        </button>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-300">{value}</span>
    </div>
  );
}
