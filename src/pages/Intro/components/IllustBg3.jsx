import React from 'react';

import PicHabit from '../../../assets/images/icons/pic_habit.svg';
import PicHealth from '../../../assets/images/icons/pic_health.svg';
import PicStudy from '../../../assets/images/icons/pic_study.svg';
import PicEtc from '../../../assets/images/icons/pic_etc.svg';

export default function IllustBg3() {
    return (
        <div className='absolute w-full h-full inset-0'>
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
