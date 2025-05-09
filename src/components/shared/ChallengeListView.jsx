import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChallengeList from './ChallengeList';

const ChallengeListView = ({
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
    const isMySavedChallenges = location.pathname.includes(
        '/my-challenges/saved'
    );

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
                <p className='w-full py-6 main-text text-center text-neutral-500 dark:text-neutral-300'>
                    {`${(isAllMyChallenges && '참여한') || (isMySavedChallenges && '저장한')} 챌린지가 없습니다.`}
                </p>
            ) : (
                <section className='flex flex-col gap-3 md:gap-4'>
                    {filteredChallenges.map((card) => (
                        <ChallengeList
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
export default ChallengeListView;
