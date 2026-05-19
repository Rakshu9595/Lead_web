import React from 'react';
import { Edit2, Trash2, Mail, Globe, Camera, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lead } from '../../types';
import { StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (leadId: string) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Website': return <Globe className="h-4 w-4 mr-1 text-muted-foreground" />;
      case 'Instagram': return <Camera className="h-4 w-4 mr-1 text-pink-500" />;
      case 'Referral': return <Users className="h-4 w-4 mr-1 text-primary" />;
      default: return null;
    }
  };

  if (!leads || leads.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-dashed"
      >
        <div className="rounded-full bg-muted p-4 mb-4">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No leads found</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Try adjusting your filters or create a new lead.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-card/40 rounded-xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border/50">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Created</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            <AnimatePresence>
              {leads.map((lead, index) => (
                <motion.tr 
                  key={lead._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-muted/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 mr-1.5" />
                      {lead.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getSourceIcon(lead.source)}
                      <span className="text-muted-foreground">{lead.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(lead.createdAt))}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEdit(lead)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      
                      {isAdmin && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onDelete(lead._id)}
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};
