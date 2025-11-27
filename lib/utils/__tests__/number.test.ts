import {
  formatNumber,
  formatPercentage,
  parseFormattedNumber,
} from '@/lib/utils/number';

describe('number utils', () => {
  describe('formatNumber', () => {
    it('정수를 천 단위 구분자로 포맷한다', () => {
      expect(formatNumber('1000')).toBe('1,000');
      expect(formatNumber('1234567')).toBe('1,234,567');
    });

    it('소수를 포맷한다', () => {
      expect(formatNumber('1000.50')).toBe('1,000.50');
      expect(formatNumber('1234567.89')).toBe('1,234,567.89');
    });

    it('빈 입력에 빈 문자열을 반환한다', () => {
      expect(formatNumber('')).toBe('');
    });

    it('점을 제외한 숫자가 아닌 문자를 제거한다', () => {
      expect(formatNumber('1000abc')).toBe('1,000');
      expect(formatNumber('1,000')).toBe('1,000');
    });

    it('점만 있는 입력을 처리한다', () => {
      expect(formatNumber('.')).toBe('.');
    });

    it('여러 개의 점을 처리한다', () => {
      expect(formatNumber('1.2.3')).toBe('1.2.3');
    });
  });

  describe('parseFormattedNumber', () => {
    it('포맷된 숫자에서 쉼표를 제거한다', () => {
      expect(parseFormattedNumber('1,000')).toBe('1000');
      expect(parseFormattedNumber('1,234,567')).toBe('1234567');
    });

    it('쉼표가 없는 숫자를 처리한다', () => {
      expect(parseFormattedNumber('1000')).toBe('1000');
    });

    it('소수점을 유지한다', () => {
      expect(parseFormattedNumber('1,000.50')).toBe('1000.50');
    });

    it('빈 문자열을 처리한다', () => {
      expect(parseFormattedNumber('')).toBe('');
    });
  });

  describe('formatPercentage', () => {
    it('양수 변동률을 + 부호로 포맷한다', () => {
      expect(formatPercentage(1.23)).toBe('+1.23%');
    });

    it('음수 변동률을 - 부호로 포맷한다', () => {
      expect(formatPercentage(-2.45)).toBe('-2.45%');
    });

    it('0을 + 부호로 포맷한다', () => {
      expect(formatPercentage(0)).toBe('+0.00%');
    });

    it('소수점 2자리로 포맷한다', () => {
      expect(formatPercentage(1.2345)).toBe('+1.23%');
      expect(formatPercentage(-2.6789)).toBe('-2.68%');
    });

    it('정수를 처리한다', () => {
      expect(formatPercentage(5)).toBe('+5.00%');
      expect(formatPercentage(-10)).toBe('-10.00%');
    });
  });
});
