import type { ApiResponse } from '@/lib/api/types';

// API 응답에서 UNAUTHORIZED 체크
export function checkAuthResponse<T>(response: ApiResponse<T>): T | never {
  if (response.code === 'UNAUTHORIZED') {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-storage');
      window.location.href = '/';
    }

    throw new Error('UNAUTHORIZED');
  }

  return response.data as T;
}
