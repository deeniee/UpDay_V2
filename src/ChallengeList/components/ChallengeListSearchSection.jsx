import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChallenges } from '../../utils/localStorage';
import { BsSearch } from 'react-icons/bs';

const btnList = [
    { title: '전체', color: '#2C1725' },
    { title: '습관', color: '#DFD9DD' },
    { title: '건강', color: '#C5BDC3' },
    { title: '학습', color: '#92868E' },
    { title: '기타', color: '#5F4F5A' },
];

const ChallengeListSearchSection = ({
    setSelectedCategory,
    setSearchResults,
}) => {
    const navigate = useNavigate();
    const { category } = useParams();

    // 초기 상태를 url 파라미터 값으로 설정
    const [activeCategory, setActiveCategory] = useState(category || '전체');
    const [searchTerm, setSearchTerm] = useState('');

    // url에서 카테고리가 변경될 때마다 상태 업데이트
    useEffect(() => {
        if (category) {
            setActiveCategory(category);
            setSelectedCategory(category);
        }
    }, [category, setSelectedCategory]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setSelectedCategory(category); // 부모 컴포넌트에 선택한 카테고리 전달
        setSearchResults(null); // 카테고리 변경시 검색 결과 초기화
        navigate(`/challengelist/category/${category}`);
    };

    // 검색 로직
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setSearchResults(null); // 검색어가 없으면 검색 결과 초기화
            return;
        }

        // 로컬 스토리지에 담긴 모든 챌린지 작성글
        const challenges = getChallenges();

        // 검색어 필터링 하는 로직
        const results = challenges.filter(
            (challenges) =>
                challenges.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                challenges.content
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );

        setSearchResults(results); // 검색 결과를 부모에게 전달
    };

    // Enter 키 눌러도 검색 가능
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const getCategoryStyle = (category) =>
        category === activeCategory ? 'btn btn-neutral-1' : 'btn btn-neutral-2';

    return (
        <section className='flex flex-col md:flex-row justify-between mb-3 md:mb-4'>
            <ul className='flex justify-between mb-3 md:mb-0'>
                {btnList.map((ele, idx) => (
                    <li className='w-[18%] md:w-full md:pr-4' key={idx}>
                        <button
                            onClick={() => handleCategoryClick(ele.title)}
                            className={`w-full md:px-[30px] whitespace-nowrap ${getCategoryStyle(ele.title)}`}
                        >
                            {ele.title}
                        </button>
                    </li>
                ))}
            </ul>
            <div className='relative flex flex-1 items-center'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder='검색어를 입력하세요 :)'
                    className='input-field focus:placeholder-transparent'
                />
                <button
                    className='absolute right-0.5 md:right-1 w-8 h-8'
                    onClick={handleSearch}
                >
                    <BsSearch className='text-main-600 size-4 md:size-5' />
                </button>
            </div>
        </section>
    );
};

export default ChallengeListSearchSection;
