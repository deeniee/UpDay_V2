import React from 'react';
import BgElement1 from '../../assets/images/pic_bg1.svg';
import BgElement2 from '../../assets/images/pic_bg2.svg';
import BgElement3 from '../../assets/images/pic_bg3.svg';
import BgElement4 from '../../assets/images/pic_bg4.svg';
import BgElement5 from '../../assets/images/pic_bg5.svg';
import BgElement6 from '../../assets/images/pic_bg6.svg';
import BgElement7 from '../../assets/images/pic_bg7.svg';
import BgElement8 from '../../assets/images/pic_bg8.svg';

export default function IllustBg1() {
    return (
        <div className='absolute w-full h-full '>
            <div className='absolute right-[4%] bottom-[8%] flex items-end'>
                <img
                    src={BgElement1}
                    alt='pinkrock1'
                    className='h-16 md:h-18 -mr-8 pb-1'
                />
                <img
                    src={BgElement5}
                    alt='blueflower'
                    className='h-20 md:h-24'
                />
            </div>
            <div className='absolute right-[20%] bottom-[16%] h-14 md:h-16 flex gap-1 md:gap-2'>
                <img src={BgElement7} alt='reddotsflower' />
                <img src={BgElement2} alt='pinkrock2' />
            </div>
            <div className='absolute left-[4%] bottom-[8%] flex items-end gap-1 md:gap-2'>
                <img
                    src={BgElement3}
                    alt='purplerock'
                    className='h-14 md:h-16 mb-2'
                />
                <img
                    src={BgElement6}
                    alt='triangleflower'
                    className='h-20 md:h-24 mb-12'
                />
                <img
                    src={BgElement4}
                    alt='pinkflower'
                    className='h-14 md:h-16'
                />
            </div>
            <img
                src={BgElement8}
                alt='cat'
                className='absolute right-[8%] bottom-[24%] h-14 md:h-16'
            />
        </div>
    );
}
