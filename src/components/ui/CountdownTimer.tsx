'use client';

import { useEffect, useState } from 'react';

const DEADLINE = new Date('2026-06-03T00:00:00-04:00'); // EDT

function getTimeLeft() {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-3 sm:gap-4">
        {['Days', 'Hrs', 'Min', 'Sec'].map((label) => (
          <div key={label} className="text-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-navy-card border border-navy-border rounded-xl flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-white">
                --
              </span>
            </div>
            <span className="text-xs text-slate-500 mt-1 block uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hrs', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-navy-card border border-navy-border rounded-xl flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-white tabular-nums">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block uppercase tracking-wider">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
