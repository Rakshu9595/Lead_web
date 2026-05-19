// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales';
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Lead type
export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdAt: string;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'admin' | 'sales') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Filters type
export interface LeadFilters {
  status: string;
  source: string;
  search: string;
  sort: string;
  page: number;
  limit: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LeadsResponse {
  leads: Lead[];
  totalPages: number;
  currentPage: number;
  totalLeads: number;
}