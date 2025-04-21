import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getChallenges } from '../../../utils/localStorage';
import ChallengeListContainer from '../../../components/shared/ChallengeContainer';

const AllChallengesLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category } = useParams(); // url에서 카테고리 파라미터 읽어오기
    const [activeCategory, setActiveCategory] = useState(category || '전체'); // 초기 카테고리 상태 설정
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null); // 검색 결과 상태 관리
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        setChallenges(getChallenges());
    }, []);

    // 삭제 후 최신 데이터를 불러오도록 useEffect 추가
    useEffect(() => {
        if (location.state?.refresh) {
            setChallenges(getChallenges());

            navigate('/challenges', { replace: true }); // 페이지 이동 후 `state` 초기화
        }
    }, [location.state?.refresh, challenges, navigate]);

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
            setActiveCategory(category); // URL로부터 카테고리 값 업데이트
        }
    }, [category]); // URL 카테고리 파라미터가 변경될 때마다 실행

    // 카테고리나 검색어가 변경될 때만 검색을 실행
    useEffect(() => {
        if (searchTerm || activeCategory !== '전체') {
            handleSearch(searchTerm, activeCategory);
        }
    }, [activeCategory, searchTerm, handleSearch]); // 카테고리 또는 검색어 변경 시 실행

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
