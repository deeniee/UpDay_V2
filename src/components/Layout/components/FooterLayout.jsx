import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FooterLayout = () => {
    const location = useLocation();
    const hideFooterRoutes = ['/login', '/signup', '/profile'];
    const isFooterHidden = hideFooterRoutes.includes(location.pathname);
    const appliedTheme = useSelector((state) => state.theme.mode);

    const logoSrc = () => {
        if (appliedTheme === 'dark') {
            return 'upday_logo_white.svg';
        } else if (appliedTheme === 'system') {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            return prefersDark ? 'upday_logo_white.svg' : 'upday_logo.svg';
        } else {
            return 'upday_logo.svg';
        }
    };
    if (location.pathname === '/') return null;

    return (
        <footer className={`w-full h-12 ${isFooterHidden ? 'hidden' : ''}`}>
            <div className='flex justify-between items-center w-[90vw] min-w-[336px] md:w-[80vw] md:max-w-[1344px] h-full mx-auto'>
                {/* 로고 */}

                <img alt='logo' src={logoSrc()} className='h-6 md:h-8' />
                <div className='sub-text text-neutral-700 text-right dark:text-neutral-100'>
                    <p>서울 강동구 고덕로 429 팍스에비뉴 4~5층</p>
                    <p>© 2025 My Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterLayout;
