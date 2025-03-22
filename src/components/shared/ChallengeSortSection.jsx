import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BsGridFill, BsDot } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { HiFire, HiDocumentCheck } from 'react-icons/hi2';
import { FaChevronDown } from 'react-icons/fa6';
import ChallengeGridView from './ChallengeGridView';
import ChallengeListView from './ChallengeListView';

export default function ChallengeSortSection({
    challenges,
    activeCategory,
    searchResults,
}) {
    const location = useLocation();
    const [viewMode, setViewMode] = useState(1);
    const [sortOption, setSortOption] = useState('최신순');
    const [sortedResults, setSortedResults] = useState(null); // 정렬된 결과 상태 관리
    const [isMyPost, setIsMyPost] = useState('');
    const [isDoingClg, setIsDoingClg] = useState('');
    const [isDoneClg, setIsDoneClg] = useState('');
    const loggedInUser = localStorage.getItem('loggedInUser');
    const isMyChallengesPage = location.pathname.includes('/my-challenges'); // 현재 페이지가 '내 챌린지'인지 확인하는 함수

    useEffect(() => {
        // 필터링 처리
        let filteredChallenges = challenges;

        if (isMyPost) {
            filteredChallenges = filteredChallenges.filter(
                (challenge) => challenge.authorId === loggedInUser
            );
        }

        if (isDoingClg) {
            filteredChallenges = filteredChallenges.filter((challenge) =>
                challenge.participants.some(
                    (participant) =>
                        participant.userId === loggedInUser &&
                        participant.clgDoing === true &&
                        participant.clgDone === false
                )
            );
            console.log(filteredChallenges);
        }

        if (isDoneClg) {
            filteredChallenges = filteredChallenges.filter((challenge) =>
                challenge.participants.some(
                    (participant) =>
                        participant.userId === loggedInUser &&
                        participant.clgDone === true &&
                        participant.clgDoing === false
                )
            );
        }

        // 검색 결과가 있다면, 필터링된 결과에 대해 검색 결과 적용
        const challengesToSort =
            searchResults && searchResults.length > 0
                ? searchResults
                : filteredChallenges;

        // 정렬
        const sortedData = sortedChallenges(challengesToSort, sortOption);

        // 결과 업데이트
        setSortedResults(sortedData.length > 0 ? sortedData : []); // 결과가 없으면 빈 배열 설정
    }, [
        isMyPost,
        isDoingClg,
        isDoneClg,
        searchResults,
        challenges,
        sortOption,
    ]); // 모든 의존성 추가

    const sortedChallenges = (challenges, option) => {
        if (!challenges || challenges.length === 0) return [];

        switch (option) {
            case '관심순':
                return [...challenges].sort(
                    (a, b) => b.postClicked - a.postClicked
                );
            case '스크랩 많은 순':
                return [...challenges].sort(
                    (a, b) => b.scrapCount - a.scrapCount
                );
            case '좋아요 많은 순':
                return [...challenges].sort(
                    (a, b) => b.likesCount - a.likesCount
                );
            default: // 최신순
                return [...challenges].sort(
                    (a, b) => new Date(b.postDate) - new Date(a.postDate)
                );
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };
    // 내가 만든, 진행 중, 완료 챌린지 필터링
    const handleIsMyPost = () => {
        setIsMyPost((prev) => !prev); // true-false 토글
        setIsDoingClg();
        setIsDoneClg();
    };
    const handleIsDoingClg = () => {
        setIsMyPost();
        setIsDoingClg((prev) => !prev);
        setIsDoneClg();
    };
    const handleIsDoneClg = () => {
        setIsMyPost();
        setIsDoingClg();
        setIsDoneClg((prev) => !prev);
    };

    return (
        <>
            <section className='w-full flex justify-end items-center gap-3 md:gap-4 mb-3 md:mb-4'>
                <div
                    className={`w-full flex gap-2 justify-start ${isMyChallengesPage ? '' : 'hidden'}`}
                >
                    <div
                        className={`flex gap-0.5 pl-0.5 pr-2 rounded-[10px] items-center`}
                        onClick={handleIsMyPost}
                    >
                        <BsDot className='text-base text-point-400' />
                        <button
                            className={`main-text ${isMyPost ? 'font-semibold' : ''}`}
                        >
                            내가 만든
                        </button>
                    </div>
                    <div
                        className={`flex gap-1 pl-1 pr-1.5 rounded-[10px] items-center text-sm`}
                        onClick={handleIsDoingClg}
                    >
                        <HiFire className='text-sm text-pink-500' />
                        <button
                            className={`main-text ${isDoingClg ? 'font-semibold' : ''}`}
                        >
                            진행 중
                        </button>
                    </div>
                    <div
                        className={`flex gap-1 pl-1 pr-1.5 rounded-[10px] items-center text-sm`}
                        onClick={handleIsDoneClg}
                    >
                        <HiDocumentCheck className='text-sm text-blue-300' />
                        <button
                            className={`main-text ${isDoneClg ? 'font-semibold' : ''}`}
                        >
                            완료
                        </button>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <select
                        id='sort'
                        name='sort'
                        className='bg-transparent main-text font-semibold text-neutral-700 text-end col-start-1 row-start-1 appearance-none focus:outline-none'
                        value={sortOption}
                        onChange={handleSortChange}
                    >
                        <option>최신순</option>
                        <option>관심순</option>
                        <option>스크랩 많은 순</option>
                        <option>좋아요 많은 순</option>
                    </select>
                    <FaChevronDown className='text-neutral-700 size-2.5 md:size-3' />
                </div>
                <div className='flex justify-end items-center gap-1.5 md:gap-2'>
                    <button onClick={() => setViewMode(1)}>
                        <BsGridFill
                            className={`size-4 ${viewMode === 1 ? 'viewmode-onclick' : 'viewmode-default'}`}
                        />
                    </button>
                    <button onClick={() => setViewMode(2)}>
                        <FaList
                            className={`size-4 ${viewMode === 2 ? 'viewmode-onclick' : 'viewmode-default'}`}
                        />
                    </button>
                </div>
            </section>
            <section>
                {/* 활성화된 뷰모드에 따라 다른 컴포넌트 렌더링 */}
                {viewMode === 1 && (
                    <ChallengeGridView
                        challenges={challenges}
                        activeCategory={activeCategory}
                        searchResults={searchResults}
                        sortedResults={sortedResults}
                        viewMode={viewMode}
                    />
                )}
                {viewMode === 2 && (
                    <ChallengeListView
                        challenges={challenges}
                        activeCategory={activeCategory}
                        searchResults={searchResults}
                        sortedResults={sortedResults}
                        viewMode={viewMode}
                    />
                )}
            </section>
        </>
    );
}
