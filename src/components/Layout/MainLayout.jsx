import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
    return (
        <div className='min-w-[390px] w-screen min-h-screen h-full flex flex-col justify-between scrollbar-none dark:bg-neutral-700'>
            <Header />
            <div className='h-full pt-12'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
