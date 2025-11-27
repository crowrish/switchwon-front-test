import { useCallback, useState } from 'react';

export function useToast() {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3100);
  }, []);

  return {
    toastMessage,
    showToast,
  };
}
