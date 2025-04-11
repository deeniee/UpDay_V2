/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    darkMode: 'class',
    important: true,
    content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
    theme: {
        extend: {
            fontFamily: {
                pretendard: ['Pretendard', 'sans-serif'],
            },
            colors: {
                neutral: {
                    100: '#FFFFFF',
                    200: '#F0F0F0',
                    300: '#D3D3D3',
                    400: '#B5B5B5',
                    500: '#909090',
                    600: '#7A7A7A',
                    700: '#4D4D4D',
                    800: '#303030',
                    900: '#121212',
                },
                main: {
                    100: '#F8F7FC',
                    200: '#E5DFFB',
                    300: '#D1C8F9',
                    400: '#AA99F2',
                    500: '#7066B5',
                    600: '#3D377F',
                },
                point: {
                    100: '#EDF8F8',
                    200: '#C7ECF0',
                    300: '#A1E0E8',
                    400: '#67B7C5',
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
