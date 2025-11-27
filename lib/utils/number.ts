// 숫자를 3자리마다 쉼표 추가
export function formatNumber(value: string): string {
  const numericValue = value.replace(/[^0-9.]/g, '');
  if (!numericValue) return '';

  const parts = numericValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}

// 쉼표 제거
export function parseFormattedNumber(value: string): string {
  return value.replace(/,/g, '');
}

// 변동률 → "+1.23%" or "-2.45%"
export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? '+' : '-';
  const absValue = Math.abs(percentage).toFixed(2);
  return `${sign}${absValue}%`;
}
