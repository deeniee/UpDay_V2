import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getChallenges } from '../../../utils/localStorage';
import { getUserSavedData } from '../../../utils/getUserData';
import ChallengeListContainer from '../../../components/shared/ChallengeContainer';

// 슬러그를 실제 카테고리 이름으로 변환
const categorySlugMap = {
    all: '전체',
    habit: '습관',
    health: '건강',
    study: '학습',
    etc: '기타',
};

export default function SavedMyChallengesLayout() {
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const displayCategory = categorySlugMap[slug] || '전체';
    const [activeCategory, setActiveCategory] = useState(
        displayCategory || '전체'
    ); // 초기 카테고리 상태 설정
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null); // 검색 결과 상태 관리
    const [challenges, setChallenges] = useState([]);
    const [savedData, setSavedData] = useState({
        likedIds: [],
        scrappedIds: [],
    });

    useEffect(() => {
        setChallenges(getChallenges());
    }, []);
    useEffect(() => {
        setSavedData(getUserSavedData());
    }, []);

    const savedChallenges = useMemo(() => {
        return challenges.filter(
            (clg) =>
                savedData.likedIds.includes(clg.id) ||
                savedData.scrappedIds.includes(clg.id)
        );
    }, [challenges, savedData]);

    // 페이지 이동 후 state 초기화
    useEffect(() => {
        if (location.state?.refresh) {
            setChallenges(getChallenges());

            navigate('/challenges', { replace: true }); //  상태 초기화
        }
    }, [location.state?.refresh, navigate]);

    // 검색 로직
    const handleSearch = useCallback(
        (searchTerm, category = activeCategory) => {
            if (!searchTerm.trim()) {
                setSearchResults([]);
                return;
            }

            const filtered = savedChallenges.filter(
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
        [activeCategory, savedChallenges]
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
            challenges={savedChallenges}
        />
    );
}
