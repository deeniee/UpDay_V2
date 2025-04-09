import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiFire, HiDocumentCheck, HiMiniTrophy } from 'react-icons/hi2';
import { FaStar } from 'react-icons/fa6';
import { getJoinedChallenge } from '../../../store/features/userChallengeSlice';

export default function UserReport() {
    const dispatch = useDispatch();
    const TEST_ACCOUNT_EMAIL = 'daymaker@naver.com'; // 테스트 계정 이메일 고정
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isTestAccount, setIsTestAccount] = useState(false);
    const joinedChallenges =
        useSelector((state) => state.challenge.joinedChallenges) || [];

    useEffect(() => {
        dispatch(getJoinedChallenge());
    }, [dispatch]);

    // 테스트 계정 여부 확인
    useEffect(() => {
        if (users.length > 0 && loggedInUser) {
            setIsTestAccount(loggedInUser === TEST_ACCOUNT_EMAIL);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser]);

    // localStorage 값 가져올 때 예외 처리
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('loggedInUser') || ''; // 문자열 그대로 사용
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            setLoggedInUser(storedUser);
            setUsers(storedUsers);
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
            setLoggedInUser('');
            setUsers([]);
        }
    }, []);

    // 내가 참여한 챌린지 상태 값
    const numClgDoing = joinedChallenges.filter((clg) => clg.clgDoing).length;
    const numClgDone = joinedChallenges.filter((clg) => clg.clgDone).length;
    const numClgOver = joinedChallenges.filter(
        (clg) => !clg.clgDoing && !clg.clgDone
    ).length;

    const achievementRate =
        numClgDone + numClgOver > 0
            ? Math.round((numClgDone / (numClgDone + numClgOver)) * 100)
            : 0;

    // 테스트 계정이 아닐 경우
    // if (!isTestAccount) {
    //     return (
    //         <div className='flex flex-col'>
    //             <div className='flex flex-row gap-2 p-4 w-full h-full justify-evenly items-center'>
    //                 <div className='flex flex-col justilfy-center items-center gap-3 w-[30%]'>
    //                     <p className='main-text font-semibold'>진행 중</p>
    //                     <HiFire className='text-3xl md:text-4xl text-main-600' />
    //                 </div>
    //                 <div className='flex flex-col justilfy-center items-center gap-3 w-[30%]'>
    //                     <p className='main-text font-semibold'>완료</p>
    //                     <HiDocumentCheck className='text-3xl md:text-4xl text-main-600' />
    //                 </div>
    //                 <div className='flex flex-col justilfy-center items-center gap-3 w-[30%]'>
    //                     <p className='main-text font-semibold'>목표 달성율</p>
    //                     <div className='relative flex justify-center'>
    //                         <HiMiniTrophy className='text-3xl md:text-4xl text-main-600' />
    //                         <FaStar className='absolute text-neutral-100 text-[8px] top-1 md:text-[11px] md:top-1' />
    //                     </div>
    //                 </div>
    //             </div>
    //             <p className='w-full main-text text-center text-gray-500 whitespace-nowrap'>
    //                 테스트 계정이 아닌 경우, 해당 기능은 제한됩니다.
    //             </p>
    //         </div>
    //     );
    // }

    return (
        <div className='flex flex-row p-3 md:p-0 w-full h-full md:h-32 justify-evenly items-center'>
            <div className='flex flex-col justilfy-center items-center gap-3 w-[30%]'>
                <p className='main-text font-semibold'>진행 중</p>
                <HiFire className='text-3xl md:text-4xl text-point-600 dark:text-point-500' />
                <p className='main-text font-semibold'>{numClgDoing}</p>
            </div>
            <div className='flex flex-col justilfy-center items-center gap-3 w-[30%]'>
                <p className='main-text font-semibold'>완료</p>
                <HiDocumentCheck className='text-3xl md:text-4xl text-point-600 dark:text-point-500' />
                <p className='main-text font-semibold'>{numClgDone}</p>
            </div>
            <div className='flex flex-col justilfy-center items-center gap-3 w-[30%]'>
                <p className='main-text font-semibold'>목표 달성율</p>
                <div className='relative flex justify-center'>
                    <HiMiniTrophy className='text-3xl md:text-4xl text-point-600 dark:text-point-500' />
                    <FaStar className='absolute text-neutral-100 text-[8px] top-1 md:text-[11px] md:top-1 dark:text-neutral-800' />
                </div>
                <p className='main-text font-semibold'>{achievementRate}%</p>
            </div>
        </div>
    );
}
