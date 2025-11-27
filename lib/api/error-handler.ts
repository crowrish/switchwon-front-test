export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  code?: string;
}

interface AxiosError {
  response?: {
    data?: ApiErrorResponse;
    status?: number;
  };
  message?: string;
}

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'response' in error;
}

export const ERROR_MESSAGES: Record<string, string> = {
  VALIDATION_ERROR: '입력하신 정보를 다시 확인해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  WALLET_INSUFFICIENT_BALANCE: '잔액이 부족합니다.',
  EXCHANGE_RATE_NOT_FOUND: '환율 정보를 찾을 수 없습니다. 다시 시도해주세요.',
  EXCHANGE_RATE_OUTDATED: '환율 정보가 변경되었습니다. 다시 시도해주세요.',
};

export const DEFAULT_ERROR_MESSAGE = '요청 처리 중 오류가 발생했습니다.';

export const getErrorMessage = (error: unknown): string => {
  if (!error) return DEFAULT_ERROR_MESSAGE;

  if (isAxiosError(error)) {
    const errorData = error.response?.data;

    if (errorData) {
      if (errorData.code && ERROR_MESSAGES[errorData.code]) {
        return ERROR_MESSAGES[errorData.code];
      }

      if (errorData.message) {
        return errorData.message;
      }
    }
  }

  return DEFAULT_ERROR_MESSAGE;
};
