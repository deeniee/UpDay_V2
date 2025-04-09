import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/features/themeSlice';

export const useThemeManager = () => {
    const dispatch = useDispatch();
    // localStorage에서 초기값 직접 가져오기
    const initialTheme = localStorage.getItem('theme') || 'light';
    const [theme, setLocalTheme] = useState(initialTheme);

    const applyTheme = (themeValue) => {
        setLocalTheme(themeValue);
        dispatch(setTheme(themeValue));
        localStorage.setItem('theme', themeValue);

        if (themeValue === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        applyTheme(initialTheme); // 👈 이미 적용된 상태일 수도 있지만 문제없음
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        theme,
        changeTheme: applyTheme,
    };
};
