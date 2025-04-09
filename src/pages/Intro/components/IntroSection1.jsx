import React from 'react';
import IllustBg1 from './IllustBg1';

export default function IntroSection1() {
    return (
        <section className='relative w-full h-full flex flex-col gap-4 justify-center snap-start'>
            <h1 className='w-full px-8 -mt-20 flex flex-col items-start gap-4 md:gap-6 text-3xl md:text-4xl font-bold z-10'>
                <span>일상을 변화시키는 첫걸음,</span>

                <div className='flex items-center gap-2 md:gap-3'>
                    <img
                        alt='logo'
                        src='/upday_logo_illust.svg'
                        className='h-12 md:h-14'
                    />
                    <span>에서 시작하세요!</span>
                </div>
            </h1>

            <IllustBg1 />
        </section>
    );
}
