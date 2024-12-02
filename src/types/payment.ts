export interface PaymentDetails {
  amount: number;
  currency: string;
  orderId: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
}