'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  optional?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, optional, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-300">
          {label}
          {optional && <span className="text-slate-500 ml-1">(optional)</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-3 bg-navy-card border border-navy-border rounded-lg text-white placeholder:text-slate-500 transition-colors ${
            error ? 'border-red-400' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
