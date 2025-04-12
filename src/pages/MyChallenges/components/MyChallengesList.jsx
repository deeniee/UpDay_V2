import React from 'react';
import ChallengeCategorySection from '../../../components/shared/ChallengeCategorySection';
import ChallengeSearchSection from '../../../components/shared/ChallengeSearchSection';
import ChallengeSortSection from '../../../components/shared/ChallengeSortSection';
import { Link } from 'react-router-dom';

const MyChallengesList = ({
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    handleSearch,
    challenges,
}) => {
    return (
        // <main className='default-size flex-col gap-0 md:justify-start'>
        //     <div className='w-full mb-3 md:mb-4 flex flex-col md:flex-row-reverse gap-y-3'>
        //         {/* 검색 섹션 */}
        //         <ChallengeSearchSection
        //             searchTerm={searchTerm}
        //             setSearchTerm={setSearchTerm}
        //             handleSearch={handleSearch}
        //         />
        //         {/* 카테고리 선택 섹션 */}
        //         <ChallengeCategorySection
        //             activeCategory={activeCategory}
        //             setActiveCategory={setActiveCategory}
        //             setSearchResults={setSearchResults}
        //             handleSearch={handleSearch}
        //         />
        //     </div>

        //     {/* 정렬 섹션 */}
        //     <ChallengeSortSection
        //         challenges={challenges}
        //         activeCategory={activeCategory}
        //         searchResults={searchResults}
        //     />
        // </main>
        // <main className='default-size flex-col gap-0 md:justify-start'>
        //     <div className='w-full mb-3 md:mb-4 flex flex-col md:flex-row-reverse gap-y-3'>
        //         <ChallengeSearchSection
        //             searchTerm={searchTerm}
        //             setSearchTerm={setSearchTerm}
        //             handleSearch={handleSearch}
        //         />
        //         <div className='w-full md:w-[56.8%] lg:w-[63.2%] h-[30px] md:h-[34px] md:pr-4 main-text md:pr-4'>
        //             내 챌린지를 한 눈에 볼 수 있어요
        //         </div>
        //     </div>

        // </main>
        <main className='default-size flex-col gap-0 md:justify-start'>
            <div className='w-full h-screen md:h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-6 md:gap-y-4'>
                <div className='flex flex-col gap-3 md:gap-4 w-full h-full'>
                    <h2 className='title'> 챌린지 기록하기</h2>
                    <span className='sub-text -mt-2 md:-mt-3'>
                        도전 중인 챌린지를 한 눈에 보고 기록해요!
                    </span>
                    <Link className='card w-full h-full p-3 md:p-4'>dd</Link>
                </div>
                <div className='flex flex-col gap-3 md:gap-4 w-full h-full'>
                    <h2 className='title'> 챌린지 모아보기</h2>
                    <span className='sub-text -mt-2 md:-mt-3'>
                        지금까지 참여한 챌린지를 둘러볼 수 있어요!
                    </span>
                    <Link className='card w-full h-full p-3 md:p-4'>dd</Link>
                </div>
                <div className='flex flex-col gap-3 md:gap-4 w-full h-full'>
                    <h2 className='title'> 관심있는 챌린지</h2>
                    <span className='sub-text -mt-2 md:-mt-3'>
                        스크랩/좋아요 한 챌린지를 볼 수 있어요!
                    </span>
                    <Link className='card w-full h-full p-3 md:p-4'>dd</Link>
                </div>
                <div className='flex flex-col gap-3 md:gap-4 w-full h-full'>
                    <h2 className='title'> 추천 챌린지</h2>
                    <span className='sub-text -mt-2 md:-mt-3'>
                        내 활동을 바탕으로 추천된 챌린지를 볼 수 있어요!
                    </span>
                    <Link className='card w-full h-full p-3 md:p-4'>dd</Link>
                </div>
            </div>
        </main>
    );
};
export default MyChallengesList;
