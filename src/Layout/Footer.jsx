import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const hideFooterRoutes = ['/login', '/signup', '/profile'];
    const isFooterHidden = hideFooterRoutes.includes(location.pathname);

    if (location.pathname === '/') return null;

    return (
        <footer
            className={`w-full h-12 my-2 ${isFooterHidden ? 'hidden' : ''}`}
        >
            <div className='flex justify-between items-center w-[90vw] md:w-[80vw] md:max-w-[1344px] h-full mx-auto'>
                {/* 로고 */}

                <img alt='logo' src='/upday_logo.svg' className='h-8' />

                <div className='sub-text text-neutral-700 text-right'>
                    <p>서울 강동구 고덕로 429 팍스에비뉴 4~5층</p>
                    <p>© 2025 My Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
