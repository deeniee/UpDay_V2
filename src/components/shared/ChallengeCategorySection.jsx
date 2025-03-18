import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { categoryList, getCategoryIcon } from '../../utils/categoryList';

const ChallengeCategorySection = ({
    activeCategory,
    setActiveCategory,
    setSearchResults,
}) => {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 URL 경로 가져오기
    const isMyChallengesPage = location.pathname.includes('/my-challenges'); // 현재 페이지가 '내 챌린지'인지 확인하는 함수

    const handleCategoryClick = (category) => {
        setActiveCategory(category); // 부모 컴포넌트에 선택한 카테고리 전달
        setSearchResults(null); // 카테고리 변경시 검색 결과 초기화

        if (isMyChallengesPage) {
            navigate(`/my-challenges/category/${category}`);
        } else {
            navigate(`/challenges/category/${category}`);
        }
    };
    const getCategoryStyle = (category) =>
        category === activeCategory ? 'btn btn-neutral-1' : 'btn btn-neutral-2';

    return (
        <section className='w-full md:w-[60.8%]'>
            <ul className='w-full flex justify-between mb-3 md:mb-0'>
                {categoryList.map((category, index) => (
                    <li className='w-[18%] md:w-[20%] md:pr-4' key={index}>
                        <button
                            onClick={() => handleCategoryClick(category.title)}
                            className={`w-full md:px-auto whitespace-nowrap flex gap-[10%] ${getCategoryStyle(category.title)}`}
                        >
                            <img
                                alt={category.title}
                                src={getCategoryIcon(category.title)}
                                className={
                                    category.title === '전체'
                                        ? 'w-6 md:w-7 h-6 md:h-7 -my-2 -ml-2 md:-m-0.5'
                                        : 'w-4 md:w-6 h-4 md:h-6'
                                }
                            />
                            {category.title}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ChallengeCategorySection;
