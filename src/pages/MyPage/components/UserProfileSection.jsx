import React, { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import img1 from '../../../assets/images/icons/pic_etc.svg';
import img2 from '../../../assets/images/icons/pic_habit.svg';
import img3 from '../../../assets/images/icons/pic_health.svg';
import img4 from '../../../assets/images/icons/pic_study.svg';
import UserReport from './UserReport';

const UserProfile = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [daysSinceSignup, setDaysSinceSignup] = useState(0);
    const defaultImgs = [img1, img2, img3, img4];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoggedInUser = () => {
            const loggedInUserId = localStorage.getItem('loggedInUser');
            const usersData = localStorage.getItem('users');

            if (!loggedInUserId) {
                navigate('/login');
                return;
            }

            if (usersData) {
                try {
                    const users = JSON.parse(usersData);
                    const foundUser = users.find(
                        (user) => user.userId === loggedInUserId
                    );

                    if (foundUser) {
                        setLoggedInUser(foundUser);
                        const signupDate = new Date(foundUser.signupDate);
                        const today = new Date();
                        const days = differenceInDays(today, signupDate);
                        setDaysSinceSignup(days + 1);
                    }
                } catch (error) {
                    console.error('로컬 스토리지 데이터 파싱 오류:', error);
                }
            }
        };

        fetchLoggedInUser();
    }, [navigate]);

    if (!loggedInUser) {
        return null;
    }

    return (
        <section className='flex flex-col gap-2 w-full md:w-[48%]'>
            <h1 className='title'>내 프로필</h1>
            <div className='card flex flex-col gap-3 md:gap-4 p-3 md:p-4'>
                <div className='flex flex-row items-center'>
                    <div className='w-[25%] md:w-[30%] rounded-full ring-1 ring-neutral-400 aspect-square shrink-0 bg-neutral-100 overflow-hidden'>
                        {loggedInUser.userImg ? (
                            <img
                                alt='프로필 이미지'
                                src={loggedInUser.userImg}
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <img
                                alt='기본 프로필 이미지'
                                src={
                                    defaultImgs[
                                        Math.floor(
                                            Math.random() * defaultImgs.length
                                        )
                                    ]
                                }
                                className='w-full h-full object-cover'
                            />
                        )}
                    </div>
                    <div className='ml-3 flex flex-col gap-3 items-center'>
                        <div className='w-full h-full flex justify-start gap-3 md:gap-4 md:flex-col'>
                            <div className='flex flex-col gap-1 md:gap-2'>
                                <p className='title'>
                                    {loggedInUser.nickname || '닉네임 없음'}
                                </p>
                                <p className='main-text text-neutral-500 dark:text-neutral-400'>
                                    {loggedInUser.userId || '이메일 없음'}
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 md:gap-3'>
                                <p className='main-text font-semibold'>
                                    <span className='text-point-500 dark:text-point-400'>
                                        {daysSinceSignup}
                                    </span>
                                    일 째 업데이 중
                                </p>
                                <p className='main-text text-neutral-500 dark:text-neutral-400'>
                                    {loggedInUser?.signupDate
                                        ? `${new Date(
                                              loggedInUser.signupDate
                                          ).toLocaleDateString('ko-KR', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })} 가입`
                                        : '가입일 정보 없음'}
                                </p>
                            </div>
                        </div>
                        <p className='md:hidden max-h-12 sub-text line-clamp-4'>
                            {loggedInUser.userIntroduction ||
                                '아직 소개글을 작성하지 않았습니다. 프로필을 업데이트해보세요!'}
                        </p>
                    </div>
                </div>
                <p className='hidden md:block md:h-16 sub-text line-clamp-4'>
                    {loggedInUser.userIntroduction ||
                        '아직 소개글을 작성하지 않았습니다. 프로필을 업데이트해보세요!'}
                </p>
                <UserReport />
            </div>
        </section>
    );
};

export default UserProfile;
