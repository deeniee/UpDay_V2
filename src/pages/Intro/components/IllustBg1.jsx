import React from 'react';

import Pic4 from '../../../assets/images/backgrounds/pic_4.svg';
import BgElement1 from '../../../assets/images/backgrounds/pic_bg1.svg';
import BgElement2 from '../../../assets/images/backgrounds/pic_bg2.svg';
import BgElement3 from '../../../assets/images/backgrounds/pic_bg3.svg';
import BgElement4 from '../../../assets/images/backgrounds/pic_bg4.svg';
import BgElement5 from '../../../assets/images/backgrounds/pic_bg5.svg';
import BgElement6 from '../../../assets/images/backgrounds/pic_bg6.svg';
import BgElement7 from '../../../assets/images/backgrounds/pic_bg7.svg';
import BgElement8 from '../../../assets/images/backgrounds/pic_bg8.svg';

export default function IllustBg1() {
    return (
        <div className='absolute w-full h-full '>
            <img
                src={Pic4}
                alt='bg_illust_pic4'
                className='absolute right-[15%] md:right-[18%] top-[10%] h-40 md:h-56 -scale-x-100'
            />
            <div className='absolute right-[4%] bottom-[8%] flex items-end'>
                <img
                    src={BgElement1}
                    alt='pinkrock1'
                    className='h-12 md:h-24 -mr-8 pb-1'
                />
                <img
                    src={BgElement6}
                    alt='triangleflower'
                    className='h-20 md:h-28'
                />
            </div>
            <div className='absolute right-[22%] md:right-[25%] bottom-[18%] md:bottom-[20%] flex items-center gap-1 md:gap-2'>
                <img
                    src={BgElement5}
                    alt='blueflower'
                    className='h-12 md:h-20 '
                />
                <img
                    src={BgElement2}
                    alt='pinkrock2'
                    className=' h-10 md:h-16 '
                />
            </div>
            <div className='absolute left-[4%] bottom-[8%] flex items-end gap-1 md:gap-2'>
                <img
                    src={BgElement3}
                    alt='purplerock'
                    className='h-10 md:h-16 mb-2'
                />
                <img
                    src={BgElement7}
                    alt='reddotsflower'
                    className='h-20 md:h-28 -ml-4 mb-12'
                />
                <img
                    src={BgElement4}
                    alt='pinkflower'
                    className='h-10 md:h-16 ml-4'
                />
            </div>
            <img
                src={BgElement8}
                alt='cat'
                className='absolute right-[2%] md:right-[8%] bottom-[22%] md:bottom-[24%] h-10 md:h-16'
            />
        </div>
    );
}
