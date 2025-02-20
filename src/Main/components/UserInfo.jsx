import React from 'react';
import MainDay from '../images/mainday.svg';

const UserInfo = ({ userName, challengeDays }) => {
    return (
        <div className='w-full h-px] md:h-[120px] mt-24 md:mt-16 text-left flex flex-col justify-center gap-0'>
            <div className='text-base md:text-lg font-medium space-x-1 pl-16'>
                <span className='text-2xl md:text-3xl font-bold'>
                    {userName ? `${userName}` : '게스트'}
                </span>
                <span className='text-[22px] md:text-[28px]'>
                    님, 안녕하세요!
                </span>
            </div>
            <div className='flex flex-1 items-end -mt-2 text-neutral-700 text-sm md:text-lg top-28'>
                <img
                    alt='logo'
                    src='/upday_logo_color.svg'
                    className='h-[54px] object-contain'
                />

                {userName ? (
                    <div className='w-full md:h-full flex items-end text-lg md:text-xl pl-2 whitespace-nowrap'>
                        와
                        <span className='font-semibold text-blue-500 pl-2'>
                            {challengeDays}
                        </span>
                        일 째 도전 중입니다.
                    </div>
                ) : (
                    <div className='w-full md:h-full flex gap-2 items-end text-base md:text-lg pl-2 whitespace-nowrap'>
                        와 챌린지를 시작해 볼까요?
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
