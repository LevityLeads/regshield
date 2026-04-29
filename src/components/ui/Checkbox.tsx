'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, className = '', ...props }, ref) => {
    return (
      <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            checked
              ? 'bg-cyan border-cyan'
              : 'border-navy-border group-hover:border-slate-400'
          }`}
        >
          {checked && <Check size={14} className="text-navy" strokeWidth={3} />}
        </div>
        <input ref={ref} type="checkbox" checked={checked} className="sr-only" {...props} />
        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
