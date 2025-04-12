import React from 'react';

import PicHabit from '../../../assets/images/icons/pic_habit.svg';
import PicHealth from '../../../assets/images/icons/pic_health.svg';
import PicStudy from '../../../assets/images/icons/pic_study.svg';
import PicEtc from '../../../assets/images/icons/pic_etc.svg';
import FadeInSection from './FadeInSection';

export default function IllustBg3() {
    return (
        <div className='absolute w-full md:max-w-[640px] h-auto mx-auto inset-0 pt-28 md:pt-36 z-0'>
            <FadeInSection delay={200} className='absolute left-[76%]'>
                <img
                    src={PicStudy}
                    alt='pic_study'
                    className='h-16 md:h-20 -scale-x-100'
                />
            </FadeInSection>
            <FadeInSection
                delay={400}
                className='absolute top-48 md:top-[216px] right-[62%] md:right-[60.5%]'
            >
                <img
                    src={PicEtc}
                    alt='pic_etc'
                    className='h-16 md:h-20 -scale-x-100'
                />
            </FadeInSection>
            <FadeInSection
                delay={600}
                className='absolute top-72 md:top-80 left-[62%] md:left-[60.5%]'
            >
                <img src={PicHabit} alt='pic_habit' className='h-16 md:h-20' />
            </FadeInSection>
            <FadeInSection
                delay={800}
                className='absolute top-[400px] md:top-[448px] right-[76%]'
            >
                <img
                    src={PicHealth}
                    alt='pic_health'
                    className=' h-16 md:h-20'
                />
            </FadeInSection>
        </div>
    );
}
