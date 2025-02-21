import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChallengeIcon from '../images/challenge-2.svg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const PopularChallenges = ({ challenges }) => {
    const [currentChallenges, setCurrentChallenges] = useState([]);
    const [challengeIndex, setChallengeIndex] = useState(0);
    const allClgList = useSelector((state) => state.myClgList.list) || [];
    const [highlightIndex, setHighlightIndex] = useState(0);

    useEffect(() => {
        if (allClgList && allClgList.length > 0) {
            const sortedChallenges = [...allClgList].sort(
                (a, b) => b.postClicked - a.postClicked
            );
            setCurrentChallenges(sortedChallenges.slice(0, 5));
        }
    }, [challenges]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightIndex((prev) => (prev + 1) % 5); // 0~4 순환
        }, 2000); // 2초마다 변경

        return () => clearInterval(interval);
    }, []);

    const handlePrevChallenge = () => {
        setChallengeIndex(
            (prevIndex) =>
                (prevIndex - 1 + currentChallenges.length) %
                currentChallenges.length
        );
    };

    const handleNextChallenge = () => {
        setChallengeIndex(
            (prevIndex) => (prevIndex + 1) % currentChallenges.length
        );
    };
    // 챌린지 카테고리별 뱃지 클래스
    const badgeClasses = {
        식단: 'budge-meal',
        학습: 'budge-study',
        운동: 'budge-sport',
        습관: 'budge-habit',
    };
    const getBadgeClass = (category) => badgeClasses[category] || '';

    if (currentChallenges.length < 3) return null;

    return (
        <div className='relative w-full md:w-[48%] flex flex-col space-y-2'>
            <div className='relative'>
                <img
                    src={ChallengeIcon}
                    alt='챌린지 아이콘'
                    className='w-[120px] md:w-[140px]'
                />
                <h2 className='absolute top-1.5 left-5 md:left-6 z-20 title text-neutral-100'>
                    인기 있는 챌린지
                </h2>
            </div>

            <ul className='w-full flex flex-col gap-2 justify-center'>
                {[0, 1, 2, 3, 4].map((offset) => {
                    const index = offset; // 1~5번 위치 고정
                    const challenge = currentChallenges[index];
                    const isHighlighted = highlightIndex === offset;

                    return (
                        <li
                            key={index}
                            className={`card w-full px-4 py-2 flex items-center justify-between transition-all duration-500 ease-in-out
                                ${isHighlighted ? 'opacity-100 scale-100' : 'opacity-50 scale-95'} ${offset !== 0 ? 'flex' : ''}`}
                        >
                            <div className='flex justify-start w-full items-center gap-2 overflow-hidden'>
                                <span className='w-4 main-text'>
                                    {index + 1}.
                                </span>
                                <div
                                    className={`${getBadgeClass(challenge.category)}`}
                                >
                                    {challenge.category}
                                </div>
                                <span className='main-text overflow-hidden text-ellipsis whitespace-nowrap'>
                                    {challenge.title}
                                </span>
                            </div>
                            <div className='sub-text flex items-end gap-2 text-neutral-700 whitespace-nowrap ml-2'>
                                <div className='flex gap-0.5'>
                                    조회
                                    <span className='font-semibold ml-1'>
                                        {challenge.postClicked}
                                    </span>
                                </div>
                                <div className='flex gap-0.5'>
                                    참여
                                    <span className='font-semibold ml-1'>
                                        {challenge.postClicked}
                                    </span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PopularChallenges;
