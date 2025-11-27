import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createOrderAction,
  getExchangeRatesAction,
  getOrdersAction,
} from '@/lib/actions/exchange.actions';
import { getWalletsAction } from '@/lib/actions/wallet.actions';
import type { OrderRequest } from '@/lib/api/types';
import { checkAuthResponse } from '@/lib/utils/auth-checker';

// 환율 정보 조회
export function useExchangeRates() {
  return useQuery({
    queryKey: ['exchangeRates'],
    queryFn: async () => {
      const response = await getExchangeRatesAction();
      return checkAuthResponse(response);
    },
    refetchInterval: 60 * 1000, // 60초
  });
}

// 지갑 정보 조회
export function useWallets() {
  return useQuery({
    queryKey: ['wallets'],
    queryFn: async () => {
      const response = await getWalletsAction();
      return checkAuthResponse(response);
    },
  });
}

// 환전 실행
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: OrderRequest) => {
      const response = await createOrderAction(params);

      if (response.code !== 'OK' && response.code !== 'SUCCESS') {
        throw response;
      }

      return response.data;
    },
    onSuccess: () => {
      // 지갑, 환전 내역 갱신
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

// 환전 내역 조회
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await getOrdersAction();
      return checkAuthResponse(response);
    },
  });
}
