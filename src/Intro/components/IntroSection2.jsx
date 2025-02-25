import React from 'react';
import IllustBg from './IllustBg';
import FadeInSection from './FadeInSection';
import CharacterFlower from '../../assets/images/flower.svg';

export default function IntroSection2() {
    return (
        <section className='relative w-full h-screen snap-start  gap-6 flex-col justify-center items-center z-10'>
            <FadeInSection className='absolute w-full h-full flex flex-col gap-6 md:gap-8 justify-center items-center z-10'>
                <div className='text-xl md:text-2xl font-bold space-y-2 md:space-y-3 animate-slide-up -mt-12'>
                    <p>
                        <span className='text-blue-500'>UpDay</span>는 서로의
                        도전 목표를 공유하며
                    </p>
                    <p>함께 성장하는 소셜 챌린지 서비스입니다.</p>
                </div>
                <div className='flex flex-col gap-1 md:gap-2 text-[14px] md:text-[17px] whitespace-pre-line text-wrap balance'>
                    <span>당신의 도전을 응원하는 사람들이 함께할 뿐,</span>
                    <span>누가 더 잘하는지는 중요하지 않아요.</span>
                    <span>
                        경쟁이나 부담 없이 나만의 페이스로 꾸준히 실천해보세요!
                    </span>
                </div>
            </FadeInSection>

            {/* <IllustBg className='absolute w-full h-full top-0 left-0' /> */}
        </section>
    );
}
