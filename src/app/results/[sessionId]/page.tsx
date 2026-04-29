'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {
  Shield,
  Download,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Eye,
  Bell,
  Archive,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { DOC_TYPE_LABELS, type DocumentType } from '@/lib/types';

const DOC_ICONS: Record<DocumentType, typeof ShieldAlert> = {
  'incident-response': ShieldAlert,
  'vendor-oversight': Eye,
  'breach-notification': Bell,
  'recordkeeping': Archive,
};

interface DocumentInfo {
  id: string;
  doc_type: DocumentType;
  generated_at: string;
}

type Status = 'checking' | 'generating' | 'ready' | 'error';

export default function ResultsPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [status, setStatus] = useState<Status>('checking');
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const checkDocuments = useCallback(async () => {
    try {
      const res = await fetch(`/api/documents/${sessionId}`);
      if (!res.ok) throw new Error('Failed to fetch documents');
      const data = await res.json();
      if (data.documents && data.documents.length >= 4) {
        setDocuments(data.documents);
        setStatus('ready');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [sessionId]);

  const triggerGeneration = useCallback(async () => {
    setStatus('generating');
    setProgress(0);

    // Simulate progress while waiting
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 90));
    }, 1000);

    try {
      const res = await fetch(`/api/generate/${sessionId}`, { method: 'POST' });
      clearInterval(progressInterval);

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 402) {
          setError('Payment required. Please complete checkout first.');
          setStatus('error');
          return;
        }
        throw new Error(data.error || 'Generation failed');
      }

      setProgress(100);

      // Fetch the generated documents
      const docsReady = await checkDocuments();
      if (!docsReady) {
        // Try once more after a brief delay
        await new Promise((r) => setTimeout(r, 2000));
        await checkDocuments();
      }
      setStatus('ready');
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }, [sessionId, checkDocuments]);

  useEffect(() => {
    async function init() {
      // First check if documents already exist
      const exists = await checkDocuments();
      if (!exists) {
        // Documents don't exist yet, trigger generation
        await triggerGeneration();
      }
    }
    init();
  }, [checkDocuments, triggerGeneration]);

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="border-b border-navy-border">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Shield size={22} className="text-cyan" />
            <span className="font-bold font-[family-name:var(--font-heading)] text-white text-lg">
              RegShield
            </span>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Generating state */}
        {status === 'checking' && (
          <div className="text-center py-20">
            <Loader2 size={40} className="text-cyan animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Checking your documents...</p>
          </div>
        )}

        {status === 'generating' && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-cyan" />
            </div>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-3">
              Generating Your Documents
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Our AI is analyzing your firm profile and generating all four SEC Regulation S-P
              policy documents. This typically takes 30-60 seconds.
            </p>

            {/* Progress bar */}
            <div className="max-w-md mx-auto mb-6">
              <div className="h-2 bg-navy-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan to-emerald rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Analyzing firm profile</span>
                <span>{progress}%</span>
              </div>
            </div>

            <div className="space-y-3 max-w-sm mx-auto text-left">
              {(['incident-response', 'vendor-oversight', 'breach-notification', 'recordkeeping'] as DocumentType[]).map(
                (type, i) => {
                  const generating = progress > i * 22;
                  const done = progress > (i + 1) * 22;
                  return (
                    <div
                      key={type}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        generating ? 'bg-navy-card border border-navy-border' : 'opacity-40'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 size={18} className="text-emerald shrink-0" />
                      ) : generating ? (
                        <Loader2 size={18} className="text-cyan animate-spin shrink-0" />
                      ) : (
                        <div className="w-[18px] h-[18px] rounded-full border border-navy-border shrink-0" />
                      )}
                      <span className="text-sm text-slate-300">
                        {DOC_TYPE_LABELS[type]}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-red-400" />
            </div>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-3">
              Generation Failed
            </h2>
            <p className="text-slate-400 mb-8">{error}</p>
            <Button onClick={triggerGeneration}>Try Again</Button>
          </div>
        )}

        {/* Ready state */}
        {status === 'ready' && (
          <div>
            <div className="text-center mb-10">
              <div className="w-20 h-20 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-emerald" />
              </div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-3">
                Your Documents Are Ready
              </h2>
              <p className="text-slate-400">
                Download your SEC Regulation S-P compliance documents below.
                Each document is tailored to your firm and formatted for SEC examination.
              </p>
            </div>

            <div className="space-y-4">
              {documents.map((doc) => {
                const Icon = DOC_ICONS[doc.doc_type] || FileText;
                return (
                  <div
                    key={doc.id}
                    className="p-6 rounded-xl bg-navy-card border border-navy-border hover:border-cyan/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                          <Icon size={22} className="text-cyan" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {DOC_TYPE_LABELS[doc.doc_type]}
                          </h3>
                          <p className="text-xs text-slate-500">
                            Generated{' '}
                            {new Date(doc.generated_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <a href={`/api/pdf/${doc.id}`} download>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download size={14} />
                          PDF
                        </Button>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Download all */}
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-500 mt-4">
                These documents are compliance templates based on published SEC guidance.
                Review with qualified legal counsel before implementation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
