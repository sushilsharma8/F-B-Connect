import React from 'react';
import { format } from 'date-fns';

interface PaymentSummaryProps {
  eventDate: string;
  services: Array<{
    name: string;
    rate: number;
  }>;
  guestCount: number;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  eventDate,
  services,
  guestCount,
}) => {
  const subtotal = services.reduce((sum, service) => sum + service.rate, 0);
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + serviceFee;

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Payment Summary</h3>
      
      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Event Date</span>
          <span>{format(new Date(eventDate), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex justify-between">
          <span>Guest Count</span>
          <span>{guestCount} guests</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        {services.map((service, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-300">{service.name}</span>
            <span className="text-white">₹{service.rate.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Subtotal</span>
          <span className="text-white">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Service Fee (5%)</span>
          <span className="text-white">₹{serviceFee.toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="flex justify-between font-semibold">
          <span className="text-white">Total</span>
          <span className="text-[#CCFF00]">₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};