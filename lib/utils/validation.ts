import type { WalletsResponse } from '@/lib/api/types';
import { getCurrencyUnit } from '@/lib/utils/currency';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      message: '이메일을 입력해주세요.',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: '올바른 이메일 형식을 입력해주세요.',
    };
  }

  return { isValid: true };
}

const MIN_AMOUNT_BY_CURRENCY: Record<string, number> = {
  JPY: 100,
  // 기타 통화는 1이 기본값
};

const DECIMAL_PLACES_BY_CURRENCY: Record<string, number> = {
  JPY: 0, // 엔화는 소수점 불가
  // 기타 통화는 2자리까지 허용
};

export function validateAmount(
  amount: string,
  currency?: string
): ValidationResult {
  const numAmount = parseFloat(amount);

  if (!amount || isNaN(numAmount)) {
    return { isValid: false, message: '금액을 입력해주세요.' };
  }

  if (numAmount <= 0) {
    return { isValid: false, message: '환전 금액은 0보다 커야 합니다.' };
  }

  // 통화별 최소 금액 검증
  if (currency) {
    const minAmount = MIN_AMOUNT_BY_CURRENCY[currency] || 1;
    if (numAmount < minAmount) {
      const currencyName = getCurrencyUnit(currency);
      return {
        isValid: false,
        message: `${currencyName}는 최소 ${minAmount.toLocaleString('ko-KR')} 이상 입력해야 합니다.`,
      };
    }

    // 통화별 소수점 자릿수 검증
    const allowedDecimalPlaces = DECIMAL_PLACES_BY_CURRENCY[currency] ?? 2;
    const decimalPart = amount.split('.')[1];
    if (decimalPart && decimalPart.length > allowedDecimalPlaces) {
      const currencyName = getCurrencyUnit(currency);
      if (allowedDecimalPlaces === 0) {
        return {
          isValid: false,
          message: `${currencyName}는 소수점을 입력할 수 없습니다.`,
        };
      } else {
        return {
          isValid: false,
          message: `${currencyName}는 소수점 ${allowedDecimalPlaces}자리까지만 입력 가능합니다.`,
        };
      }
    }
  }

  return { isValid: true };
}

export function validateBalance(
  action: 'BUY' | 'SELL',
  wallets: WalletsResponse | undefined,
  selectedCurrency: string,
  inputAmount: number,
  requiredKrw: number
): ValidationResult {
  if (!wallets) {
    return { isValid: false, message: '지갑 정보를 불러올 수 없습니다.' };
  }

  if (action === 'BUY') {
    // 구매: KRW 잔액 확인
    const krwWallet = wallets.wallets.find((w) => w.currency === 'KRW');
    const krwBalance = krwWallet?.balance || 0;

    if (krwBalance < requiredKrw) {
      return {
        isValid: false,
        message: `원화 잔액이 부족합니다.\n\n필요 금액: ₩ ${Math.ceil(requiredKrw).toLocaleString('ko-KR')}\n보유 금액: ₩ ${krwBalance.toLocaleString('ko-KR')}`,
      };
    }
  } else {
    // 판매: 해당 외화 잔액 확인
    const currencyWallet = wallets.wallets.find(
      (w) => w.currency === selectedCurrency
    );
    const currencyBalance = currencyWallet?.balance || 0;

    if (currencyBalance < inputAmount) {
      const currencyName = getCurrencyUnit(selectedCurrency);
      return {
        isValid: false,
        message: `${currencyName} 잔액이 부족합니다.\n\n필요 금액: ${inputAmount.toLocaleString('ko-KR')} ${selectedCurrency}\n보유 금액: ${currencyBalance.toLocaleString('ko-KR')} ${selectedCurrency}`,
      };
    }
  }

  return { isValid: true };
}
