import React from 'react';
import MainFlower from '../images/main_logo.svg';

const UserInfo = ({ userName, challengeDays }) => {
    return (
        <div className='relative w-full h-full md:h-[232px] md:w-[48%] border flex gap-4 md:justify-between'>
            <div className='w-full h-full md:mt-12 text-left flex flex-col justify-center gap-0'>
                <div className='text-base md:text-lg font-medium space-x-1 pl-16'>
                    <span className='text-xl md:text-2xl font-bold'>
                        {userName ? `${userName}` : '게스트'}
                    </span>
                    <span className='text-lg md:text-xl'>님, 안녕하세요!</span>
                </div>
                <div className='flex items-end -mt-2 text-neutral-700 text-lg md:text-xl top-28'>
                    <img
                        alt='logo'
                        src='/upday_logo_color.svg'
                        className='h-[54px] object-contain'
                    />

                    {userName ? (
                        <div className='w-full md:h-full flex items-end pl-2 whitespace-nowrap'>
                            와
                            <span className='font-semibold text-blue-500 pl-2'>
                                {challengeDays}
                            </span>
                            일 째 도전 중입니다.
                        </div>
                    ) : (
                        <div className='w-full md:h-full flex gap-2 items-end pl-2 whitespace-nowrap'>
                            와 챌린지를 시작해 볼까요?
                        </div>
                    )}
                </div>
            </div>
            {/* <img
                src={MainFlower}
                alt='웹 메인 로고'
                className='absolute w-auto h-full md:w-[96%] top-0 right-0 -z-10'
            /> */}
        </div>
    );
};

export default UserInfo;
