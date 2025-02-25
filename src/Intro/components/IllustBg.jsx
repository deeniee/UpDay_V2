import React from 'react';

import Element01 from '../../assets/images/bg_element01.svg';
import Element02 from '../../assets/images/bg_element02.svg';
import Element03 from '../../assets/images/bg_element03.svg';
import Element04 from '../../assets/images/bg_element04.svg';
import Element05 from '../../assets/images/bg_element05.svg';
import Element06 from '../../assets/images/bg_element06.svg';
import Element07 from '../../assets/images/bg_element07.svg';
import Element08 from '../../assets/images/bg_element08.svg';

export default function IllustBg() {
    return (
        <div>
            <img
                src={Element06}
                alt='bg_pinkstar'
                className='absolute top-[20%] left-[12%] h-14 md:h-16 -rotate-45'
            />
            <img
                src={Element03}
                alt='bg_whitedots'
                className='absolute left-[32%] top-[4%] h-12 md:h-14 rotate-45'
            />
            <img
                src={Element05}
                alt='bg_bluecloud'
                className='absolute top-[10%] right-[16%] h-14 md:h-16'
            />
            <img
                src={Element02}
                alt='bg_yellowstar'
                className='absolute right-[14%] top-[24%] h-12 md:h-14'
            />

            <img
                src={Element08}
                alt='bg_bluestar'
                className='absolute left-[2%] bottom-[24%] h-14 md:h-16'
            />
            <img
                src={Element07}
                alt='bg_yellowcloud'
                className='absolute left-[24%] bottom-[12%] h-10 md:h-12'
            />
            <img
                src={Element04}
                alt='bg_whitestar'
                className='absolute right-[36%] bottom-[28%] h-14 md:h-16'
            />
            <img
                src={Element01}
                alt='bg_pinkdots'
                className='absolute right-[8%] bottom-[16%] h-14 md:h-16'
            />
        </div>
    );
}
