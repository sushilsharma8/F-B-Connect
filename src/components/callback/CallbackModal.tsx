import React from 'react';
import { X } from 'lucide-react';
import { CallbackForm } from './CallbackForm';
import { CallbackConfirmation } from './CallbackConfirmation';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  showConfirmation: boolean;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
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
            <CallbackConfirmation />
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Request a Call Back
              </h2>
              <CallbackForm 
                onSuccess={() => {
                  // Show confirmation for 3 seconds before closing
                  setTimeout(onClose, 3000);
                }}
                onCancel={onClose}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};