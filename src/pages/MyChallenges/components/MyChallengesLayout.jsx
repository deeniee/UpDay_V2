import React from 'react';
import { Link } from 'react-router-dom';
import picRecord from '../images/pic_record.svg';
import picRecommend from '../images/pic_recommend.svg';
import picCollect from '../images/pic_collect.svg';
import picPreffered from '../images/pic_preferred.svg';

import MyChallengeCard from './MyChallengeCard';

const MyChallengesLayout = () => {
    return (
        <main className='default-size grid grid-cols-1 gap-6 md:grid-cols-2'>
            <MyChallengeCard
                title='챌린지 기록하기'
                subtitles={[
                    '매일의 챌린지를 확인하고',
                    '오늘의 기록을 남겨보세요.',
                ]}
                imgSrc={picRecord}
                imgAlt='챌린지 기록하기 일러스트'
                path='note'
            />
            <div className='flex md:flex-col md:gap-4 w-full h-full md:min-h-[312px] md:max-h-[592px]'>
                <div className='flex flex-col gap-3 md:gap-4 w-56 md:w-full'>
                    <h2 className='title'> 관심있는 챌린지</h2>
                    <div className='flex flex-col md:flex-row gap-2 md:gap-1'>
                        <span className='sub-text -mt-2 md:-mt-3'>
                            좋아요와 스크랩한 챌린지를
                        </span>
                        <span className='sub-text -mt-2 md:-mt-3'>
                            한눈에 볼 수 있어요.
                        </span>
                    </div>
                </div>
                <Link
                    to='saved'
                    className='card w-full h-full flex justify-center items-center p-8 md:p-0'
                >
                    <img
                        src={picPreffered}
                        imgAlt='관심있는 챌린지 일러스트'
                        className='h-28 md:h-32'
                    />
                </Link>
            </div>
            <MyChallengeCard
                title='챌린지 모아보기'
                subtitles={[
                    '완료하거나 진행 중인 챌린지도',
                    '여기서 확인해보세요.',
                ]}
                imgSrc={picCollect}
                imgAlt='챌린지 모아보기 일러스트'
                path='all'
            />
            <MyChallengeCard
                title='추천 챌린지'
                subtitles={[
                    '내 관심사와 활동을 바탕으로',
                    '새로운 챌린지를 추천해줘요.',
                ]}
                imgSrc={picRecommend}
                imgAlt='추천 챌린지 일러스트'
                path='recommend'
            />
        </main>
    );
};
export default MyChallengesLayout;
