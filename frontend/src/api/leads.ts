import client from './client';
import type { Lead, LeadsResponse, LeadFilters } from '../types';

export const fetchLeads = async (filters: LeadFilters): Promise<LeadsResponse> => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.source) params.append('source', filters.source);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  const response = await client.get(`/leads?${params.toString()}`);
  const result = response.data.data;
  return {
    leads: result.data || [],
    totalLeads: result.totalRecords || 0,
    currentPage: result.page || 1,
    totalPages: result.totalPages || 1
  };
};

export const fetchLead = async (id: string): Promise<Lead> => {
  const response = await client.get(`/leads/${id}`);
  return response.data.data;
};

export const createLead = async (data: Partial<Lead>): Promise<Lead> => {
  const response = await client.post('/leads', data);
  return response.data.data;
};

export const updateLead = async ({ id, data }: { id: string; data: Partial<Lead> }): Promise<Lead> => {
  const response = await client.put(`/leads/${id}`, data);
  return response.data.data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await client.delete(`/leads/${id}`);
};

export const exportLeadsCSV = async (): Promise<void> => {
  const response = await client.get('/leads/export', { responseType: 'blob' });
  
  // Create a blob from the response data
  const blob = new Blob([response.data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  
  // Create a temporary anchor element to trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
