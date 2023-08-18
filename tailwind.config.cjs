/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

const appTheme = {
    extend: {
        colors: {
            primary: {
                DEFAULT: '#6089f4',
                50: '#eef6ff',
                100: '#dfefff',
                200: '#c6e0ff',
                300: '#a3cafe',
                400: '#7fa9fa',
                500: '#6089f4',
                600: '#5371ea',
                700: '#3550cd',
                800: '#2e45a5',
                900: '#2c3e83',
                950: '#1a244c',
            },
            secondary: {
                DEFAULT: '#00d49c',
                50: '#e9fff7',
                100: '#caffe9',
                200: '#9bffd9',
                300: '#6bfbce',
                400: '#1aedb2',
                500: '#00d49c',
                600: '#00ad81',
                700: '#008b6b',
                800: '#006d55',
                900: '#005a48',
                950: '#00332a',
            },
            neutral: {
                DEFAULT: '#707087',
                50: '#f7f7f8',
                100: '#eeedf1',
                200: '#d8d8df',
                300: '#b6b6c3',
                400: '#8e8ea2',
                500: '#707087',
                600: '#5b5a6f',
                700: '#464555',
                800: '#403f4d',
                900: '#393842',
                950: '#26252c',
            },
            surface: {
                DEFAULT: '#111827',
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
                950: '#030712',
            },
        },
        fontFamily: {
            sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            accent: ['Signika', ...defaultTheme.fontFamily.sans],
        },
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        height: {
            navbar: '7rem',
            topnavbar: '4rem',
            subnavbar: '3rem',
            content: 'calc(100vh - 7rem)',
        },
        minHeight: {
            content: 'calc(100vh - 7rem)',
        },
        margin: {
            navbar: '7rem',
        },
        padding: {
            navbar: '7rem',
        },
        keyframes: {
            'zoom-in-out': {
                '0%, 100%': { transform: 'scale(100%)' },
                '50%': { transform: 'scale(95%)' },
            },
        },
        animation: {
            'zoom-in-out': 'zoom-in-out 300ms ease-in',
            ripple: 'ripple 600ms linear',
        },
    },
};

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    theme: appTheme,
    plugins: [require('@tailwindcss/typography')],
};
