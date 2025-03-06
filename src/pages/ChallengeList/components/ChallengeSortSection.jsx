import React, { useEffect } from 'react';
import { BsList, BsGridFill } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa6';
import { getChallenges } from '../../../utils/localStorage';

export default function ChallengeSortSection({
    searchResults,
    sortOption,
    setSortOption,
    setSortedResults,
}) {
    // 페이지 로드 시 기본적으로 최신순으로 정렬
    useEffect(() => {
        const challenges = getChallenges();
        const sorted = sortedChallenges(challenges, sortOption);
        setSortedResults(sorted);
    }, [sortOption]);

    const sortedChallenges = (challenges, option) => {
        if (!challenges || challenges.length === 0) return [];

        switch (option) {
            case '인기순':
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
            // case '달성율 높은 순':
            //     return;
            default: // 기본값, 최신순
                return [...challenges].sort(
                    (a, b) => new Date(b.postDate) - new Date(a.postDate)
                );
        }
    };

    const handleSortChange = (e) => {
        const newSortOption = e.target.value;
        setSortOption(newSortOption);

        // searchResults가 null이 아니고, length가 0보다 크다면 그것을 정렬
        const challengesToSort =
            searchResults && searchResults.length > 0
                ? searchResults
                : getChallenges();

        // 정렬된 결과를 부모 컴포넌트에 전달
        const sortedData = sortedChallenges(challengesToSort, newSortOption);
        setSortedResults(sortedData);
        console.log(sortedData);
    };

    return (
        <section className='w-full flex justify-end items-center gap-3 md:gap-4 mb-3 md:mb-4'>
            <div className='flex justify-center items-center gap-1'>
                <select
                    id='sort'
                    name='sort'
                    aria-label='Sort'
                    className='bg-transparent main-text font-semibold text-neutral-700 text-end col-start-1 row-start-1 appearance-none focus:outline-none'
                    value={sortOption}
                    onChange={handleSortChange}
                >
                    <option>최신순</option>
                    <option>인기순</option>
                    <option>스크랩 많은 순</option>
                    <option>좋아요 많은 순</option>
                    {/* <option>달성율 높은 순</option> */}
                </select>
                <FaChevronDown
                    aria-hidden='true'
                    className='flex items-center pointer-events-none text-neutral-700 size-2.5 md:size-3'
                />
            </div>
            <div className='flex justify-end items-center gap-1.5 md:gap-2'>
                <button>
                    <BsGridFill className='text-main-600 size-4 ' />
                </button>
                <button>
                    <BsList className='text-main-500 size-5' />
                </button>
            </div>
        </section>
    );
}
