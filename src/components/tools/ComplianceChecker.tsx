'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ClipboardCheck,
  Users,
  Bell,
  FileText,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// ─── Types ──────────────────────────────────────────────────────────────

type Answer = 'yes' | 'partially' | 'no' | null;

interface Question {
  id: string;
  text: string;
  riskExplanation: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  questions: Question[];
}

type CategoryRating = 'strong' | 'needs-work' | 'at-risk';

interface CategoryResult {
  id: string;
  name: string;
  icon: React.ReactNode;
  score: number;
  maxScore: number;
  percentage: number;
  rating: CategoryRating;
  gaps: { question: string; answer: Answer; risk: string }[];
}

// ─── Data ───────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: 'incident-response',
    name: 'Incident Response',
    icon: <Shield size={20} />,
    description: 'Your written plan for detecting, responding to, and recovering from security incidents.',
    questions: [
      {
        id: 'ir-1',
        text: 'Do you have a written incident response plan?',
        riskExplanation:
          'The amended Regulation S-P explicitly requires a written incident response programme. Without one, you are out of compliance from day one.',
      },
      {
        id: 'ir-2',
        text: 'Does your plan include specific procedures for detecting unauthorized access to customer information?',
        riskExplanation:
          'Detection procedures are a core element of the required incident response programme. The SEC expects documented processes, not ad-hoc responses.',
      },
      {
        id: 'ir-3',
        text: 'Have you tested your incident response plan in the past 12 months (e.g., tabletop exercise)?',
        riskExplanation:
          'An untested plan is an unreliable plan. SEC examiners look for evidence of testing. A plan that has never been exercised will not hold up under scrutiny.',
      },
      {
        id: 'ir-4',
        text: 'Does your plan assign specific roles and responsibilities to named personnel?',
        riskExplanation:
          'Vague role assignments create confusion during a real incident. The SEC expects clearly designated responsibilities so every team member knows their part.',
      },
    ],
  },
  {
    id: 'service-provider',
    name: 'Service Provider Oversight',
    icon: <Users size={20} />,
    description: 'How you evaluate, contract with, and monitor third-party vendors who access customer data.',
    questions: [
      {
        id: 'sp-1',
        text: 'Do you maintain a current inventory of all service providers with access to customer information?',
        riskExplanation:
          'You cannot oversee vendors you have not identified. A complete inventory is the foundation of the vendor oversight requirements.',
      },
      {
        id: 'sp-2',
        text: 'Do your vendor contracts include breach notification requirements?',
        riskExplanation:
          'Without contractual notification obligations, a vendor breach could go unreported, leaving you unable to meet the 30-day notification deadline.',
      },
      {
        id: 'sp-3',
        text: 'Do you conduct periodic due diligence reviews of your service providers’ security practices?',
        riskExplanation:
          'One-time vendor assessments are insufficient. The SEC expects ongoing monitoring to verify that vendors continue to meet your security standards.',
      },
      {
        id: 'sp-4',
        text: 'Have you assessed which service providers have access to sensitive customer information (e.g., SSNs, account numbers)?',
        riskExplanation:
          'Not all vendor relationships carry equal risk. Without a sensitivity assessment, you cannot prioritize your oversight efforts appropriately.',
      },
    ],
  },
  {
    id: 'breach-notification',
    name: 'Breach Notification',
    icon: <Bell size={20} />,
    description: 'Your procedures for notifying affected customers within 30 days of a breach.',
    questions: [
      {
        id: 'bn-1',
        text: 'Do you have documented procedures for notifying customers within 30 days of discovering a breach?',
        riskExplanation:
          'The 30-day notification window is a hard regulatory requirement. Without documented procedures, you risk missing the deadline entirely.',
      },
      {
        id: 'bn-2',
        text: 'Do you have pre-drafted breach notification letter templates?',
        riskExplanation:
          'During a live incident, there is no time to draft notifications from scratch. Pre-drafted templates are essential for meeting the 30-day requirement.',
      },
      {
        id: 'bn-3',
        text: 'Do you have a process for determining which customers are affected by a given incident?',
        riskExplanation:
          'Over-notifying wastes resources and causes unnecessary alarm. Under-notifying is a compliance violation. You need a reliable scoping process.',
      },
      {
        id: 'bn-4',
        text: 'Are you aware of your state-by-state breach notification obligations in addition to federal requirements?',
        riskExplanation:
          'Federal Reg S-P requirements sit on top of state breach notification laws. Many states have shorter timelines or additional content requirements.',
      },
    ],
  },
  {
    id: 'recordkeeping',
    name: 'Recordkeeping',
    icon: <FileText size={20} />,
    description: 'How you document, store, and protect compliance records over the required retention period.',
    questions: [
      {
        id: 'rk-1',
        text: 'Do you maintain an incident log with standardized fields for tracking security events?',
        riskExplanation:
          'Ad-hoc incident tracking leads to incomplete records. SEC examiners expect a structured log that captures all relevant details consistently.',
      },
      {
        id: 'rk-2',
        text: 'Do you retain compliance records for at least 5 years as required under the Advisers Act?',
        riskExplanation:
          'The 5-year retention requirement is non-negotiable. Destroyed or missing records during an examination create serious compliance exposure.',
      },
      {
        id: 'rk-3',
        text: 'Do you have documented access controls for who can view and modify compliance records?',
        riskExplanation:
          'Without access controls, records can be altered or viewed by unauthorized personnel, undermining their integrity and your compliance posture.',
      },
    ],
  },
];

const TOTAL_QUESTIONS = CATEGORIES.reduce((sum, cat) => sum + cat.questions.length, 0);

// ─── Helpers ────────────────────────────────────────────────────────────

function getScoreForAnswer(answer: Answer): number {
  if (answer === 'yes') return 2;
  if (answer === 'partially') return 1;
  return 0;
}

function getRating(percentage: number): CategoryRating {
  if (percentage >= 80) return 'strong';
  if (percentage >= 50) return 'needs-work';
  return 'at-risk';
}

function getRatingColor(rating: CategoryRating): string {
  if (rating === 'strong') return 'text-emerald';
  if (rating === 'needs-work') return 'text-amber-400';
  return 'text-red-400';
}

function getRatingBg(rating: CategoryRating): string {
  if (rating === 'strong') return 'bg-emerald/10 border-emerald/30';
  if (rating === 'needs-work') return 'bg-amber-400/10 border-amber-400/30';
  return 'bg-red-400/10 border-red-400/30';
}

function getRatingBarColor(rating: CategoryRating): string {
  if (rating === 'strong') return 'bg-emerald';
  if (rating === 'needs-work') return 'bg-amber-400';
  return 'bg-red-400';
}

function getRatingLabel(rating: CategoryRating): string {
  if (rating === 'strong') return 'Strong';
  if (rating === 'needs-work') return 'Needs Work';
  return 'At Risk';
}

function getRatingIcon(rating: CategoryRating) {
  if (rating === 'strong') return <CheckCircle size={18} />;
  if (rating === 'needs-work') return <AlertTriangle size={18} />;
  return <XCircle size={18} />;
}

function getDaysUntilDeadline(): number {
  const deadline = new Date('2026-06-03T00:00:00-04:00');
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ─── Component ──────────────────────────────────────────────────────────

type Phase = 'intro' | 'quiz' | 'results';

export default function ComplianceChecker() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [animDirection, setAnimDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Flatten questions with category info
  const allQuestions = CATEGORIES.flatMap((cat) =>
    cat.questions.map((q) => ({ ...q, categoryId: cat.id, categoryName: cat.name, categoryIcon: cat.icon }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] ?? null : null;
  const answeredCount = Object.values(answers).filter((a) => a !== null).length;
  const progressPercent = (answeredCount / TOTAL_QUESTIONS) * 100;

  // Determine which category index we're in
  let questionCountBefore = 0;
  let currentCategoryIndex = 0;
  for (let i = 0; i < CATEGORIES.length; i++) {
    if (currentQuestionIndex < questionCountBefore + CATEGORIES[i].questions.length) {
      currentCategoryIndex = i;
      break;
    }
    questionCountBefore += CATEGORIES[i].questions.length;
  }
  const questionWithinCategory = currentQuestionIndex - questionCountBefore + 1;
  const currentCategory = CATEGORIES[currentCategoryIndex];

  const transitionTo = useCallback((direction: 'forward' | 'backward', action: () => void) => {
    setAnimDirection(direction);
    setIsTransitioning(true);
    setTimeout(() => {
      action();
      setIsTransitioning(false);
    }, 150);
  }, []);

  const handleAnswer = useCallback(
    (value: Answer) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    },
    [currentQuestion]
  );

  const goNext = useCallback(() => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      transitionTo('forward', () => setCurrentQuestionIndex((i) => i + 1));
    } else {
      setPhase('results');
    }
  }, [currentQuestionIndex, transitionTo]);

  const goPrev = useCallback(() => {
    if (currentQuestionIndex > 0) {
      transitionTo('backward', () => setCurrentQuestionIndex((i) => i - 1));
    }
  }, [currentQuestionIndex, transitionTo]);

  const restart = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setPhase('intro');
  }, []);

  // Calculate results
  const calculateResults = useCallback((): { overall: number; categories: CategoryResult[] } => {
    let totalScore = 0;
    let totalMax = 0;

    const categories: CategoryResult[] = CATEGORIES.map((cat) => {
      const maxScore = cat.questions.length * 2;
      let score = 0;
      const gaps: CategoryResult['gaps'] = [];

      cat.questions.forEach((q) => {
        const answer = answers[q.id] ?? 'no';
        const pts = getScoreForAnswer(answer);
        score += pts;

        if (answer !== 'yes') {
          gaps.push({ question: q.text, answer, risk: q.riskExplanation });
        }
      });

      totalScore += score;
      totalMax += maxScore;

      const percentage = Math.round((score / maxScore) * 100);
      const rating = getRating(percentage);

      return {
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        score,
        maxScore,
        percentage,
        rating,
        gaps,
      };
    });

    const overall = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

    return { overall, categories };
  }, [answers]);

  // ─── Intro ──────────────────────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan/10 border border-cyan/20 mb-6">
            <ClipboardCheck size={32} className="text-cyan" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-white mb-4">
            SEC Reg S-P Compliance Readiness Checker
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Find out how prepared your firm is for the amended Regulation S-P requirements
            before the June 3, 2026 deadline. This free assessment covers all four compliance
            areas and identifies specific gaps in your readiness.
          </p>
        </div>

        <div className="border border-navy-border rounded-xl bg-navy-card p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-white mb-4">
            What this assessment covers
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="flex items-start gap-3">
                <div className="mt-0.5 text-cyan">{cat.icon}</div>
                <div>
                  <p className="text-sm font-medium text-white">{cat.name}</p>
                  <p className="text-xs text-slate-500">{cat.questions.length} questions</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-navy-border rounded-xl bg-navy-card p-6">
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Clock size={16} />
            <span>Takes about 3 minutes</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Shield size={16} />
            <span>No data stored, completely private</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setPhase('quiz')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg bg-cyan text-navy-card hover:bg-cyan-dim shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_30px_rgba(0,212,255,0.25)] transition-all cursor-pointer"
          >
            Start Assessment
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ─── Quiz ───────────────────────────────────────────────────────────

  if (phase === 'quiz') {
    return (
      <div className="max-w-2xl mx-auto px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">
              Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round(progressPercent)}% complete
            </span>
          </div>
          <div className="h-1.5 bg-navy-card rounded-full overflow-hidden border border-navy-border">
            <div
              className="h-full bg-cyan rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Category indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="text-cyan">{currentCategory.icon}</div>
          <span className="text-sm font-medium text-cyan">{currentCategory.name}</span>
          <span className="text-sm text-slate-500">
            ({questionWithinCategory} of {currentCategory.questions.length})
          </span>
        </div>

        {/* Category step indicators */}
        <div className="flex items-center gap-1.5 mb-8">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                idx < currentCategoryIndex
                  ? 'bg-cyan'
                  : idx === currentCategoryIndex
                  ? 'bg-cyan/50'
                  : 'bg-navy-border'
              }`}
            />
          ))}
        </div>

        {/* Question card */}
        <div
          className={`border border-navy-border rounded-xl bg-navy-card p-6 sm:p-8 transition-all duration-150 ${
            isTransitioning
              ? animDirection === 'forward'
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
              : 'opacity-100 translate-x-0'
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-semibold font-[family-name:var(--font-heading)] text-white mb-8 leading-snug">
            {currentQuestion.text}
          </h2>

          <div className="grid gap-3">
            {([['yes', 'Yes'], ['partially', 'Partially'], ['no', 'No']] as const).map(
              ([value, label]) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className={`flex items-center gap-4 w-full text-left px-5 py-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    currentAnswer === value
                      ? value === 'yes'
                        ? 'border-emerald/50 bg-emerald/10 text-emerald'
                        : value === 'partially'
                        ? 'border-amber-400/50 bg-amber-400/10 text-amber-400'
                        : 'border-red-400/50 bg-red-400/10 text-red-400'
                      : 'border-navy-border bg-navy-light hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      currentAnswer === value
                        ? value === 'yes'
                          ? 'border-emerald bg-emerald'
                          : value === 'partially'
                          ? 'border-amber-400 bg-amber-400'
                          : 'border-red-400 bg-red-400'
                        : 'border-slate-500'
                    }`}
                  >
                    {currentAnswer === value && (
                      <div className="w-2 h-2 rounded-full bg-navy-card" />
                    )}
                  </div>
                  <span className="text-base font-medium">{label}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goPrev}
            disabled={currentQuestionIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-navy-border text-slate-400 hover:text-white hover:border-slate-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={currentAnswer === null}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg bg-cyan text-navy-card hover:bg-cyan-dim shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_30px_rgba(0,212,255,0.25)] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {currentQuestionIndex === TOTAL_QUESTIONS - 1 ? 'See Results' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // ─── Results ────────────────────────────────────────────────────────

  return <ResultsView results={calculateResults()} daysLeft={getDaysUntilDeadline()} onRestart={restart} />;
}

// ─── Results Component ────────────────────────────────────────────────

function ResultsView({
  results,
  daysLeft,
  onRestart,
}: {
  results: { overall: number; categories: CategoryResult[] };
  daysLeft: number;
  onRestart: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const eventFiredRef = useRef(false);
  const overallRating = getRating(results.overall);
  const totalGaps = results.categories.reduce((sum, cat) => sum + cat.gaps.length, 0);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (eventFiredRef.current) return;
    eventFiredRef.current = true;
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'compliance_checker',
        value: results.overall,
      });
    }
  }, [results.overall]);

  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Overall Score */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-white mb-6">
          Your Compliance Readiness Score
        </h1>

        <div className="inline-flex items-center justify-center mb-6">
          <div className="relative w-44 h-44 sm:w-52 sm:h-52">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-navy-border"
              />
              {/* Score arc */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                className={getRatingColor(overallRating)}
                stroke="currentColor"
                strokeDasharray={`${mounted ? (results.overall / 100) * 263.9 : 0} 263.9`}
                style={{ transition: 'stroke-dasharray 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] ${getRatingColor(overallRating)}`}>
                {results.overall}%
              </span>
              <span className={`text-sm font-medium mt-1 ${getRatingColor(overallRating)}`}>
                {getRatingLabel(overallRating)}
              </span>
            </div>
          </div>
        </div>

        {totalGaps > 0 ? (
          <p className="text-slate-400 max-w-md mx-auto">
            Your firm has {totalGaps} area{totalGaps !== 1 ? 's' : ''} that need{totalGaps === 1 ? 's' : ''} attention
            before the Regulation S-P deadline.
          </p>
        ) : (
          <p className="text-slate-400 max-w-md mx-auto">
            Your firm appears well-prepared for the Regulation S-P requirements. Consider having
            your policies reviewed by qualified counsel to confirm.
          </p>
        )}
      </div>

      {/* Deadline countdown */}
      <div className="border border-navy-border rounded-xl bg-navy-card p-5 mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Clock size={16} className="text-cyan" />
          <span className="text-sm font-medium text-white">
            {daysLeft} days until the June 3, 2026 deadline
          </span>
        </div>
        <p className="text-xs text-slate-500">
          All smaller entities must comply with the amended Regulation S-P by this date.
        </p>
      </div>

      {/* Category Breakdown */}
      <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] text-white mb-4">
        Category Breakdown
      </h2>

      <div className="grid gap-4 mb-8">
        {results.categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} mounted={mounted} />
        ))}
      </div>

      {/* Gaps Detail */}
      {totalGaps > 0 && (
        <>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] text-white mb-4">
            Identified Gaps
          </h2>

          <div className="space-y-3 mb-10">
            {results.categories
              .filter((cat) => cat.gaps.length > 0)
              .map((cat) => (
                <div key={cat.id} className="border border-navy-border rounded-xl bg-navy-card overflow-hidden">
                  <div className="px-5 py-3 border-b border-navy-border flex items-center gap-2">
                    <div className="text-cyan">{cat.icon}</div>
                    <span className="text-sm font-medium text-white">{cat.name}</span>
                  </div>
                  <div className="divide-y divide-navy-border">
                    {cat.gaps.map((gap) => (
                      <div key={gap.question} className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {gap.answer === 'partially' ? (
                              <AlertTriangle size={16} className="text-amber-400" />
                            ) : (
                              <XCircle size={16} className="text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white mb-1">{gap.question}</p>
                            <p className="text-xs text-slate-400 leading-relaxed">{gap.risk}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {/* CTA */}
      <div className="border border-cyan/20 rounded-xl bg-cyan/5 p-6 sm:p-8 text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-3">
          Get Compliant in 15 Minutes
        </h2>
        <p className="text-slate-400 mb-6 max-w-lg mx-auto">
          RegShield generates all 4 required Regulation S-P policy documents, customized to your
          firm. One-time purchase, no subscription.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/start"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg bg-cyan text-navy-card hover:bg-cyan-dim shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_30px_rgba(0,212,255,0.25)] transition-all"
          >
            Generate Your Documents
            <ChevronRight size={20} />
          </Link>
          <span className="text-sm text-slate-500">$299 one-time</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-navy-border text-slate-400 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Retake Assessment
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-slate-500/60 mt-8 max-w-md mx-auto">
        This assessment is for informational purposes only and does not constitute legal advice.
        Consult qualified legal counsel for compliance guidance specific to your firm.
      </p>
    </div>
  );
}

// ─── Category Card ────────────────────────────────────────────────────

function CategoryCard({ category, mounted }: { category: CategoryResult; mounted: boolean }) {
  return (
    <div className={`border rounded-xl p-5 ${getRatingBg(category.rating)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={getRatingColor(category.rating)}>{category.icon}</div>
          <span className="text-sm font-medium text-white">{category.name}</span>
        </div>
        <div className={`flex items-center gap-1.5 text-sm font-medium ${getRatingColor(category.rating)}`}>
          {getRatingIcon(category.rating)}
          <span>{getRatingLabel(category.rating)}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-navy/40 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${getRatingBarColor(category.rating)}`}
            style={{ width: mounted ? `${category.percentage}%` : '0%' }}
          />
        </div>
        <span className={`text-sm font-bold tabular-nums ${getRatingColor(category.rating)}`}>
          {category.percentage}%
        </span>
      </div>
    </div>
  );
}
