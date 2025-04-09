import React from 'react';

import Pic4 from '../../../assets/images/backgrounds/pic_4.svg';
import BgElement1 from '../../../assets/images/backgrounds/pic_bg1.svg';
import BgElement2 from '../../../assets/images/backgrounds/pic_bg2.svg';
import BgElement4 from '../../../assets/images/backgrounds/pic_bg4.svg';
import BgElement5 from '../../../assets/images/backgrounds/pic_bg5.svg';
import BgElement6 from '../../../assets/images/backgrounds/pic_bg6.svg';
import BgElement7 from '../../../assets/images/backgrounds/pic_bg7.svg';
import BgElement8 from '../../../assets/images/backgrounds/pic_bg8.svg';

const LoginLayout = ({ children, title }) => {
    return (
        <div className='relative default-size flex-col card min-h-[640px] h-[86vh] md:h-[79vh] md:min-h-[606px] md:w-[48%] mt-[2vh] p-8 md:p-6'>
            <div className='title flex justify-center items-center h-[10%]'>
                <p className='z-10 h-full flex items-center text-main-600 dark:text-main-200'>
                    {title}
                </p>
                <img
                    src={Pic4}
                    alt='bg_illust4'
                    className='absolute left-[6%] bottom-[6%] h-24 mr-8'
                />
                <div className='absolute right-[6%] bottom-[6%] flex'>
                    <img
                        src={BgElement6}
                        alt='triangleflower'
                        className='h-12 mt-2 -mr-12 z-10'
                    />
                    <img
                        src={BgElement2}
                        alt='pinkrock2'
                        className='h-6 mr-2 mt-6'
                    />
                    <img
                        src={BgElement5}
                        alt='blueflower'
                        className='h-8 -mt-4 ml-2 -mr-6'
                    />
                    <img
                        src={BgElement7}
                        alt='reddotsflower'
                        className='h-10 mt-10 z-10'
                    />
                    <img
                        src={BgElement4}
                        alt='pinkflower'
                        className='h-12 z-10 mt-8 -mr-4'
                    />
                    <img
                        src={BgElement1}
                        alt='pinkrock1'
                        className='absolute right-4 bottom-1 h-7 '
                    />
                    <img src={BgElement8} alt='cat' className='h-6 ml-8' />
                </div>
            </div>
            <div className='w-full h-[90%] z-20'>{children}</div>
        </div>
    );
};

export default LoginLayout;
