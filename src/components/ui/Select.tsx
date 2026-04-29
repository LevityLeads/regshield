'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  optional?: boolean;
  options: readonly string[] | { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, optional, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1.5">
        <label htmlFor={selectId} className="block text-sm font-medium text-slate-300">
          {label}
          {optional && <span className="text-slate-500 ml-1">(optional)</span>}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-4 py-3 bg-navy-card border border-navy-border rounded-lg text-white transition-colors appearance-none ${
            error ? 'border-red-400' : ''
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" className="text-slate-500">
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={value} value={value}>
                {optLabel}
              </option>
            );
          })}
        </select>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
