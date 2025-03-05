import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCategoryIcon } from '../../utils/categoryList';

const PopularChallenges = ({ challenges }) => {
    const [currentChallenges, setCurrentChallenges] = useState([]);
    const [challengeIndex, setChallengeIndex] = useState(0);
    const allClgList = useSelector((state) => state.challenge.list) || [];
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

    if (currentChallenges.length < 3) return null;

    return (
        <div className='relative w-full flex flex-col space-y-2'>
            <h2 className='title pl-3 md:pl-0'>인기 있는 챌린지</h2>

            <ul className='w-full h-full flex flex-col gap-2'>
                {[0, 1, 2, 3, 4].map((offset) => {
                    const index = offset; // 1~5번 위치 고정
                    const challenge = currentChallenges[index];
                    const isHighlighted = highlightIndex === offset;

                    return (
                        <li
                            key={index}
                            className={`card w-full h-10 md:h-[5.4vh] md:min-h-[37px] md:max-h-[69px] px-4 py-2 flex items-center justify-between transition duration-500 ease-in-out
                                ${isHighlighted ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}
                        >
                            <div className='flex justify-start w-full items-center gap-2 overflow-hidden'>
                                <span className='w-[4%] main-text'>
                                    {index + 1}.
                                </span>
                                <div className='flex items-center gap-1'>
                                    <div className='w-4 md:w-6 h-4 md:h-6'>
                                        <img
                                            alt={challenge.category}
                                            src={getCategoryIcon(
                                                challenge.category
                                            )}
                                        />
                                    </div>
                                    <span className='main-text badge'>
                                        {challenge.category}
                                    </span>
                                </div>
                                <span className='main-text flex-grow overflow-hidden text-ellipsis whitespace-nowrap'>
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
