import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChallengeGrid from './ChallengeGrid';

const ChallengeGridView = ({
    challenges,
    activeCategory,
    searchResults,
    sortedResults,
    viewMode,
}) => {
    const [filteredChallenges, setFilteredChallenges] = useState([]);
    const [noResults, setNoResults] = useState(false); // 결과가 없을 때 메시지 처리 상태
    const location = useLocation();
    const isAllMyChallenges = location.pathname.includes('/my-challenges/all');
    const isSMySavedChallenges = location.pathname.includes(
        '/my-challenges/saved'
    );

    useEffect(() => {
        const storedChallenges = challenges || [];
        let filtered = [];

        // 검색 결과가 있을 경우 검색 결과만 사용
        if (searchResults && searchResults.length > 0) {
            filtered =
                activeCategory === '전체'
                    ? searchResults
                    : searchResults.filter(
                          (ch) => ch.category === activeCategory
                      );
        }
        // 정렬된 결과가 있을 경우
        else if (sortedResults?.length > 0) {
            filtered =
                activeCategory === '전체'
                    ? sortedResults
                    : sortedResults.filter(
                          (ch) => ch.category === activeCategory
                      );
        }
        // 기본 챌린지 사용
        else {
            filtered =
                activeCategory === '전체'
                    ? storedChallenges
                    : storedChallenges.filter(
                          (ch) => ch.category === activeCategory
                      );
        }

        // filteredChallenges가 실제로 변경될 때만 상태 업데이트
        if (filtered !== filteredChallenges) {
            setFilteredChallenges(filtered);
        }

        // 필터링된 결과가 없을 경우 '등록된 챌린지가 없습니다.' 메시지 표시
        setNoResults(filtered.length === 0);
    }, [
        challenges,
        activeCategory,
        searchResults,
        sortedResults,
        filteredChallenges,
    ]);

    return (
        <>
            {noResults ? (
                <p className='w-full py-6 main-text text-center text-neutral-500 dark:text-neutral-300'>
                    {`${(isAllMyChallenges && '참여한') || (isSMySavedChallenges && '저장한')} 챌린지가 없습니다.`}
                </p>
            ) : (
                <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'>
                    {filteredChallenges.map((card) => (
                        <ChallengeGrid
                            key={card.id}
                            cardData={card}
                            viewMode={viewMode}
                        />
                    ))}
                </section>
            )}
        </>
    );
};

export default ChallengeGridView;
