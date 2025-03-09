import React, { useState, useEffect } from 'react';
import ChallengeGrid from './ChallengeGrid';

const ChallengeGridView = ({
    challenges,
    activeCategory,
    searchResults,
    sortedResults,
}) => {
    const [filteredChallenges, setFilteredChallenges] = useState([]);
    const [noResults, setNoResults] = useState(false); // 결과가 없을 때 메시지 처리 상태

    useEffect(() => {
        const storedChallenges = challenges;

        // 검색 결과가 있을 경우 검색 결과만 사용
        if (searchResults && searchResults.length > 0) {
            const filtered =
                activeCategory === '전체'
                    ? searchResults
                    : searchResults.filter(
                          (ch) => ch.category === activeCategory
                      );
            setFilteredChallenges(filtered);
            return;
        }

        // 정렬된 결과가 있고 선택된 카테고리로 필터링
        if (sortedResults && sortedResults.length > 0) {
            const filtered =
                activeCategory === '전체'
                    ? sortedResults
                    : sortedResults.filter(
                          (ch) => ch.category === activeCategory
                      );
            setFilteredChallenges(filtered);
            return;
        }

        // 아니면 카테고리 필터링 후 결과를 설정
        const filtered =
            activeCategory === '전체'
                ? storedChallenges
                : storedChallenges.filter(
                      (ch) => ch.category === activeCategory
                  );

        setFilteredChallenges(filtered);
        setNoResults(filtered.length === 0); // 필터링된 결과가 없을 경우 '등록된 챌린지가 없습니다.' 메시지 표시
    }, [challenges, activeCategory, searchResults, sortedResults]); //

    return (
        <>
            {noResults ? (
                <p className='w-full py-2 main-text text-center'>
                    등록된 챌린지가 없습니다.
                </p>
            ) : (
                <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4'>
                    {filteredChallenges.map((card) => (
                        <ChallengeGrid key={card.id} cardData={card} />
                    ))}
                </section>
            )}
        </>
    );
};
export default ChallengeGridView;
