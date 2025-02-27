import React from 'react';

import FadeInSection from './FadeInSection';
import MessageCard from './MessageCard';
import IllustBg3 from './IllustBg3';

export default function IntroSection3() {
    return (
        <section className='relative w-full h-full snap-start flex flex-col py-28'>
            <div className='flex flex-col space-y-16 w-[95%] md:w-[80%] md:max-w-[640px] mx-auto'>
                <FadeInSection delay={200}>
                    <MessageCard
                        text='한눈에 보이는 진행 상황으로 목표에 한 걸음 더!'
                        position='left'
                    />
                </FadeInSection>
                <FadeInSection delay={400}>
                    <MessageCard
                        text='간편한 기록으로 더 쉽게, 더 즐겁게'
                        position='right'
                    />
                </FadeInSection>
                <FadeInSection delay={600}>
                    <MessageCard
                        text='내 속도에 맞춰 부담 없이 꾸준히!'
                        position='left'
                    />
                </FadeInSection>
                <FadeInSection delay={800}>
                    <MessageCard
                        text='경쟁 없이도 몰입! 목표 달성의 재미를 경험하세요!'
                        position='right'
                    />
                </FadeInSection>

                <FadeInSection
                    delay={1200}
                    className='flex flex-col gap-6 justify-center items-center'
                >
                    <div className='text-xl md:text-2xl font-bold z-10 mt-10 md:mt-12 animate-slide-up'>
                        <div className='flex items-center gap-1 md:gap-2'>
                            <img
                                alt='logo'
                                src='/upday_logo.svg'
                                className='h-6 md:h-8'
                            />
                            <span>를 통해 더 나은 매일을 만들어보세요.</span>
                        </div>
                    </div>
                </FadeInSection>
            </div>
            <IllustBg3 />
        </section>
    );
}
