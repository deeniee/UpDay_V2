import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
    return (
        <div className='min-w-[390px] min-h-screen flex flex-col scrollbar-none md:justify-between pt-12 dark:bg-neutral-700'>
            <Header />
            <div className='main-content'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
