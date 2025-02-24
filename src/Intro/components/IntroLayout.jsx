import { Helmet } from 'react-helmet';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CharacterLamp from '../../assets/images/buld.svg';
import CharacterDust from '../../assets/images/dust.svg';
import CharacterHeart from '../../assets/images/heart.svg';
import CharacterSpoon from '../../assets/images/spoon.svg';

import IllustBg from './IllustBg';
import List from '../img/CardList.svg';
import ListMobile from '../img/CardListMobile.svg';
import SearchBar from './SearchBar';
import FadeInSection from './FadeInSection';
import MessageCard from './MessageCard';

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
                    {/* <div className='flex h-20'>
                        <img src={CharacterLamp} alt='Character_Lamp'></img>
                        <img src={CharacterDust} alt='Character_Dust'></img>
                        <img src={CharacterHeart} alt='Character_Heart'></img>
                        <img src={CharacterSpoon} alt='Character_Spoon'></img>
                    </div> */}
                </section>

                <section className='relative w-full h-screen snap-start flex-grow flex-col justify-center items-center'>
                    <FadeInSection className='absolute w-full h-full flex flex-col gap-6 justify-center items-center z-10'>
                        <div className='text-xl md:text-2xl font-bold animate-slide-up -mt-12'>
                            <p>
                                <span className='text-blue-500'>UpDay</span>는
                                서로의 도전 목표를 공유하며
                            </p>
                            <p>함께 성장하는 소셜 챌린지 서비스입니다.</p>
                        </div>
                        <div className='flex flex-col gap-1 text-[14px] md:text-[18px] whitespace-pre-line text-wrap balance'>
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
                    <IllustBg className='absolute w-full h-full top-0 left-0' />
                </section>

                {/* 작동 되는 코드 웹, 모바일 둘다 잘됨 */}
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
                                    <span className='text-blue-500'>UpDay</span>
                                    를 통해 더 나은 매일을 만들어보세요!
                                </p>
                            </div>
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
