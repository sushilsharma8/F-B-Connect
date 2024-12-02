import React from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
        <input
          ref={ref}
          className={clsx(
            "mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2",
            "text-white placeholder-gray-400",
            "focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]",
            "transition-colors duration-200",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';