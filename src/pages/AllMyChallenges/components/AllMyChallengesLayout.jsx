import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getJoinedChallenge } from '../../../store/features/userChallengeSlice';
import ChallengeListContainer from '../../../components/shared/ChallengeContainer';

export default function AllMyChallengesLayout() {
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 슬러그를 실제 카테고리 이름으로 변환
    const categorySlugMap = {
        all: '전체',
        habit: '습관',
        health: '건강',
        study: '학습',
        etc: '기타',
    };
    const displayCategory = categorySlugMap[slug] || '전체';

    const [activeCategory, setActiveCategory] = useState(displayCategory);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const challenges = useSelector(
        (state) => state.userChallenge.joinedChallenges
    );

    // 첫 진입 및 새로고침 시 challenge 목록 불러오기
    useEffect(() => {
        dispatch(getJoinedChallenge());
    }, [dispatch]);

    // 페이지 이동 후 state 초기화
    useEffect(() => {
        if (location.state?.refresh) {
            dispatch(getJoinedChallenge());
            navigate('my-challenges', { replace: true }); // 상태 초기화
        }
    }, [location.state, dispatch, navigate]);

    // URL 슬러그가 바뀔 때 카테고리 업데이트
    useEffect(() => {
        if (!slug) return; // 잘못된 접근 방지
        setActiveCategory(displayCategory);
    }, [slug, displayCategory]);

    // 검색 로직
    const handleSearch = useCallback(
        (searchTerm, category = activeCategory) => {
            if (!searchTerm.trim()) {
                setSearchResults([]);
                return;
            }

            const filtered = challenges.filter(
                (challenge) =>
                    (category === '전체' || challenge.category === category) &&
                    (challenge.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                        challenge.content
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
            setSearchResults(filtered);
        },
        [activeCategory, challenges]
    );

    // 검색 조건이 변경되었을 때만 실행 + challenges 준비되었을 때만
    useEffect(() => {
        if (
            (searchTerm || activeCategory !== '전체') &&
            challenges.length > 0
        ) {
            handleSearch(searchTerm, activeCategory);
        }
    }, [activeCategory, searchTerm, challenges, handleSearch]);

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
}
