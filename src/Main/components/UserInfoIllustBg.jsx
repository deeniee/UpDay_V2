import React from 'react';
import BgElement1 from '../../assets/images/pic_bg1.svg';
import BgElement2 from '../../assets/images/pic_bg2.svg';
import BgElement3 from '../../assets/images/pic_bg3.svg';
import BgElement4 from '../../assets/images/pic_bg4.svg';
import BgElement5 from '../../assets/images/pic_bg5.svg';
import BgElement6 from '../../assets/images/pic_bg6.svg';
import BgElement7 from '../../assets/images/pic_bg7.svg';
import BgElement8 from '../../assets/images/pic_bg8.svg';

export default function UserInfoIllustBg() {
    return (
        <div className='absolute w-full h-full -z-10 '>
            <div className='absolute left-[12%] top-[10%] md:left-[0%] md:top-[15%] flex items-end'>
                <img
                    src={BgElement7}
                    alt='reddotsflower'
                    className='h-7 md:h-14'
                />
                <img
                    src={BgElement2}
                    alt='pinkrock2'
                    className='h-6 md:h-12 mb-2.5'
                />
                <img
                    src={BgElement4}
                    alt='pinkflower'
                    className='h-8 md:h-16 -ml-8'
                />
            </div>

            <div className='absolute right-[4%] top-[0%] md:right-[0%] flex items-end'>
                <img
                    src={BgElement4}
                    alt='pinkflower'
                    className='h-6 md:h-12 mb-1.5'
                />
                <img
                    src={BgElement5}
                    alt='blueflower'
                    className='h-10 md:h-20'
                />
                <img
                    src={BgElement6}
                    alt='triangleflower'
                    className='h-8 md:h-16 ml-8'
                />
            </div>
            <div className='absolute right-[0%] bottom-[16%] md:bottom-[0%] flex items-end'>
                <img
                    src={BgElement6}
                    alt='triangleflower'
                    className='h-7 md:h-14 m-1'
                />
                <img
                    src={BgElement1}
                    alt='pinkrock1'
                    className='h-8 md:h-16 -mr-8 pb-1'
                />
                <img
                    src={BgElement3}
                    alt='purplerock'
                    className='h-6 md:h-12'
                />
            </div>
        </div>
    );
}
