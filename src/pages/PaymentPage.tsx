import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaymentButton } from '../components/payments/PaymentButton';
import { PaymentSummary } from '../components/payments/PaymentSummary';
import { Shield, CreditCard } from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, services } = location.state || {};

  const handlePaymentSuccess = (response: any) => {
    navigate('/payment-success', { 
      state: { 
        paymentId: response.razorpay_payment_id,
        eventId: event.id 
      }
    });
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    // Handle payment failure (show error message, etc.)
  };

  if (!event || !services) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Invalid payment request</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Complete Your Booking</h1>
          <p className="text-gray-400">Secure payment for your event services</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <PaymentSummary
              eventDate={event.date}
              services={services}
              guestCount={event.guest_count}
            />

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-[#CCFF00]" />
                <span>Your payment is secured with industry-standard encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CreditCard className="w-4 h-4 text-[#CCFF00]" />
                <span>We accept all major credit/debit cards and UPI</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Payment Method</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <img 
                  src="https://razorpay.com/assets/razorpay-glyph.svg" 
                  alt="Razorpay"
                  className="h-8"
                />
              </div>
              <PaymentButton
                amount={services.reduce((sum: number, service: any) => sum + service.rate, 0) * 1.05}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};