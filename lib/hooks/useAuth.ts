import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { loginAction } from '@/lib/actions/auth.actions';
import { useAuthStore } from '@/lib/stores/auth-store';

export function useLogin() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (email: string) => {
      const response = await loginAction(email);
      return response;
    },
    onSuccess: (response) => {
      // API는 성공 시 'OK' 코드를 반환
      if (response.code !== 'OK' || !response.data) {
        throw new Error(response.message || '로그인 응답 데이터가 없습니다.');
      }

      // Zustand store에 로그인 정보 저장
      login(response.data.email, response.data.memberId);

      // 환율 정보 페이지로 이동
      router.push('/exchange-rate');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return async () => {
    await logout();
    router.push('/');
  };
}
