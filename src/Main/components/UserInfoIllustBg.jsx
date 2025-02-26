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
        <div className='absolute w-full h-full '>
            <div className='absolute left-[12%] top-[10%] flex items-end'>
                <img
                    src={BgElement7}
                    alt='reddotsflower'
                    className='h-[2.5rem] md:[3.5rem]'
                />
                <img
                    src={BgElement2}
                    alt='pinkrock2'
                    className='h-[2rem] md:[3rem] mb-[10px]'
                />
                <img
                    src={BgElement4}
                    alt='pinkflower'
                    className='h-[3.5rem] md:[4.5rem] -ml-[30px]'
                />
            </div>

            <div className='absolute right-[4%] top-[0%] flex items-end'>
                <img
                    src={BgElement4}
                    alt='pinkflower'
                    className='h-[2rem] md:[3rem] mb-[6px]'
                />
                <img
                    src={BgElement5}
                    alt='blueflower'
                    className='h-[4rem] md:[5rem]'
                />
                <img
                    src={BgElement6}
                    alt='triangleflower'
                    className='h-[3rem] md:[4rem] ml-[2rem]'
                />
            </div>
            <div className='absolute right-[0%] bottom-[4%] flex items-end'>
                <img
                    src={BgElement6}
                    alt='triangleflower'
                    className='h-[3.5rem] md:[4.5rem] m-[0.25rem]'
                />
                <img
                    src={BgElement1}
                    alt='pinkrock1'
                    className='h-[3rem] md:[4rem] -mr-8 pb-1'
                />
                <img
                    src={BgElement3}
                    alt='purplerock'
                    className='h-[2rem] md:[3rem]'
                />
            </div>
            {/* <img
                src={BgElement8}
                alt='cat'
                className='absolute right-[15%] top-[10%] h-[2.5rem] md:[3.5rem]'
            /> */}
        </div>
    );
}
