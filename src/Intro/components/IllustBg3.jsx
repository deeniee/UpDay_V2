import React from 'react';

import FadeInSection from './FadeInSection';
import PicHabit from '../../assets/images/pic_habit.svg';
import PicHealth from '../../assets/images/pic_health.svg';
import PicStudy from '../../assets/images/pic_study.svg';
import PicEtc from '../../assets/images/pic_etc.svg';

export default function IllustBg3() {
    return (
        <div className='absolute w-full h-full inset-0'>
            {/* <FadeInSection delay={200}>
                <img
                    src={PicStudy}
                    alt='pic_study'
                    className='absolute left-[75%] md:left-[70%] top-[5.5rem] md:top-[5rem] h-20 md:h-24 -scale-x-100'
                />
            </FadeInSection>
            <FadeInSection delay={400}>
                <img
                    src={PicEtc}
                    alt='pic_etc'
                    className='absolute right-[60%] md:right-[56%] top-[11rem] md:top-[10.5rem] h-20 md:h-24 -scale-x-100'
                />
            </FadeInSection>
            <FadeInSection delay={600}>
                <img
                    src={PicHabit}
                    alt='pic_habit'
                    className='absolute left-[57%] md:left-[56%] top-[17.5rem] md:top-[18rem] h-20 md:h-24'
                />
            </FadeInSection>
            <FadeInSection delay={800}>
                <img
                    src={PicHealth}
                    alt='pic_health'
                    className='absolute right-[75%] md:right-[70%] top-[26rem] md:top-[26.5rem] h-20 md:h-24'
                />
            </FadeInSection> */}

            <img
                src={PicStudy}
                alt='pic_study'
                className='absolute left-[75%] md:left-[70%] top-[5.5rem] md:top-[5rem] h-20 md:h-24 -scale-x-100'
            />

            <img
                src={PicEtc}
                alt='pic_etc'
                className='absolute right-[60%] md:right-[56%] top-[11rem] md:top-[10.5rem] h-20 md:h-24 -scale-x-100'
            />

            <img
                src={PicHabit}
                alt='pic_habit'
                className='absolute left-[57%] md:left-[56%] top-[17.5rem] md:top-[18rem] h-20 md:h-24'
            />

            <img
                src={PicHealth}
                alt='pic_health'
                className='absolute right-[75%] md:right-[70%] top-[26rem] md:top-[26.5rem] h-20 md:h-24'
            />
        </div>
    );
}
