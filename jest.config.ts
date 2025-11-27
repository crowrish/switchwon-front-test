import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Next.js 앱의 루트 경로
  dir: './',
});

const config: Config = {
  // 테스트 환경
  testEnvironment: 'jest-environment-jsdom',

  // 모듈 경로 매핑 (tsconfig.json의 paths와 동일하게)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Setup 파일
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // 테스트 파일 패턴
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // 커버리지 수집 대상
  collectCoverageFrom: [
    'lib/utils/**/*.{js,jsx,ts,tsx}',
    '!lib/utils/**/*.d.ts',
    '!lib/utils/**/index.ts',
  ],

  // 테스트 무시 경로
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],

  // 모듈 파일 확장자
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};

export default createJestConfig(config);
