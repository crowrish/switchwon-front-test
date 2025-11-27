'use server';

import { cookies } from 'next/headers';

import { AxiosError } from 'axios';

import { createAxios } from '@/lib/api/server-client';
import type {
  ApiResponse,
  ExchangeRate,
  Order,
  OrderRequest,
} from '@/lib/api/types';

export async function getExchangeRatesAction(): Promise<
  ApiResponse<ExchangeRate[]>
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return {
        code: 'UNAUTHORIZED',
        message: '인증 토큰이 없습니다.',
        data: undefined,
      };
    }

    const axios = createAxios(token);
    const response = await axios.get<ApiResponse<ExchangeRate[]>>(
      '/exchange-rates/latest'
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return (
        error.response?.data || {
          code: 'ERROR',
          message: '환율 정보를 불러오는데 실패했습니다.',
          data: undefined,
        }
      );
    }
    return {
      code: 'ERROR',
      message: '환율 정보 조회 중 오류가 발생했습니다.',
      data: undefined,
    };
  }
}

export async function createOrderAction(
  params: OrderRequest
): Promise<ApiResponse<Order>> {
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
    const response = await axios.post<ApiResponse<Order>>('/orders', params);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return (
        error.response?.data || {
          code: 'ERROR',
          message: '환전에 실패했습니다.',
          data: undefined,
        }
      );
    }
    return {
      code: 'ERROR',
      message: '환전 중 오류가 발생했습니다.',
      data: undefined,
    };
  }
}

export async function getOrdersAction(): Promise<ApiResponse<Order[]>> {
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
    const response = await axios.get<ApiResponse<Order[]>>('/orders');

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return (
        error.response?.data || {
          code: 'ERROR',
          message: '환전 내역을 불러오는데 실패했습니다.',
          data: undefined,
        }
      );
    }
    return {
      code: 'ERROR',
      message: '환전 내역 조회 중 오류가 발생했습니다.',
      data: undefined,
    };
  }
}
