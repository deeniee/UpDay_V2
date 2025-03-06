import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getChallenges } from '../../../utils/localStorage';

import ChallengeCategorySection from './ChallengeCategorySection';
import ChallengeSearchSection from './ChallengeSearchSection';
import ChallengeSortSection from './ChallengeSortSection';
import ChallengeListSection from './ChallengeListSection';

const ChallengeListLayout = () => {
    const { category } = useParams(); // url에서 카테고리 파라미터 읽어오기
    const [activeCategory, setActiveCategory] = useState(category || '전체'); // 초기 카테고리 상태 설정
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null); // 검색 결과 상태 관리
    const [sortOption, setSortOption] = useState('최신순');
    const [sortedResults, setSortedResults] = useState(null); // 정렬된 결과 상태 관리

    // 검색 로직 (useCallback을 사용해 handleSearch 메모이제이션)
    const handleSearch = useCallback(
        (searchTerm, category = activeCategory) => {
            if (!searchTerm.trim()) {
                setSearchResults([]);
                return;
            }

            const challenges = getChallenges();
            const filteredChallenges = challenges.filter(
                (challenge) =>
                    (category === '전체' || challenge.category === category) &&
                    (challenge.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                        challenge.content
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
            setSearchResults(filteredChallenges);
        },
        [activeCategory]
    );

    // 카테고리 변경 시, 검색 실행
    useEffect(() => {
        if (category) {
            setActiveCategory(category);
            handleSearch(searchTerm, category); // 카테고리 변경 시 검색 실행
        }
    }, [category, handleSearch, searchTerm]);

    return (
        <main className='defalut-size flex-col gap-0 md:justify-start'>
            <div className='w-full mb-3 md:mb-4 flex flex-col md:flex-row'>
                {/* 카테고리 선택 섹션 */}
                <ChallengeCategorySection
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory} // 카테고리 설정 함수 전달
                    setSearchResults={setSearchResults}
                    handleSearch={handleSearch} // 검색 함수 전달
                />
                {/* 검색 섹션 */}
                <ChallengeSearchSection
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch} // 검색 함수 전달
                />
            </div>

            {/* 정렬 섹션 */}
            <ChallengeSortSection
                searchResults={searchResults}
                sortOption={sortOption}
                setSortOption={setSortOption}
                setSortedResults={setSortedResults}
            />

            {/* 챌린지 리스트 섹션 */}
            <ChallengeListSection
                selectedCategory={activeCategory}
                searchResults={searchResults}
                sortedResults={sortedResults}
            />
        </main>
    );
};

export default ChallengeListLayout;
