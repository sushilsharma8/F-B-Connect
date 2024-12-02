import { apiClient } from './client';
import type { Service, Provider } from '../../types';

export interface CreateProviderData {
  skills: number[];
  availability: Record<string, string>;
}

export const servicesApi = {
  async getServices(): Promise<Service[]> {
    const { data } = await apiClient.get<Service[]>('/services/');
    return data;
  },

  async becomeProvider(providerData: CreateProviderData): Promise<Provider> {
    const { data } = await apiClient.post<Provider>('/services/providers/', providerData);
    return data;
  },

  async getProviderProfile(): Promise<Provider> {
    const { data } = await apiClient.get<Provider>('/services/providers/me/');
    return data;
  },

  async updateProviderProfile(providerData: Partial<CreateProviderData>): Promise<Provider> {
    const { data } = await apiClient.patch<Provider>('/services/providers/me/', providerData);
    return data;
  },
};