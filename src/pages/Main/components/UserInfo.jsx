import React from 'react';
import UserInfoIllustBg from './UserInfoIllustBg';

const UserInfo = ({ userName, challengeDays, isLoggedIn }) => {
    return (
        <div className='relative w-full h-[120px] md:h-[42vh] md:min-h-[320px] md:max-h-[540px] flex gap-4 md:justify-between'>
            <div className='w-full h-full text-left flex flex-col justify-end md:justify-center gap-2'>
                <div className='space-x-1'>
                    <span className='text-xl md:text-2xl font-bold'>
                        {userName}
                    </span>
                    <span className='text-base md:text-lg'>
                        {userName ? `님, 안녕하세요!` : '님, 반가워요!'}
                    </span>
                </div>
                <div className='flex items-center text-base md:text-lg text-neutral-700 dark:text-neutral-300'>
                    <img
                        alt='logo'
                        src='/upday_logo_round.svg'
                        className='h-6 md:h-8 object-contain'
                    />

                    {isLoggedIn ? (
                        <div className='w-full md:h-full flex items-end pl-1 whitespace-nowrap'>
                            와
                            <span className='font-semibold text-point-500 dark:text-point-400 pl-2'>
                                {challengeDays}
                            </span>
                            일 째 도전 중입니다.
                        </div>
                    ) : (
                        <div className='w-full md:h-full flex gap-2 items-end pl-1 whitespace-nowrap'>
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
