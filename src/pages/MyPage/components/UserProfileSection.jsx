import React, { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import img1 from '../img/1.svg';
import img2 from '../img/2.svg';
import img3 from '../img/3.svg';
import img4 from '../img/4.svg';
import UserReport from './UserReportSection';

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
        <div className='flex flex-col gap-2 md:h-[vh] md:min-h-[px]'>
            <h1 className='title'>내 프로필</h1>
            <div className='card h-full md:min-h-[px] flex flex-col gap-3 md:gap-4 p-4 md:p-6'>
                <div className='flex flex-row items-center'>
                    <div className='inline-block w-[35%] max-w-[122px] md:w-[60%] md:max-w-[180px] aspect-square mr-[5%] md:br-[10%]'>
                        {loggedInUser.userImg ? (
                            <img
                                alt='프로필 이미지'
                                src={loggedInUser.userImg}
                                className='w-full h-full object-cover rounded-full ring-1 ring-neutral-400 overflow-hidden'
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
                                className='w-full h-full object-cover rounded-full ring-1 ring-neutral-400 overflow-hidden'
                            />
                        )}
                    </div>
                    <div className='w-full h-full flex flex-col items-start gap-4 md:gap-6'>
                        <div className='flex gap-8 md:gap-4 md:flex-col md:h-28'>
                            <div className='flex flex-col gap-1 md:gap-2'>
                                <p className='title'>
                                    {loggedInUser.nickname || '닉네임 없음'}
                                </p>
                                <p className='main-text text-neutral-500'>
                                    {loggedInUser.userId || '이메일 없음'}
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 md:gap-3'>
                                <p className='main-text font-semibold'>
                                    <span className='text-point-500'>
                                        {daysSinceSignup}
                                    </span>
                                    일 째 업데이 중
                                </p>
                                <p className='main-text text-neutral-500'>
                                    {loggedInUser.signupDate ||
                                        '가입일 정보 없음'}
                                </p>
                            </div>
                        </div>
                        <p className='h-12 md:h-16 sub-text line-clamp-4'>
                            {loggedInUser.userIntroduction ||
                                '아직 소개글을 작성하지 않았습니다. 프로필을 업데이트해보세요!'}
                        </p>
                    </div>
                </div>
                <UserReport />
            </div>
        </div>
    );
};

export default UserProfile;
