import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-slate-400 flex-wrap">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Home size={14} />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-slate-500" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
