import React, { useState, useEffect } from 'react';
import { BsGridFill } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
// import { IoGrid } from 'react-icons/io5';
// import { FaThList } from 'react-icons/fa';

import { FaChevronDown } from 'react-icons/fa6';
import { getChallenges } from '../../../utils/localStorage';
import ChallengeGridView from './ChallengeGridView';
import ChallengeListView from './ChallengeListView';

export default function ChallengeSortSection({
    activeCategory,
    searchResults,
}) {
    const [viewMode, setViewMode] = useState(1); // 기본값 그리드 뷰
    const [sortOption, setSortOption] = useState('최신순');
    const [sortedResults, setSortedResults] = useState(null); // 정렬된 결과 상태 관리

    useEffect(() => {
        // 검색 결과가 있으면 그것을 정렬하고, 없으면 전체 챌린지 가져와서 정렬
        const challengesToSort =
            searchResults && searchResults.length > 0
                ? searchResults
                : getChallenges();

        const sortedData = sortedChallenges(challengesToSort, sortOption);
        setSortedResults(sortedData);
    }, [sortOption, searchResults]); // 정렬 옵션이나 검색 결과가 변경될 때마다 실행

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

    return (
        <>
            <section className='w-full flex justify-end items-center gap-3 md:gap-4 mb-3 md:mb-4'>
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
                        activeCategory={activeCategory}
                        searchResults={sortedResults}
                    />
                )}
                {viewMode === 2 && (
                    <ChallengeListView
                        activeCategory={activeCategory}
                        searchResults={sortedResults}
                    />
                )}
            </section>
        </>
    );
}
