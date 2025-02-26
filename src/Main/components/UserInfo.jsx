import React from 'react';
import UserInfoIllustBg from './UserInfoIllustBg';

const UserInfo = ({ userName, challengeDays }) => {
    return (
        <div className='relative w-full h-[160px] md:w-[48vw] md:h-[42vh] md:min-h-[320px] flex gap-4 md:justify-between'>
            <div className='w-full h-full text-left flex flex-col justify-end gap-2'>
                <div className='text-base md:text-lg font-medium space-x-1'>
                    <span className='text-lg md:text-xl font-bold'>
                        {userName ? `${userName}` : '게스트'}
                    </span>
                    <span className='text-sm md:text-base'>
                        {userName ? `님, 안녕하세요!` : '님, 반가워요!'}
                    </span>
                </div>
                <div className='flex items-center text-neutral-700 text-sm md:text-base'>
                    <img
                        alt='logo'
                        src='/upday_logo_illust.svg'
                        className='h-[1.5rem] md:h-[2rem] object-contain'
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
            <UserInfoIllustBg />
        </div>
    );
};

export default UserInfo;
