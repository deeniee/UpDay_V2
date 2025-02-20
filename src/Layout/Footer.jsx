import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const hideFooterRoutes = ['/login', '/signup', '/profile'];
    const isFooterHidden = hideFooterRoutes.includes(location.pathname);

    if (location.pathname === '/') return null;

    return (
        <footer className={`${isFooterHidden ? 'hidden md:block' : ''}`}>
            <div className='flex justify-between items-center w-[80%] max-w-[1344px] h-20 mx-auto mt-10'>
                {/* 로고 */}
                <img alt='logo' src='/upday_logo.svg' className='h-[40px]' />

                <div className='text-sm text-gray-600 text-right'>
                    <p>서울 강동구 고덕로 429 팍스에비뉴 4~5층</p>
                    <p>© 2025 My Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
