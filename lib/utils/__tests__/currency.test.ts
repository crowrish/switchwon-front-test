import {
  formatCurrency,
  getCurrencyName,
  getCurrencySymbol,
  getCurrencyUnit,
} from '@/lib/utils/currency';

describe('currency utils', () => {
  describe('getCurrencySymbol', () => {
    it('USD 심볼을 반환한다', () => {
      expect(getCurrencySymbol('USD')).toBe('$');
    });

    it('JPY 심볼을 반환한다', () => {
      expect(getCurrencySymbol('JPY')).toBe('¥');
    });

    it('KRW 심볼을 반환한다', () => {
      expect(getCurrencySymbol('KRW')).toBe('₩');
    });

    it('알 수 없는 통화는 빈 문자열을 반환한다', () => {
      expect(getCurrencySymbol('UNKNOWN')).toBe('');
    });
  });

  describe('getCurrencyName', () => {
    it('USD 전체 이름을 반환한다', () => {
      expect(getCurrencyName('USD')).toBe('미국 달러');
    });

    it('JPY 전체 이름을 반환한다', () => {
      expect(getCurrencyName('JPY')).toBe('일본 엔화');
    });

    it('KRW 전체 이름을 반환한다', () => {
      expect(getCurrencyName('KRW')).toBe('대한민국 원');
    });

    it('알 수 없는 통화는 입력값을 반환한다', () => {
      expect(getCurrencyName('UNKNOWN')).toBe('UNKNOWN');
    });
  });

  describe('getCurrencyUnit', () => {
    it('USD 단위를 반환한다', () => {
      expect(getCurrencyUnit('USD')).toBe('달러');
    });

    it('JPY 단위를 반환한다', () => {
      expect(getCurrencyUnit('JPY')).toBe('엔');
    });

    it('KRW 단위를 반환한다', () => {
      expect(getCurrencyUnit('KRW')).toBe('원');
    });

    it('알 수 없는 통화는 입력값을 반환한다', () => {
      expect(getCurrencyUnit('UNKNOWN')).toBe('UNKNOWN');
    });
  });

  describe('formatCurrency', () => {
    it('USD를 올바르게 포맷한다', () => {
      expect(formatCurrency(1000, 'USD')).toBe('$ 1,000');
    });

    it('JPY를 올바르게 포맷한다', () => {
      expect(formatCurrency(1000, 'JPY')).toBe('¥ 1,000');
    });

    it('KRW를 올바르게 포맷한다', () => {
      expect(formatCurrency(1000, 'KRW')).toBe('₩ 1,000');
    });

    it('큰 숫자에 천 단위 구분자를 추가한다', () => {
      expect(formatCurrency(1234567, 'USD')).toBe('$ 1,234,567');
    });

    it('0을 올바르게 포맷한다', () => {
      expect(formatCurrency(0, 'USD')).toBe('$ 0');
    });

    it('소수를 처리한다', () => {
      expect(formatCurrency(1000.5, 'USD')).toBe('$ 1,000.5');
    });
  });
});
