import React, { useState } from 'react';
import MainChallenge from './MainChallenge';
import { useNavigate } from 'react-router-dom';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { HiFire } from 'react-icons/hi2';
import { FaSquareCheck, FaPenToSquare } from 'react-icons/fa6';

const OngoingChallenges = ({ userChallengeData, isLoggedIn }) => {
    const navigate = useNavigate();
    const [startIndex, setStartIndex] = useState(0);
    const challengesPerPage = 4;

    const calculateDaysPassed = (joinDate) => {
        const start = new Date(joinDate);
        const today = new Date();
        const diffTime = Math.abs(today - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredChallenges = userChallengeData
        .filter(
            (challenge) =>
                challenge.clgJoin === true && challenge.clgDoing === true
        )
        .sort((a, b) => {
            const daysA = calculateDaysPassed(a.joinDate);
            const daysB = calculateDaysPassed(b.joinDate);
            return daysA - daysB; // 숫자가 작은 순서대로 정렬
        });

    const handleLeftClick = () => {
        setStartIndex((prev) =>
            prev - challengesPerPage < 0 ? 0 : prev - challengesPerPage
        );
    };

    const handleRightClick = () => {
        setStartIndex((prev) =>
            prev + challengesPerPage >= filteredChallenges.length
                ? prev
                : prev + challengesPerPage
        );
    };

    return (
        <div>
            <div className='w-full flex justify-between items-center p-4 rounded-t-3xl text-neutral-100 bg-neutral-800'>
                <h2 className='font-bold text-lg md:text-xl'>
                    도전 중인 챌린지
                </h2>
                <div className='flex gap-3'>
                    <IoIosArrowDropleftCircle
                        direction='left'
                        onClick={handleLeftClick}
                        className='text-3xl md:text-4xl'
                    />
                    <IoIosArrowDroprightCircle
                        direction='right'
                        onClick={handleRightClick}
                        className='text-3xl md:text-4xl'
                    />
                </div>
            </div>
            {isLoggedIn ? (
                filteredChallenges.length > 0 ? (
                    <>
                        <ul className='w-full grid gird-flow-col grid-rows-3 bg-neutral-100 rounded-b-3xl'>
                            {[...Array(3)].map((_, index) => {
                                const challenge =
                                    filteredChallenges[startIndex + index];
                                return (
                                    <li
                                        key={index}
                                        className={`w-full h-24 border-b border-neutral-500 flex p-2 ${index === 3 - 1 ? 'border-none' : ''}`}
                                    >
                                        {challenge ? (
                                            <div className='flex w-full h-full'>
                                                <div className='w-[80%] h-full flex flex-col justify-evenly items-start'>
                                                    <div className='flex items-end gap-1 text-xs md:text-sm text-neutral-700 whitespace-nowrap'>
                                                        <HiFire className='text-lg text-orange-400' />
                                                        <span>도전</span>
                                                        <span>
                                                            {calculateDaysPassed(
                                                                challenge.joinDate
                                                            )}
                                                            일 째
                                                        </span>
                                                    </div>
                                                    <span className='text-lg font-semibold text-gray-700 truncate w-[80%]'>
                                                        {challenge.title}
                                                    </span>
                                                </div>
                                                <div className='w-[20%] h-full flex justify-end items-center gap-4 text-2xl'>
                                                    <FaSquareCheck />
                                                    <FaPenToSquare />
                                                </div>
                                            </div>
                                        ) : null}
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                ) : (
                    <div className='text-center text-gray-500 py-6 font-semibold md:min-h-[250px] md:bg-neutral-100 md:rounded-b-3xl bg-neutral-100 rounded-xl'>
                        진행 중인 챌린지가 없습니다.
                    </div>
                )
            ) : (
                <div className='w-full h-[100px] md:h-[240px] card md:rounded-t-none flex md:flex-col items-center justify-between p-5 md:p-6 md:pt-20'>
                    <h2 className='text-sm md:text-base font-semibold text-neutral-700 ml-[3%]'>
                        로그인이 필요한 기능입니다.
                    </h2>
                    <button
                        onClick={() => navigate('/login')}
                        className='btn btn-key px-4 py-2 text-sm md:text-base '
                    >
                        로그인하러 가기
                    </button>
                </div>
            )}
        </div>
    );
};

export default OngoingChallenges;
