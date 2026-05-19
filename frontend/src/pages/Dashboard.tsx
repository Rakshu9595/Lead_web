import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Pagination from '../components/common/Pagination';
import DeleteConfirmModal from '../components/leads/DeleteConfirmModal';
import Filters from '../components/leads/Filters';
import LeadForm from '../components/leads/LeadForm';
import LeadTable from '../components/leads/LeadTable';
import { leadsService } from '../services/leads.service';
import { Lead, LeadFilters, LeadsResponse } from '../types';

type LeadFormData = Pick<Lead, 'name' | 'email' | 'status' | 'source'>;

const defaultFilters: LeadFilters = {
  status: '',
  source: '',
  search: '',
  sort: '',
  page: 1,
  limit: 10,
};

const DashboardContent: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState<LeadFilters>(defaultFilters);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>();
  const [deletingLead, setDeletingLead] = useState<Lead | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await leadsService.getLeads(filters);
      const data = (response as { data: LeadsResponse }).data;
      setLeads(data.leads);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleFilterChange = useCallback((updatedFilters: Partial<LeadFilters>) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      ...updatedFilters,
      page: updatedFilters.page ?? 1,
    }));
  }, []);

  const handleCreate = () => {
    setEditingLead(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: LeadFormData) => {
    setIsSaving(true);
    try {
      if (editingLead) {
        await leadsService.updateLead(editingLead._id, data);
        toast.success('Lead updated successfully');
      } else {
        await leadsService.createLead(data);
        toast.success('Lead created successfully');
      }
      setIsFormOpen(false);
      setEditingLead(undefined);
      await loadLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save lead');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingLead) return;

    setIsDeleting(true);
    try {
      await leadsService.deleteLead(deletingLead._id);
      toast.success('Lead deleted successfully');
      setDeletingLead(undefined);
      await loadLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-600 mt-1">Manage and track your sales leads</p>
        </div>
        <Button onClick={handleCreate}>Add Lead</Button>
      </div>

      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <LeadTable
        leads={leads}
        onEdit={handleEdit}
        onDelete={(id) => setDeletingLead(leads.find((lead) => lead._id === id))}
        isLoading={isLoading}
      />
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={(page) => handleFilterChange({ page })}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingLead ? 'Edit Lead' : 'Add Lead'}
      >
        <LeadForm
          initialData={editingLead}
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
          isLoading={isSaving}
        />
      </Modal>

      <DeleteConfirmModal
        isOpen={Boolean(deletingLead)}
        onClose={() => setDeletingLead(undefined)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        leadName={deletingLead?.name}
      />
    </>
  );
};

const Dashboard: React.FC = () => (
  <Layout>
    <DashboardContent />
  </Layout>
);

export default Dashboard;
