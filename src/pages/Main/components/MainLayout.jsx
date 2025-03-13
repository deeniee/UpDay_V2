import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import PopularChallenges from './PopularChallenges';
import OngoingChallenges from './OngoingChallenges';
import ChallengeCategory from './ChallengeCategory';
import UserInfo from './UserInfo';
import { getCurrentUserData } from '../../../utils/localStorage';
import { calcActiveDays } from '../../../utils/calcDate';

const MainLayout = () => {
    const currentUser = useMemo(() => getCurrentUserData(), []); // 🔹 useMemo를 사용해 불필요한 re-render 방지
    const isLoggedIn = !!currentUser; // `currentUser`가 있으면 true, 없으면 false
    const userName = currentUser?.nickname || '게스트';
    const challengeDays = currentUser ? calcActiveDays(currentUser) : 0;

    return (
        <div className='default-size flex-col'>
            <Helmet>
                <title>홈 - UpDay</title>
            </Helmet>

            <section className='relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6'>
                <UserInfo
                    userName={userName}
                    challengeDays={challengeDays}
                    isLoggedIn={isLoggedIn}
                />
                <OngoingChallenges
                    userName={userName}
                    isLoggedIn={isLoggedIn}
                />
                <PopularChallenges />
                <ChallengeCategory />
            </section>
        </div>
    );
};

export default MainLayout;
