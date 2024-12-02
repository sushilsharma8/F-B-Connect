import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { paymentsApi } from '../../lib/api/payments';
import { Button } from '../ui/Button';
import type { PaymentDetails } from '../../types/payment';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  amount: number;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
  className?: string;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  onSuccess,
  onError,
  className
}) => {
  const createOrderMutation = useMutation({
    mutationFn: (paymentDetails: PaymentDetails) => 
      paymentsApi.createOrder(paymentDetails),
  });

  const handlePayment = async () => {
    try {
      const order = await createOrderMutation.mutateAsync({
        amount: amount * 100, // Convert to smallest currency unit
        currency: 'INR',
        orderId: `order_${Date.now()}`,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'F&B Connect',
        description: 'Event Service Payment',
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const result = await paymentsApi.verifyPayment(response);
            onSuccess(result);
          } catch (error) {
            onError(error);
          }
        },
        prefill: {
          name: 'Guest User',
          email: 'guest@example.com',
        },
        theme: {
          color: '#CCFF00',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Button
      variant="neon"
      onClick={handlePayment}
      disabled={createOrderMutation.isPending}
      className={className}
    >
      {createOrderMutation.isPending ? 'Processing...' : `Pay ₹${amount}`}
    </Button>
  );
};