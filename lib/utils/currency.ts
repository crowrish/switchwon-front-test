export type Currency = 'KRW' | 'USD' | 'JPY';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
};

export const CURRENCY_NAMES: Record<Currency, string> = {
  USD: '미국 달러',
  JPY: '일본 엔화',
  KRW: '대한민국 원',
};

export const CURRENCY_UNITS: Record<Currency, string> = {
  USD: '달러',
  JPY: '엔',
  KRW: '원',
};

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency as Currency] || '';
}

export function getCurrencyName(currency: string): string {
  return CURRENCY_NAMES[currency as Currency] || currency;
}

export function getCurrencyUnit(currency: string): string {
  return CURRENCY_UNITS[currency as Currency] || currency;
}

export function formatCurrency(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol} ${amount.toLocaleString('ko-KR')}`;
}
