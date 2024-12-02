import { apiClient } from './client';
import type { PaymentDetails, RazorpayResponse } from '../../types/payment';

export const paymentsApi = {
  async createOrder(paymentDetails: PaymentDetails) {
    const { data } = await apiClient.post('/payments/create-order', paymentDetails);
    return data;
  },

  async verifyPayment(paymentResponse: RazorpayResponse) {
    const { data } = await apiClient.post('/payments/verify', paymentResponse);
    return data;
  },

  async getPaymentHistory() {
    const { data } = await apiClient.get('/payments/history');
    return data;
  }
};