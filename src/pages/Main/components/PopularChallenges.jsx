import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategoryIcon } from '../../../utils/categoryList';
import { getChallenges } from '../../../utils/localStorage';
import { setSelectedChallenge } from '../../../store/features/challengeSlice';
import { FaMousePointer } from 'react-icons/fa';
import { IoBookmarks, IoHeart } from 'react-icons/io5';

const PopularChallenges = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentChallenges, setCurrentChallenges] = useState([]);
    const [allClgList, setAllClgList] = useState(getChallenges());
    const [highlightIndex, setHighlightIndex] = useState(0);
    const allClgListRef = useRef(allClgList);

    useEffect(() => {
        const handleStorageChange = () => {
            const newClgList = getChallenges();
            if (
                JSON.stringify(newClgList) !==
                JSON.stringify(allClgListRef.current)
            ) {
                setAllClgList(newClgList);
                allClgListRef.current = newClgList;
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const sortedChallenges = useMemo(() => {
        if (allClgList && allClgList.length > 0) {
            return [...allClgList].sort(
                (a, b) =>
                    b.postClicked +
                    b.likesCount +
                    b.scrapCount -
                    (a.postClicked + a.likesCount + a.scrapCount)
            );
        }
        return [];
    }, [allClgList]);

    useEffect(() => {
        setCurrentChallenges(sortedChallenges.slice(0, 5));
    }, [sortedChallenges]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightIndex((prev) => (prev + 1) % 5);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleCardClick = (challenge) => {
        // 선택한 카드의 데이터를 Redux store에 저장
        dispatch(setSelectedChallenge(challenge));

        // 해당 카드의 상세 모달 페이지로 이동
        navigate(`/challenges/${challenge.id}`);
    };

    if (currentChallenges.length < 3) return null;

    return (
        <div className='relative w-full h-full md:min-h-[312px] md:max-h-[592px] flex flex-col gap-2'>
            <h2 className='title pl-1 md:pl-0'>인기 있는 챌린지</h2>

            <ul className='w-full h-full flex flex-col gap-3 md:gap-4'>
                {[0, 1, 2, 3, 4].map((offset) => {
                    const index = offset; // 1~5번 위치 고정
                    const challenge = currentChallenges[index];
                    const isHighlighted = highlightIndex === offset;

                    return (
                        <li
                            key={index}
                            className={`card w-full h-10 md:h-full px-4 py-2 drop-shadow-sm flex items-center justify-between
                                transition duration-500 ease-in-out ${isHighlighted ? 'scale-[102%]' : 'scale-[100%]'}`}
                            onClick={() => handleCardClick(challenge)} // 클릭 시 해당 challenge를 전달
                        >
                            <div className='flex justify-start w-full items-center gap-2 overflow-hidden'>
                                <span className='w-[4%] main-text'>
                                    {index + 1}.
                                </span>
                                <div
                                    className={`flex items-center gap-1 transition duration-500 ease-in-out
                                        transition duration-500 ease-in-out ${isHighlighted ? 'opacity-100' : 'opacity-60'}`}
                                >
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
                                <span
                                    className={`main-text flex-grow overflow-hidden text-ellipsis whitespace-nowrap  ${isHighlighted ? '' : 'font-light'}`}
                                >
                                    {challenge.title}
                                </span>
                            </div>
                            <div
                                className={`sub-text flex items-end gap-2 whitespace-nowrap transition duration-500 ease-in-out ${isHighlighted ? 'text-neutral-700 dark:text-neutral-200' : 'text-neutral-500'}`}
                            >
                                <div className='flex items-center gap-0.5'>
                                    <FaMousePointer />
                                    {challenge.postClicked}
                                </div>
                                <div className='flex items-center gap-1'>
                                    <IoBookmarks />
                                    {challenge.scrapCount}
                                </div>
                                <div className='flex items-center gap-0.5'>
                                    <IoHeart />

                                    {challenge.likesCount}
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
