'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-cyan text-navy-card hover:bg-cyan-dim shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]',
      secondary:
        'bg-emerald text-navy-card hover:bg-emerald-dim shadow-[0_0_20px_rgba(0,255,136,0.15)] hover:shadow-[0_0_30px_rgba(0,255,136,0.25)]',
      outline:
        'border border-navy-border text-slate-300 hover:border-cyan hover:text-cyan bg-transparent',
      ghost: 'text-slate-400 hover:text-white bg-transparent',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
