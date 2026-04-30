import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import ComplianceChecker from '@/components/tools/ComplianceChecker';

export const metadata: Metadata = {
  title: 'Reg S-P Compliance Readiness Checker | RegShield',
  description:
    'Free interactive assessment for RIAs. Find out how ready you are for the SEC Regulation S-P deadline on June 3, 2026. Takes 3 minutes, no signup required.',
  openGraph: {
    title: 'Reg S-P Compliance Readiness Checker | RegShield',
    description:
      'Free interactive assessment for RIAs. Find out how ready you are for the SEC Regulation S-P deadline on June 3, 2026.',
    type: 'website',
    url: 'https://regshield.co/tools/compliance-checker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reg S-P Compliance Readiness Checker | RegShield',
    description:
      'Free interactive assessment for RIAs. Find out how ready you are for the SEC Regulation S-P deadline.',
  },
  alternates: {
    canonical: 'https://regshield.co/tools/compliance-checker',
  },
};

function WebAppSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reg S-P Compliance Readiness Checker',
    description:
      'Free interactive compliance readiness assessment for SEC Regulation S-P. Evaluates incident response, vendor oversight, breach notification, and recordkeeping readiness.',
    url: 'https://regshield.co/tools/compliance-checker',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RegShield',
      url: 'https://regshield.co',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ComplianceCheckerPage() {
  return (
    <>
      <WebAppSchema />
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <ComplianceChecker />
      </main>
      <Footer />
    </>
  );
}
