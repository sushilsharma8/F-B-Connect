import React from 'react';
import { X } from 'lucide-react';
import { CallbackForm } from '../forms/CallbackForm';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  showConfirmation: boolean;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  showConfirmation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-[#0A0A0A] rounded-xl shadow-xl ring-1 ring-white/10 w-full max-w-md p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {showConfirmation ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#CCFF00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#CCFF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Thank you!
              </h3>
              <p className="text-gray-400">
                Our team will contact you within 24 hours during business hours. You'll also receive a confirmation email shortly.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Request a Call Back
              </h2>
              <CallbackForm onSubmit={onSubmit} onClose={onClose} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};