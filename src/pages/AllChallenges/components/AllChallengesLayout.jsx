import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getChallenges } from '../../../utils/localStorage';
import ChallengeListContainer from '../../../components/shared/ChallengeContainer';

const AllChallengesLayout = () => {
    const { category } = useParams(); // url에서 카테고리 파라미터 읽어오기
    const [activeCategory, setActiveCategory] = useState(category || '전체'); // 초기 카테고리 상태 설정
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null); // 검색 결과 상태 관리
    const challenges = getChallenges();

    // 검색 로직 (useCallback을 사용해 handleSearch 메모이제이션)
    const handleSearch = useCallback(
        (searchTerm, category = activeCategory) => {
            if (!searchTerm.trim()) {
                setSearchResults([]);
                return;
            }

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
        [activeCategory, challenges]
    );

    // 카테고리 변경 시, 검색 실행
    useEffect(() => {
        if (category) {
            setActiveCategory(category);
            handleSearch(searchTerm, category); // 카테고리 변경 시 검색 실행
        }
    }, [category, handleSearch, searchTerm]);

    return (
        <ChallengeListContainer
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            handleSearch={handleSearch}
            challenges={challenges}
        />
    );
};

export default AllChallengesLayout;
