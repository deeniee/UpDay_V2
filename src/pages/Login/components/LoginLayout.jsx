import React from 'react';
import updayIllust from '../images/upday_illust.svg';

const LoginLayout = ({ children, title }) => {
    return (
        <div
            className='relative default-size flex-col card min-h-[640px] h-[86vh] md:h-[79vh] md:min-h-[606px]
                        md:w-[48%] mt-[2vh] p-8 md:p-8 gap-6'
        >
            <div className='relative flex justify-center items-center'>
                <img
                    src={updayIllust}
                    alt='Upday Logo'
                    className='h-[72px] md:h-20'
                />
                <p
                    className=' md:text-lg font-bold z-10 w-[70%] flex justify-center items-center
                              absolute pl-[72px] md:pl-20 text-neutral-900'
                >
                    {title}
                </p>
            </div>
            <div className='w-full h-[90%]'>{children}</div>
        </div>
    );
};

export default LoginLayout;
