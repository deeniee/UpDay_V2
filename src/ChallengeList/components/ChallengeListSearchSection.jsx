import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChallenges } from '../../utils/localStorage';
import { BsSearch, BsList, BsGridFill } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa6';

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
        <section className='w-full flex flex-col gap-3 md:gap-4 mb-3 md:mb-4'>
            <div className='w-full flex flex-col md:flex-row'>
                <ul className='w-full md:w-[63.5%] flex justify-between mb-3 md:mb-0'>
                    {btnList.map((ele, idx) => (
                        <li className='w-[18%] md:w-[20%] md:pr-4' key={idx}>
                            <button
                                onClick={() => handleCategoryClick(ele.title)}
                                className={`w-full md:px-[30px] whitespace-nowrap ${getCategoryStyle(ele.title)}`}
                            >
                                {ele.title}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className='relative flex items-center flex-1'>
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
            </div>

            <div className='w-full flex justify-end items-center gap-3 md:gap-4'>
                <div className='flex justify-center items-center gap-1'>
                    <select
                        id='category'
                        name='category'
                        aria-label='Category'
                        className='bg-transparent main-text font-semibold text-neutral-700 text-end col-start-1 row-start-1 appearance-none focus:outline-none'
                        // value={categoryFilter}
                        // onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option>인기순</option>
                        <option>최신순</option>
                        <option>스크랩 많은 순</option>
                        <option>좋아요 많은 순</option>
                        <option>달성율 높은 순</option>
                    </select>
                    <FaChevronDown
                        aria-hidden='true'
                        className='flex items-center pointer-events-none text-neutral-700 size-2.5 md:size-3'
                    />
                </div>
                <div className='flex justify-end items-center gap-1.5 md:gap-2'>
                    <button>
                        <BsGridFill className='text-main-600 size-4 ' />
                    </button>
                    <button>
                        <BsList className='text-main-500 size-5' />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ChallengeListSearchSection;
