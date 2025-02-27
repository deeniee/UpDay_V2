import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import List from '../img/CardList.svg';
import ListMobile from '../img/CardListMobile.svg';
import FadeInSection from './FadeInSection';

export default function IntroSection4() {
    const sectionsRef = useRef([]);
    const navigate = useNavigate();

    const handleClickForLogin = () => {
        navigate('/login');
    };

    const handleClickForClgList = () => {
        navigate('/challengelist');
    };
    return (
        <section className='min-h-screen snap-start flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-4 justify-center items-center mx-auto pt-[20vh] '>
                <FadeInSection className='flex flex-col gap-2'>
                    <p className='text-xl md:text-2xl font-semibold text-center animate-slide-up'>
                        현재 진행중인 챌린지
                    </p>
                    <p className='text-2xl md:text-3xl font-semibold text-center  text-blue-500'>
                        1,200개
                    </p>
                </FadeInSection>

                <FadeInSection>
                    <p className='text-[14px] md:text-[17px] text-center animate-slide-up'>
                        원하는 챌린지를 검색하고 오늘부터 좋은 습관을
                        만들어봐요.
                    </p>
                </FadeInSection>

                <img
                    src={List}
                    alt='ChartList'
                    className='w-[80%] pt-10 pb-10 hidden md:block'
                    onClick={handleClickForClgList}
                ></img>
                <img
                    src={ListMobile}
                    alt='ListMobile'
                    className='w-[80%] pt-10 pb-10 md:hidden'
                    onClick={handleClickForClgList}
                />

                <button
                    className='btn btn-key item-center justify-center w-[80%] h-14 mt-10 '
                    onClick={handleClickForClgList}
                >
                    챌린지 시작하러가기
                </button>
            </div>
        </section>
    );
}
