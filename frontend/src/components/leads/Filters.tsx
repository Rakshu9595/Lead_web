import React, { useState, useEffect } from 'react';
import Select from '../common/Select';
import Input from '../common/Input';

interface FiltersProps {
  filters: {
    status: string;
    source: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== filters.search) {
        onFilterChange({ search: searchTerm });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [filters.search, onFilterChange, searchTerm]);
  
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Lost', label: 'Lost' },
  ];
  
  const sourceOptions = [
    { value: '', label: 'All Sources' },
    { value: 'Website', label: 'Website' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Referral', label: 'Referral' },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        />
        
        <Select
          options={sourceOptions}
          value={filters.source}
          onChange={(e) => onFilterChange({ source: e.target.value })}
        />
      </div>
    </div>
  );
};

export default Filters;
