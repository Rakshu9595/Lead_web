import React from 'react';

interface BadgeProps {
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const colors = {
    New: 'bg-blue-100 text-blue-800',
    Contacted: 'bg-yellow-100 text-yellow-800',
    Qualified: 'bg-green-100 text-green-800',
    Lost: 'bg-red-100 text-red-800',
  };
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

export default Badge;