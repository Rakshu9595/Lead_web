import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { Lead } from '../../types';

type LeadFormData = Pick<Lead, 'name' | 'email' | 'status' | 'source'>;

interface LeadFormProps {
  initialData?: Lead;
  onSubmit: (data: LeadFormData) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSubmit, onClose, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    defaultValues: initialData || {
      status: 'New',
      source: 'Website',
    },
  });
  
  const statusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Lost', label: 'Lost' },
  ];
  
  const sourceOptions = [
    { value: 'Website', label: 'Website' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Referral', label: 'Referral' },
  ];
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        {...register('name', { required: 'Name is required' })}
        error={errors.name?.message}
        placeholder="Enter lead name"
      />
      
      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        })}
        error={errors.email?.message}
        placeholder="Enter email address"
      />
      
      <Select
        label="Status"
        options={statusOptions}
        {...register('status', { required: 'Status is required' })}
        error={errors.status?.message}
      />
      
      <Select
        label="Source"
        options={sourceOptions}
        {...register('source', { required: 'Source is required' })}
        error={errors.source?.message}
      />
      
      <div className="flex gap-3 mt-6">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {initialData ? 'Update' : 'Create'} Lead
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;
