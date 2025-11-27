/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        sans: [
          'var(--font-pretendard)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'sans-serif',
        ],
      },
      lineHeight: {
        primary: '133%',
      },
      maxWidth: {
        container: '1440px',
      },
      minWidth: {
        container: '1440px',
      },
      colors: {
        // Custom Brand Colors
        brand: {
          blue: '#3479EB',
        },
        // Custom Gray Scale (Tailwind 기본 gray는 유지됨)
        custom: {
          gray: {
            0: '#F7F8F9',
            100: '#F1F2F4',
            300: '#D0D6DB',
            500: '#ACB4BB',
            600: '#646F7C',
            700: '#374553',
          },
        },
        // Buy/Sell
        buy: {
          disabled: '#FFA7A7',
          primary: '#FE5050',
        },
        sell: {
          disabled: '#9DB6FF',
          primary: '#3B6EFF',
        },
        // CTA
        cta: {
          DEFAULT: '#1B2334',
          pressed: '#36414C',
          hover: '#36414C',
        },
      },
    },
  },
  plugins: [],
};
