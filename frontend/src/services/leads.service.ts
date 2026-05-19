import api from './api';
import { Lead, LeadFilters } from '../types';

export const leadsService = {
  async getLeads(filters: LeadFilters) {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    params.append('page', filters.page.toString());
    params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/leads?${params.toString()}`);
    const result = response.data.data;
    return {
      data: {
        leads: result.data || [],
        totalLeads: result.totalRecords || 0,
        currentPage: result.page || 1,
        totalPages: result.totalPages || 1
      }
    };
  },
  
  async createLead(lead: Omit<Lead, '_id' | 'createdAt'>) {
    const response = await api.post('/leads', lead);
    return response.data;
  },
  
  async updateLead(id: string, lead: Partial<Lead>) {
    const response = await api.put(`/leads/${id}`, lead);
    return response.data;
  },
  
  async deleteLead(id: string) {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },
};