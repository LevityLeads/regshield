'use client';

import { useEffect, useState } from 'react';
import { List, ChevronDown } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector('[data-article-content]');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    }));

    setHeadings(items);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    const article = document.querySelector('[data-article-content]');
    if (!article) return;

    article.querySelectorAll('h2, h3').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-slate-300 w-full border border-navy-border rounded-lg p-3 bg-navy-card"
        >
          <List size={16} className="text-cyan" />
          Table of Contents
          <ChevronDown
            size={16}
            className={`ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && (
          <nav className="mt-2 border border-navy-border rounded-lg p-4 bg-navy-card">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm block py-0.5 transition-colors ${
                      activeId === h.id
                        ? 'text-cyan font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
          <List size={16} className="text-cyan" />
          Table of Contents
        </div>
        <ul className="space-y-1.5 border-l border-navy-border pl-4">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? 'pl-3' : ''}>
              <a
                href={`#${h.id}`}
                className={`text-sm block py-0.5 transition-colors ${
                  activeId === h.id
                    ? 'text-cyan font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
