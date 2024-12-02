import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'neon';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'rounded-lg font-medium transition-all duration-200',
        {
          'bg-[#CCFF00] text-black hover:bg-[#B8E600] shadow-lg hover:shadow-[#CCFF00]/25': variant === 'primary',
          'bg-white/10 text-white hover:bg-white/20': variant === 'secondary',
          'glass-card text-white hover:bg-white/10': variant === 'glass',
          'neon-border bg-black text-[#CCFF00] hover:bg-[#0A0A0A]': variant === 'neon',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};