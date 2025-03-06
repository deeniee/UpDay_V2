import React from 'react';
import { BsSearch } from 'react-icons/bs';

const ChallengeSearchSection = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
}) => {
    // 엔터키로 검색
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            handleSearch(searchTerm);
        }
    };

    // 검색 버튼 클릭 시 실행
    const handleSearchButtonClick = () => {
        if (searchTerm.trim()) {
            handleSearch(searchTerm);
        }
    };

    // 인풋창 클릭 시 리셋
    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <section className='relative flex items-center flex-1'>
            <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                onClick={clearSearch}
                placeholder='검색어를 입력하세요'
                className='input-field focus:placeholder-transparent'
            />
            <button
                className='absolute right-0.5 md:right-1 w-8 h-8'
                onClick={handleSearchButtonClick}
            >
                <BsSearch className='text-main-600 size-4 md:size-5' />
            </button>
        </section>
    );
};

export default ChallengeSearchSection;
