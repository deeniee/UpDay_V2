import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../store/features/themeSlice';

export const useThemeManager = () => {
    const dispatch = useDispatch();
    const storedTheme = localStorage.getItem('theme') || 'light'; // localStorage에서 초기값 직접 가져오기
    const [theme, setLocalTheme] = useState(storedTheme);
    const [appliedTheme, setAppliedTheme] = useState(() => {
        if (storedTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        }
        return storedTheme;
    });

    const applyTheme = (themeValue) => {
        setLocalTheme(themeValue);
        dispatch(setTheme(themeValue));
        localStorage.setItem('theme', themeValue);

        let finalTheme = themeValue;
        if (themeValue === 'system') {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            finalTheme = prefersDark ? 'dark' : 'light';
        }

        setAppliedTheme(finalTheme);

        if (finalTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        applyTheme(storedTheme); // 이미 적용된 상태일 수도 있지만 문제없음
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 유저가 시스템 설정을 바꿨을 때 자동으로 적용
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'system') {
                applyTheme('system'); // 다시 감지해서 적용
            }
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    });

    return {
        theme,
        appliedTheme,
        changeTheme: applyTheme,
    };
};
