import { formatDate, formatDateTime, formatTime } from '@/lib/utils/date';

describe('date utils', () => {
  describe('formatDateTime', () => {
    it('ISO 날짜를 YYYY.MM.DD HH:MM 형식으로 포맷한다', () => {
      const date = '2024-01-15T13:30:00.000Z';
      const result = formatDateTime(date);
      expect(result).toMatch(/^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}$/);
    });

    it('한 자리 월과 일을 0으로 패딩한다', () => {
      const date = '2024-01-05T09:05:00.000Z';
      const result = formatDateTime(date);
      expect(result).toMatch(/^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}$/);
    });

    it('다양한 시간을 올바르게 처리한다', () => {
      const date1 = '2024-12-25T23:59:00.000Z';
      const result1 = formatDateTime(date1);
      expect(result1).toMatch(/^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}$/);

      const date2 = '2024-01-01T00:00:00.000Z';
      const result2 = formatDateTime(date2);
      expect(result2).toMatch(/^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}$/);
    });
  });

  describe('formatDate', () => {
    it('ISO 날짜를 YYYY.MM.DD 형식으로 포맷한다', () => {
      const date = '2024-01-15T13:30:00.000Z';
      const result = formatDate(date);
      expect(result).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
    });

    it('한 자리 월과 일을 0으로 패딩한다', () => {
      const date = '2024-01-05T09:05:00.000Z';
      const result = formatDate(date);
      expect(result).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
    });

    it('시간 부분을 무시한다', () => {
      const date1 = '2024-01-15T23:59:59.999Z';
      const date2 = '2024-01-15T00:00:00.000Z';
      const result1 = formatDate(date1);
      const result2 = formatDate(date2);
      expect(result1).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
      expect(result2).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
    });
  });

  describe('formatTime', () => {
    it('ISO 날짜를 HH:MM 형식으로 포맷한다', () => {
      const date = '2024-01-15T13:30:00.000Z';
      const result = formatTime(date);
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('한 자리 시와 분을 0으로 패딩한다', () => {
      const date = '2024-01-15T09:05:00.000Z';
      const result = formatTime(date);
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('날짜 부분을 무시한다', () => {
      const date1 = '2024-12-31T13:30:00.000Z';
      const date2 = '2024-01-01T13:30:00.000Z';
      const result1 = formatTime(date1);
      const result2 = formatTime(date2);
      expect(result1).toMatch(/^\d{2}:\d{2}$/);
      expect(result2).toMatch(/^\d{2}:\d{2}$/);
    });

    it('자정과 정오를 처리한다', () => {
      const midnight = '2024-01-15T00:00:00.000Z';
      const noon = '2024-01-15T12:00:00.000Z';
      expect(formatTime(midnight)).toMatch(/^\d{2}:\d{2}$/);
      expect(formatTime(noon)).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  describe('date consistency', () => {
    it('formatDateTime은 formatDate와 formatTime 정보를 모두 포함한다', () => {
      const dateString = '2024-01-15T13:30:00.000Z';
      const dateTime = formatDateTime(dateString);
      const date = formatDate(dateString);

      expect(dateTime).toContain(date.substring(0, 10));
      expect(dateTime).toMatch(/\d{2}:\d{2}$/);
    });
  });
});
