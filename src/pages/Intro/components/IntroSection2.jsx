import React from 'react';
import { useSelector } from 'react-redux';
import FadeInSection from './FadeInSection';
import IllustBg2 from './IllustBg2';

export default function IntroSection2() {
    const theme = useSelector((state) => state.theme.mode);

    const getLogo = () => {
        return theme === 'dark' ? 'upday_logo_white.svg' : 'upday_logo.svg';
    };

    return (
        <section className='relative w-full h-full snap-start'>
            <FadeInSection className='absolute w-full h-full flex flex-col gap-6 md:gap-8 justify-center items-center z-10'>
                <div className='text-base md:text-lg font-bold space-y-1 md:space-y-2 animate-slide-up -mt-12 md:flex md:gap-2 md:items-end'>
                    <div className='flex items-center gap-0.5 md:gap-1'>
                        <img
                            alt='logo'
                            src={getLogo()}
                            className='h-4 md:h-5'
                        />
                        <p>는 서로의 도전 목표를 공유하며</p>
                    </div>
                    <p>함께 성장하는 소셜 챌린지 서비스입니다.</p>
                </div>
                <div className='flex flex-col items-center gap-1 md:gap-2 text-sm md:text-base whitespace-pre-line text-wrap balance'>
                    <div className='flex flex-col items-center md:flex-row gap-1'>
                        <span>당신의 도전을 응원하는 사람들이 함께할 뿐,</span>
                        <span>누가 더 잘하는지는 중요하지 않아요.</span>
                    </div>
                    <span>
                        경쟁이나 부담 없이 나만의 페이스로 꾸준히 실천해보세요!
                    </span>
                </div>
            </FadeInSection>

            <IllustBg2 />
        </section>
    );
}
