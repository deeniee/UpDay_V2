import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getJoinedChallenge } from '../../../store/features/userChallengeSlice';
import ChallengeListContainer from '../../../components/shared/ChallengeContainer';

const MyChallengesLayout = () => {
    const { category } = useParams(); // url에서 카테고리 파라미터 읽어오기
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState(category || '전체'); // 초기 카테고리 상태 설정
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null); // 검색 결과 상태 관리

    const challenges = useSelector(
        (state) => state.userChallenge.joinedChallenges
    );

    // 참여한 챌린지 불러오기
    useEffect(() => {
        dispatch(getJoinedChallenge());
    }, [dispatch]);

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

    // 카테고리 또는 검색어 변경 시, 검색 실행
    useEffect(() => {
        handleSearch(searchTerm, activeCategory); // 카테고리 변경 시 검색 실행
    }, [activeCategory, searchTerm, handleSearch]); // 카테고리 또는 검색어 변경 시 실행

    // 카테고리 변경 시, activeCategory 상태 업데이트
    useEffect(() => {
        if (category) {
            setActiveCategory(category);
        }
    }, [category]); // URL 카테고리 파라미터가 변경될 때마다 실행

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

export default MyChallengesLayout;
