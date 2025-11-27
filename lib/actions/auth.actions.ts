'use server';

import { cookies } from 'next/headers';

import { AxiosError } from 'axios';

import { createAxios } from '@/lib/api/server-client';
import type { ApiResponse, LoginResponse } from '@/lib/api/types';

export async function loginAction(
  email: string
): Promise<ApiResponse<LoginResponse>> {
  try {
    const formData = new FormData();
    formData.append('email', email);

    const axios = createAxios();
    const response = await axios.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.code === 'OK' && response.data.data) {
      const cookieStore = await cookies();
      cookieStore.set('auth-token', response.data.data.token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      return {
        ...response.data,
        data: {
          ...response.data.data,
          email,
        },
      };
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return (
        error.response?.data || {
          code: 'ERROR',
          message: '로그인에 실패했습니다.',
          data: undefined,
        }
      );
    }
    return {
      code: 'ERROR',
      message: '로그인 중 오류가 발생했습니다.',
      data: undefined,
    };
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}
