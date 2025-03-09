import React from 'react';

import ChallengeCategorySection from './ChallengeCategorySection';
import ChallengeSearchSection from './ChallengeSearchSection';
import ChallengeSortSection from './ChallengeSortSection';

const ChallengeListContainer = ({
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    handleSearch,
    challenges,
}) => {
    return (
        <main className='defalut-size flex-col gap-0 md:justify-start'>
            <div className='w-full mb-3 md:mb-4 flex flex-col md:flex-row'>
                {/* 카테고리 선택 섹션 */}
                <ChallengeCategorySection
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    setSearchResults={setSearchResults}
                    handleSearch={handleSearch}
                />
                {/* 검색 섹션 */}
                <ChallengeSearchSection
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                />
            </div>

            {/* 정렬 섹션 */}
            <ChallengeSortSection
                challenges={challenges}
                activeCategory={activeCategory}
                searchResults={searchResults}
            />
        </main>
    );
};

export default ChallengeListContainer;
