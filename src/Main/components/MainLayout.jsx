import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import PopularChallenges from './PopularChallenges';
import OngoingChallenges from './OngoingChallenges';
import ChallengeCategory from './ChallengeCategory';
import UserInfo from './UserInfo';
import { userChallengeList } from '../../data/userChallengeData';

const MainLayout = () => {
    const [userName, setUserName] = useState('');
    const [challengeDays, setChallengeDays] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUserEmail = localStorage.getItem('loggedInUser');
        const usersData = localStorage.getItem('users');

        if (usersData && loggedInUserEmail) {
            try {
                const users = JSON.parse(usersData);
                const foundUser = users.find(
                    (user) => user.email === loggedInUserEmail
                );

                if (foundUser) {
                    setUserName(foundUser.nickname || '데이메이커');
                    if (foundUser.signupDate) {
                        const signUpDate = new Date(foundUser.signupDate);
                        const today = new Date();
                        const diffDays = Math.floor(
                            (today - signUpDate) / (1000 * 60 * 60 * 24)
                        );
                        setChallengeDays(diffDays + 1);
                    }
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('로컬 스토리지 데이터 파싱 오류:', error);
            }
        }
    }, []);

    const filteredChallenges = useMemo(() => {
        const loggedInUserEmail = localStorage.getItem('loggedInUser') || '';
        if (!isLoggedIn || loggedInUserEmail !== 'test01@naver.com') {
            return [];
        }
        return userChallengeList.filter((challenge) => challenge.clgDoing);
    }, [isLoggedIn]);

    const sortedChallenges = useMemo(() => {
        return Array.isArray(userChallengeList)
            ? [...userChallengeList]
                  .sort((a, b) => b.postClicked - a.postClicked)
                  .slice(0, 5)
            : [];
    }, []);

    return (
        <>
            <Helmet>
                <title>홈 - UpDay</title>
            </Helmet>
            <div className='w-[90%] md:w-[80%] md:max-w-[1344px] mx-auto md:mt-4 flex flex-col gap-6 md:block md:space-y-6'>
                {/* 유저 콘텐츠 */}
                <section className='relative w-full h-auto flex flex-col md:flex-row gap-6 md:gap-[4%]'>
                    <UserInfo
                        userName={userName}
                        challengeDays={challengeDays}
                    />
                    <OngoingChallenges isLoggedIn={isLoggedIn} />
                </section>

                <section className='relative w-full h-auto flex flex-col md:flex-row gap-6 md:gap-[4%]'>
                    <PopularChallenges challenges={sortedChallenges} />
                    <ChallengeCategory />
                </section>
            </div>
        </>
    );
};

export default MainLayout;
