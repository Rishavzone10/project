import axios from 'axios';
import { Customer, Campaign } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const customerApi = {
  getAll: () => api.get<Customer[]>('/customers'),
  create: (customer: Omit<Customer, 'id'>) => 
    api.post<Customer>('/customers', customer),
  update: (id: string, customer: Partial<Customer>) =>
    api.put<Customer>(`/customers/${id}`, customer),
  delete: (id: string) => api.delete(`/customers/${id}`),
};

export const campaignApi = {
  getAll: () => api.get<Campaign[]>('/campaigns'),
  create: (campaign: Omit<Campaign, 'id'>) =>
    api.post<Campaign>('/campaigns', campaign),
  update: (id: string, campaign: Partial<Campaign>) =>
    api.put<Campaign>(`/campaigns/${id}`, campaign),
  delete: (id: string) => api.delete(`/campaigns/${id}`),
  calculateAudience: (conditions: Campaign['conditions']) =>
    api.post<{ size: number }>('/campaigns/calculate-audience', { conditions }),
  sendMessages: (campaignId: string) =>
    api.post(`/campaigns/${campaignId}/send`),
};

export const messageApi = {
  getDeliveryStatus: (messageId: string) =>
    api.get(`/messages/${messageId}/status`),
};