import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ChefHat, CalendarDays } from 'lucide-react';
import type { RegisterData } from '../../types';

interface RoleSelectorProps {
  control: Control<RegisterData>;
  error?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ control, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-200 mb-2">
        I want to...
      </label>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-4">
            <label className={`
              flex flex-col items-center p-4 rounded-lg border
              ${field.value === 'buyer' 
                ? 'border-[#CCFF00] bg-[#CCFF00]/10' 
                : 'border-white/10 hover:bg-white/5'}
              cursor-pointer transition-all duration-200
            `}>
              <input
                type="radio"
                className="sr-only"
                {...field}
                value="buyer"
                checked={field.value === 'buyer'}
              />
              <CalendarDays className="w-8 h-8 mb-2 text-[#CCFF00]" />
              <span className="text-sm font-medium text-white">Host Events</span>
            </label>

            <label className={`
              flex flex-col items-center p-4 rounded-lg border
              ${field.value === 'seller' 
                ? 'border-[#CCFF00] bg-[#CCFF00]/10' 
                : 'border-white/10 hover:bg-white/5'}
              cursor-pointer transition-all duration-200
            `}>
              <input
                type="radio"
                className="sr-only"
                {...field}
                value="seller"
                checked={field.value === 'seller'}
              />
              <ChefHat className="w-8 h-8 mb-2 text-[#CCFF00]" />
              <span className="text-sm font-medium text-white">Provide Services</span>
            </label>
          </div>
        )}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};