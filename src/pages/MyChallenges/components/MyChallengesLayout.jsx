import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import picRecord from '../images/pic_record.svg';
import picRecommend from '../images/pic_recommend.svg';
import picCollect from '../images/pic_collect.svg';
import picPreffered from '../images/pic_preferred.svg';

import MyChallengeCard from './MyChallengeCard';
import Modal from '../../../components/ui/Modal';

import RecordWithCalender from './RecordWithCalender';

const MyChallengesLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true); // 모달창 열기
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main className='default-size gap-6 grid grid-cols-1 lg:grid-cols-2'>
            <RecordWithCalender />
            <div className='flex flex-col justify-start gap-6'>
                <MyChallengeCard
                    title='관심있는 챌린지'
                    subtitles={[
                        '좋아요와 스크랩한 챌린지를',
                        '한눈에 볼 수 있어요.',
                    ]}
                    imgSrc={picPreffered}
                    imgAlt='관심있는 챌린지 일러스트'
                    path='saved'
                />
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
                <button onClick={openModal}>
                    <MyChallengeCard
                        title='추천 챌린지'
                        subtitles={[
                            '내 관심사와 활동을 바탕으로',
                            '새로운 챌린지를 추천해줘요.',
                        ]}
                        imgSrc={picRecommend}
                        imgAlt='추천 챌린지 일러스트'
                    />
                </button>
                {isModalOpen && (
                    <Modal
                        main='개발 중인 페이지입니다'
                        disc='해당 기능이 추가되면 알려드릴게요!'
                        button='다른 기능 둘러보기'
                        onClick={closeModal}
                    />
                )}
            </div>
        </main>
    );
};
export default MyChallengesLayout;
