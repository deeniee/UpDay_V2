import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getChallenges } from '../../../utils/localStorage';
import ChallengeListContainer from '../../../components/shared/ChallengeContainer';
import { FaPlus } from 'react-icons/fa6';

export default function ChallengesLayout() {
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // 슬러그를 실제 카테고리 이름으로 변환
    const categorySlugMap = {
        all: '전체',
        habit: '습관',
        health: '건강',
        study: '학습',
        etc: '기타',
    };
    const displayCategory = categorySlugMap[slug] || '전체';
    const [activeCategory, setActiveCategory] = useState(
        displayCategory || '전체'
    ); // 초기 카테고리 상태 설정
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null); // 검색 결과 상태 관리
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        setChallenges(getChallenges());
    }, []);

    // 페이지 이동 후 state 초기화
    useEffect(() => {
        if (location.state?.refresh) {
            setChallenges(getChallenges());

            navigate('/challenges', { replace: true }); //  상태 초기화
        }
    }, [location.state?.refresh, challenges, navigate]);

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

    // 클릭시 글 생성하는 모달로 이동하는 로직
    const handleCreateClick = () => {
        navigate('create');
    };
    return (
        <>
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
            <button
                className='flex items-center justify-center text-neutral-100 rounded-full bg-point-400 drop-shadow-md
        fixed bottom-[11%] right-[6%] md:right-[11%] w-12 md:w-14 h-12 md:h-14 text-2xl md:text-3xl'
                onClick={handleCreateClick}
            >
                <FaPlus />
            </button>
        </>
    );
}
