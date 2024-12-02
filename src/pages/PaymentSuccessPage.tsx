import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();
  const { paymentId, eventId } = location.state || {};

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-[#CCFF00] mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-400 mb-2">
          Your payment has been processed successfully.
        </p>
        
        <p className="text-sm text-gray-500 mb-8">
          Payment ID: {paymentId}
        </p>

        <div className="space-y-4">
          <Link to={`/event/${eventId}`}>
            <Button variant="neon" className="w-full">
              View Event Details
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="secondary" className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};