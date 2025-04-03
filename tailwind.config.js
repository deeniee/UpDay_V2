/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    important: true,
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                pretendard: ['Pretendard', 'sans-serif'],
            },
            colors: {
                neutral: {
                    100: '#FFFFFF',
                    200: '#F8F5F7',
                    300: '#EAE5E8',
                    400: '#C5BDC3',
                    500: '#92868E',
                    600: '#5F4F5A',
                    700: '#2C1725',
                    800: '#160C13',
                    900: '#121212',
                },
                main: {
                    100: '#F9F7FF',
                    200: '#E5DFFC',
                    300: '#D1C8F9',
                    400: '#AA99F2',
                    500: '#7066B5',
                    600: '#3D377F',
                },
                point: {
                    100: '#F5FCFC',
                    200: '#DDF3F6',
                    300: '#BBE8ED',
                    400: '#5AC7D5',
                    500: '#2D8FA3',
                    600: '#005772',
                },
                red: {
                    100: '#FFE3E3',
                    200: '#FFB8B8',
                    300: '#FF6565',
                    400: '#EF1616',
                    500: '#C50000',
                    600: '#9E0000',
                },
                pink: {
                    100: '#FFEFFA',
                    200: '#FFE1F5',
                    300: '#FFC5EB',
                    400: '#FF9BDC',
                    500: '#F86AC7',
                    600: '#E83BAD',
                },
                blue: {
                    100: '#EFF3FF',
                    200: '#BCCDFF',
                    300: '#628BFF',
                    400: '#0042FF',
                    500: '#0032B8',
                    600: '#002271',
                },
            },
            animation: {
                'slide-up': 'slide-Up 0.8s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                slideUp: {
                    '0%': {
                        transform: 'translateY(20px)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1',
                    },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-none': {
                    '-ms-overflow-style': 'none' /* IE, Edge */,
                    'scrollbar-width': 'none' /* Firefox */,
                    '&::-webkit-scrollbar': {
                        display: 'none' /* Chrome, Safari */,
                    },
                },
            });
        },
    ],
};
