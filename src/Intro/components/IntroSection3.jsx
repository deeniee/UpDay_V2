import React from 'react';
import FadeInSection from './FadeInSection';
import MessageCard from './MessageCard';

export default function IntroSection3() {
    return (
        <section className='w-full h-full snap-start flex flex-col'>
            <div className='flex flex-col space-y-8 w-[95%] md:w-[80%] md:max-w-[640px] mx-auto pt-10'>
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
                        text='내 속도에 맞춘 도전으로 부담 없이 꾸준히!'
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
                    delay={1000}
                    className='flex flex-col gap-6 justify-center items-center'
                >
                    <div className='text-xl md:text-2xl font-bold z-10 mt-10 md:mt-12 animate-slide-up'>
                        <p>
                            <span className='text-blue-500'>UpDay</span>를 통해
                            더 나은 매일을 만들어보세요!
                        </p>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
