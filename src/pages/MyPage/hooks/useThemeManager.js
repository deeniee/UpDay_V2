import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../../store/features/themeSlice';

export const useThemeManager = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.mode); // 전역 상태
    const [theme, setLocalTheme] = useState(currentTheme || 'light');

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
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        theme,
        changeTheme: applyTheme,
    };
};
