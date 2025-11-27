'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Button, Input } from '@/components/atoms';
import { AlertModal } from '@/components/molecules';
import { useLogin } from '@/lib/hooks/useAuth';
import { validateEmail } from '@/lib/utils/validation';

export const LoginTemplate = () => {
  const [email, setEmail] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const login = useLogin();

  const handleLogin = () => {
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setAlertMessage(validation.message || '');
      setIsAlertOpen(true);
      return;
    }

    login.mutate(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        {/* RSS 아이콘 */}
        <Image
          src="/images/ic_rss.svg"
          alt="RSS Icon"
          width={80}
          height={80}
          className="mb-6"
        />

        {/* 반갑습니다 */}
        <h1 className="text-center text-[48px] font-bold leading-primary text-custom-gray-700">
          반갑습니다
        </h1>

        {/* 로그인 정보를 입력해주세요 */}
        <p className="text-center text-[32px] font-medium leading-primary">
          로그인 정보를 입력해주세요.
        </p>

        {/* 로그인 폼 박스 */}
        <div className="mt-8 flex w-[560px] flex-col gap-8 rounded-[20px] border border-custom-gray-0 bg-[#F7F8F9] px-8 py-6">
          <div className="flex flex-col gap-3">
            {/* 이메일 주소를 입력해주세요 */}
            <label
              htmlFor="email-input"
              className="text-[20px] font-medium leading-primary text-custom-gray-600"
            >
              이메일 주소를 입력해주세요.
            </label>

            {/* Input */}
            <Input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full"
              placeholder="이메일을 입력하세요"
              disabled={login.isPending}
            />
          </div>

          {/* Button */}
          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={login.isPending}
          >
            {login.isPending ? '로그인 중...' : '로그인 하기'}
          </Button>
        </div>

        {/* Alert Modal */}
        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          title="입력 오류"
          message={alertMessage}
        />
      </div>
    </div>
  );
};
