import { useState, useEffect } from 'react';
import { Lead, LeadFilters } from '../types';
import toast from 'react-hot-toast';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for testing
  const mockLeads: Lead[] = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'New',
      source: 'Website',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Contacted',
      source: 'Instagram',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'Qualified',
      source: 'Referral',
      createdAt: new Date().toISOString(),
    },
  ];

  const fetchLeads = async (filters?: LeadFilters) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setLeads(mockLeads);
      setTotalPages(1);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  const createLead = async (leadData: Omit<Lead, '_id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newLead: Lead = {
        ...leadData,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setLeads([newLead, ...leads]);
      toast.success('Lead created successfully');
      return newLead;
    } catch (error) {
      toast.error('Failed to create lead');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateLead = async (id: string, leadData: Partial<Lead>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLeads(leads.map(lead => 
        lead._id === id ? { ...lead, ...leadData } : lead
      ));
      toast.success('Lead updated successfully');
    } catch (error) {
      toast.error('Failed to update lead');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLeads(leads.filter(lead => lead._id !== id));
      toast.success('Lead deleted successfully');
    } catch (error) {
      toast.error('Failed to delete lead');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const exportLeads = async () => {
    try {
      // Create CSV content
      const headers = ['Name', 'Email', 'Status', 'Source', 'Created Date'];
      const csvRows = [headers];
      
      leads.forEach(lead => {
        csvRows.push([
          lead.name,
          lead.email,
          lead.status,
          lead.source,
          new Date(lead.createdAt).toLocaleDateString(),
        ]);
      });
      
      const csvContent = csvRows.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads_export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast.success('Leads exported successfully');
    } catch (error) {
      toast.error('Failed to export leads');
    }
  };

  return {
    leads,
    isLoading,
    totalPages,
    currentPage,
    setCurrentPage,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    exportLeads,
  };
};