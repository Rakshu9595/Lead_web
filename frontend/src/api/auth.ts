import client from './client';
import type { AuthResponse } from '../types';

export const login = async (data: any): Promise<AuthResponse> => {
  const response = await client.post('/auth/login', data);
  return response.data.data;
};

export const register = async (data: any): Promise<AuthResponse> => {
  const response = await client.post('/auth/register', data);
  return response.data.data;
};
