import { Helmet } from 'react-helmet';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CharacterLamp from '../../assets/images/buld.svg';
import CharacterDust from '../../assets/images/dust.svg';
import CharacterHeart from '../../assets/images/heart.svg';
import CharacterSpoon from '../../assets/images/spoon.svg';

import Bg from '../img/bg-element.svg';
import BgMobile from '../img/BgMob2.svg';
import List from '../img/CardList.svg';
import ListMobile from '../img/CardListMobile.svg';
import SearchBar from './SearchBar';
import FadeInSection from './FadeInSection';
import SpeechBubble from './SpeechBubble';

const IntroLayout = () => {
    const sectionsRef = useRef([]);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    const handleClick2 = () => {
        navigate('/challengelist');
    };

    return (
        <>
            <Helmet>
                <title>서비스 소개 - UpDay</title>
            </Helmet>
            <main className='w-[90%] md:w-[80%] md:max-w-[1344px] mx-auto h-full scrollbar-none snap-y snap-mandatory'>
                <section className='w-full h-full flex flex-col gap-4 justify-center items-start snap-start'>
                    <h1 className='flex flex-col gap-2 text-3xl font-bold mb-4 animate-slide-up'>
                        <span>바로 지금,</span>
                        <span>당신의 챌린지를</span>
                        <span>
                            <span className='text-blue-500 font-bold'>
                                UpDay
                            </span>
                            와 함께해요!
                        </span>
                    </h1>
                    <div className='flex h-20'>
                        <img src={CharacterLamp} alt='Character_Lamp'></img>
                        <img src={CharacterDust} alt='Character_Dust'></img>
                        <img src={CharacterHeart} alt='Character_Heart'></img>
                        <img src={CharacterSpoon} alt='Character_Spoon'></img>
                    </div>
                </section>

                <section className='h-screen snap-start flex-grow flex-col justify-center items-center'>
                    <div className='fade-in w-[80%] max-w-[1344px] mx-auto relative z-10 text-center pt-[180px]'>
                        <div className='relative w-full h-full'>
                            {/* 큰 화면에서는 object-contain */}
                            <img
                                src={Bg}
                                alt='Background'
                                className='absolute inset-0 w-full h-auto mx-auto object-contain max-h-[1000px] z-0 hidden md:block'
                            />
                        </div>

                        <div className='w-full flex justify-center md:hidden'>
                            <img
                                src={BgMobile}
                                alt='Background'
                                className='absolute top-0 w-auto h-[900px]'
                            />
                        </div>

                        <FadeInSection className='flex flex-col gap-6 justify-center items-center'>
                            <div className='text-xl md:text-2xl font-bold z-10 mt-10 md:mt-12 animate-slide-up'>
                                <p>
                                    <span className='text-blue-500'>UpDay</span>
                                    는 서로의 도전 목표를 공유하며
                                </p>
                                <p>함께 성장하는 소셜 챌린지 서비스입니다.</p>
                            </div>
                            <div className='flex flex-col gap-1 text-[14px] md:text-[18px] whitespace-pre-line text-wrap balance z-10 relative animate-slide-up'>
                                <span>
                                    당신의 도전을 응원하는 사람들이 함께할 뿐,
                                </span>
                                <span>누가 더 잘하는지는 중요하지 않아요.</span>
                                <span>
                                    경쟁이나 부담 없이 나만의 페이스로 꾸준히
                                    실천해보세요!
                                </span>
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                {/* 작동 되는 코드 웹, 모바일 둘다 잘됨 */}
                <section className='w-full h-full snap-start flex flex-col'>
                    <div className='flex flex-col space-y-8 w-[95%] md:w-[80%] md:max-w-[640px] mx-auto pt-10'>
                        <FadeInSection delay={200}>
                            <SpeechBubble
                                text='👥 같은 목표를 가진 사람들과 응원하며 성장'
                                position='left'
                            />
                        </FadeInSection>
                        <FadeInSection delay={400}>
                            <SpeechBubble
                                text='🎯 매일 작은 실천으로 꾸준한 습관 형성'
                                position='right'
                            />
                        </FadeInSection>
                        <FadeInSection delay={600}>
                            <SpeechBubble
                                text='📈 함께라서 더 빠르고, 더 멀리 나아가는 여정!'
                                position='left'
                            />
                        </FadeInSection>
                        <FadeInSection delay={800}>
                            <SpeechBubble
                                text='🔥 혼자가 아닌 함께, 더 즐겁고 쉽게 목표 완수!'
                                position='right'
                            />
                        </FadeInSection>

                        <FadeInSection delay={800}>
                            <p className='text-2xl text-center pt-35 leading-[2] font-bold pt-10'>
                                좋은 습관으로 매일 <br className='md:hidden' />
                                더 나은 나를 만들어보세요! <br />
                                오늘부터{' '}
                                <span className='text-3xl text-blue-500 font-bold'>
                                    UpDay
                                </span>
                                와 <br className='md:hidden' />
                                함께 도전해볼까요? 💪😊
                            </p>
                        </FadeInSection>
                    </div>
                </section>

                <div className='min-h-screen snap-start flex flex-col flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center w-[80%] max-w-[1344px] mx-auto pt-[160px] pb-[80px] '>
                        <FadeInSection>
                            <p className='text-2xl font-bold text-center leading-relaxed animate-slide-up'>
                                현재 진행중인 챌린지
                            </p>
                            <p className='text-5xl font-bold text-center leading-relaxed -mt-3 text-blue-500'>
                                1,200개
                            </p>
                        </FadeInSection>
                        <FadeInSection>
                            <p className='text-2xl font-bold text-center mt-10 leading-relaxed animate-slide-up'>
                                원하는 챌린지를 검색하고
                                <br />
                                오늘부터 좋은 습관을 만들어봐요.
                            </p>
                        </FadeInSection>
                        <div className='flex justify-center mt-8 w-[80%] max-w-[1344px] mx-auto pt-10 pb-10'>
                            <SearchBar />
                        </div>
                        <img
                            src={List}
                            alt='ChartList'
                            className='w-[80%] pt-10 pb-10 hidden md:block'
                            onClick={handleClick2}
                        ></img>
                        <img
                            src={ListMobile}
                            alt='ListMobile'
                            className='w-[80%] pt-10 pb-10 md:hidden'
                            onClick={handleClick2}
                        />

                        <button
                            className='btn btn-key item-center justify-center w-[80%] h-14 mt-10 '
                            onClick={handleClick2}
                        >
                            챌린지 시작하러가기
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default IntroLayout;
