import React from 'react';

import BgElement1 from '../../assets/images/pic_bg1.svg';
import BgElement2 from '../../assets/images/pic_bg2.svg';
import BgElement3 from '../../assets/images/pic_bg3.svg';
import BgElement4 from '../../assets/images/pic_bg4.svg';
import BgElement5 from '../../assets/images/pic_bg5.svg';
import BgElement6 from '../../assets/images/pic_bg6.svg';
import BgElement7 from '../../assets/images/pic_bg7.svg';

const LoginLayout = ({ children, title }) => {
    return (
        <div className='relative defalut-size flex-col card h-[79vh] mt-[2vh] md:w-[48%] md:p-6'>
            <div className='title flex justify-center items-center h-[10%]'>
                <p className='z-10 text-main-600'>{title}</p>
                <div className='absolute left-[6%] bottom-[6%] flex gap-2'>
                    <img
                        src={BgElement6}
                        alt='triangleflower'
                        className='h-14 md:h-16 mr-8'
                    />
                    <img
                        src={BgElement5}
                        alt='blueflower'
                        className='h-16 md:h-[72px] mt-4 z-10'
                    />
                    <img
                        src={BgElement7}
                        alt='reddotsflower'
                        className='h-10 md:h-12 -mt-4'
                    />
                    <img
                        src={BgElement1}
                        alt='pinkrock1'
                        className='absolute left-8 md:left-6 bottom-2 md:bottom-4 h-10 md:h-12'
                    />
                </div>
                <div className='absolute right-[12%] bottom-[6%] flex gap-4'>
                    <img
                        src={BgElement5}
                        alt='blueflower'
                        className='h-10 md:h-12 mt-4 mr-4'
                    />
                    <img
                        src={BgElement4}
                        alt='pinkflower'
                        className='h-16 md:h-[72px] mb-4'
                    />
                    <img
                        src={BgElement7}
                        alt='reddotsflower'
                        className='h-10 md:h-12 -mt-4'
                    />
                </div>
                <div className='absolute right-[4%] bottom-[6%] flex'>
                    <img
                        src={BgElement3}
                        alt='purplerock'
                        className='h-6 md:h-8 mt-4 -mr-6 z-10 -scale-x-100'
                    />
                    <img
                        src={BgElement2}
                        alt='pinkrock2'
                        className='h-8 md:h-10 -scale-x-100'
                    />
                </div>
            </div>
            <div className='w-full h-[90%] z-20'>{children}</div>
        </div>
    );
};

export default LoginLayout;
