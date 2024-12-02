import { apiClient } from './client';
import type { CallbackFormData } from '../../types/callback';

export const callbackApi = {
  async submitCallbackRequest(data: CallbackFormData) {
    try {
      const response = await apiClient.post('/callbacks/', data);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.detail || error.message || 'Failed to submit request';
      throw new Error(message);
    }
  }
};