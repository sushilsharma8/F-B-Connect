import React from 'react';
import { CheckCircle } from 'lucide-react';

export const CallbackConfirmation: React.FC = () => {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-[#CCFF00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-[#CCFF00]" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">
        Thank you!
      </h3>
      <p className="text-gray-400">
        Our team will contact you within 24 hours during business hours. 
        You'll also receive a confirmation email shortly.
      </p>
    </div>
  );
};