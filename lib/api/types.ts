// API Response 공통 타입
export interface ApiResponse<T> {
  code: string;
  message: string;
  data?: T;
}

// 인증
export interface LoginResponse {
  email: string;
  memberId: number;
  token: string;
}

// 환율 정보
export interface ExchangeRate {
  exchangeRateId: number;
  currency: 'KRW' | 'USD' | 'JPY';
  rate: number;
  changePercentage: number;
  applyDateTime: string;
}

// 지갑 정보
export interface Wallet {
  walletId: number;
  currency: 'KRW' | 'USD' | 'JPY';
  balance: number;
}

export interface WalletsResponse {
  totalKrwBalance: number;
  wallets: Wallet[];
}

// 주문/환전 견적
export interface QuoteRequest {
  fromCurrency: string;
  toCurrency: string;
  forexAmount: number;
}

export interface QuoteResponse {
  krwAmount: number;
  appliedRate: number;
}

// 주문/환전
export interface OrderRequest {
  exchangeRateId: number;
  fromCurrency: string;
  toCurrency: string;
  forexAmount: number;
}

export interface Order {
  orderId: number;
  fromCurrency: 'KRW' | 'USD' | 'JPY';
  fromAmount: number;
  toCurrency: 'KRW' | 'USD' | 'JPY';
  toAmount: number;
  appliedRate: number;
  orderedAt: string;
}
