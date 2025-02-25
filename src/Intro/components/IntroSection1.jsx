import React from 'react';

import CharacterLamp from '../../assets/images/buld.svg';
import CharacterDust from '../../assets/images/dust.svg';
import CharacterHeart from '../../assets/images/heart.svg';
import CharacterSpoon from '../../assets/images/spoon.svg';
import CharacterFlower from '../../assets/images/flower.svg';

import IllustBg from './IllustBg';

export default function IntroSection1() {
    return (
        <section className='relative w-full h-full flex flex-col gap-4 justify-center items-start snap-start'>
            <h1 className='w-full px-8 flex flex-col gap-2 md:gap-3 text-2xl md:text-3xl font-bold mb-4 animate-slide-up z-10'>
                <span>바로 지금,</span>
                <span>당신의 챌린지를</span>
                <span>
                    <span className='text-blue-500 font-bold'>UpDay</span>와
                    함께해요!
                </span>
            </h1>
            <IllustBg className='absolute w-full h-full top-0 left-0' />
        </section>
    );
}
