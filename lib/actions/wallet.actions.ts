'use server';

import { cookies } from 'next/headers';

import { AxiosError } from 'axios';

import { createAxios } from '@/lib/api/server-client';
import type { ApiResponse, WalletsResponse } from '@/lib/api/types';

export async function getWalletsAction(): Promise<
  ApiResponse<WalletsResponse>
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return {
        code: 'ERROR',
        message: '인증이 필요합니다.',
        data: undefined,
      };
    }

    const axios = createAxios(token);
    const response = await axios.get<ApiResponse<WalletsResponse>>('/wallets');

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return (
        error.response?.data || {
          code: 'ERROR',
          message: '지갑 정보를 불러오는데 실패했습니다.',
          data: undefined,
        }
      );
    }
    return {
      code: 'ERROR',
      message: '지갑 정보 조회 중 오류가 발생했습니다.',
      data: undefined,
    };
  }
}
