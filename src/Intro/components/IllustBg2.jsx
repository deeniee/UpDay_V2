import React from 'react';

import Pic1 from '../../assets/images/pic_1.svg';
import Pic2 from '../../assets/images/pic_2.svg';
import Pic3 from '../../assets/images/pic_3.svg';
import BgElement1 from '../../assets/images/pic_bg1.svg';
import BgElement2 from '../../assets/images/pic_bg2.svg';
import BgElement3 from '../../assets/images/pic_bg3.svg';
import BgElement5 from '../../assets/images/pic_bg5.svg';
import BgElement6 from '../../assets/images/pic_bg6.svg';
import BgElement7 from '../../assets/images/pic_bg7.svg';

export default function IllustBg2() {
    return (
        <div className='absolute w-full h-full'>
            <img
                src={Pic1}
                alt='bg_illust_pic1'
                className='absolute right-[20%] top-[6%] h-28 md:h-36 -scale-x-100'
            />
            <img
                src={Pic2}
                alt='bg_illust_pic2'
                className='absolute left-[10%] top-[24%] h-16 md:h-24 -scale-x-100'
            />
            <img
                src={Pic3}
                alt='bg_illust_pic3'
                className='absolute right-[8%] bottom-[6%] h-40 md:h-48'
            />

            <div className='absolute right-[8%] top-[28%] flex'>
                <img
                    src={BgElement3}
                    alt='purplerock'
                    className='h-6 md:h-10 mt-4 -mr-6 z-10 -scale-x-100'
                />
                <img
                    src={BgElement2}
                    alt='pinkrock2'
                    className=' h-8 md:h-12 -scale-x-100'
                />
            </div>
            <div className='absolute left-[6%] bottom-[24%] flex gap-2'>
                <img
                    src={BgElement6}
                    alt='triangleflower'
                    className='h-14 md:h-18 mr-8 z-10'
                />
                <img
                    src={BgElement5}
                    alt='blueflower'
                    className='h-16 md:h-24 mt-4 z-10'
                />
                <img
                    src={BgElement7}
                    alt='reddotsflower'
                    className='h-10 md:h-14 -mt-4 z-10'
                />
                <img
                    src={BgElement1}
                    alt='pinkrock1'
                    className='absolute left-8 md:left-6 bottom-2 md:bottom-4 h-10 md:h-14 '
                />
            </div>
        </div>
    );
}
