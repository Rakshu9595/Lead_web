import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { createLead, updateLead } from '../../api/leads';
import type { Lead } from '../../types';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Lost'] as const;
const SOURCES = ['Website', 'Instagram', 'Referral'] as const;

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  status: z.any() as z.ZodType<'New' | 'Contacted' | 'Qualified' | 'Lost'>,
  source: z.any() as z.ZodType<'Website' | 'Instagram' | 'Referral'>,
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose, lead }) => {
  const queryClient = useQueryClient();
  const isEditing = !!lead;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema as any),
    defaultValues: {
      name: '',
      email: '',
      status: 'New',
      source: 'Website',
    },
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
      });
    } else {
      reset({
        name: '',
        email: '',
        status: 'New',
        source: 'Website',
      });
    }
  }, [lead, reset, isOpen]);

  const createMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create lead');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update lead');
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    if (isEditing && lead) {
      updateMutation.mutate({ id: lead._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Lead' : 'Add New Lead'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          placeholder="Lead name"
          {...register('name')}
          error={errors.name?.message}
        />
        
        <Input
          label="Email"
          type="email"
          placeholder="Lead email"
          {...register('email')}
          error={errors.email?.message}
        />
        
        <Select
          label="Status"
          options={[
            { label: 'New', value: 'New' },
            { label: 'Contacted', value: 'Contacted' },
            { label: 'Qualified', value: 'Qualified' },
            { label: 'Lost', value: 'Lost' },
          ]}
          {...register('status')}
          error={errors.status?.message as string}
        />
        
        <Select
          label="Source"
          options={[
            { label: 'Website', value: 'Website' },
            { label: 'Instagram', value: 'Instagram' },
            { label: 'Referral', value: 'Referral' },
          ]}
          {...register('source')}
          error={errors.source?.message as string}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {isEditing ? 'Save Changes' : 'Create Lead'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
