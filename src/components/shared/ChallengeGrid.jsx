import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    joinChallenge,
    setSelectedChallenge,
} from '../../store/features/challengeSlice';

import LoginRequiredModal from '../common/components/LoginRequiredModal';
import useModal from '../common/hooks/useModal';
import { getCategoryIcon, getCategoryIllust } from '../../utils/categoryList';
import { calcDate } from '../../utils/calcDate';
import { getAuthorData } from '../../utils/getUserData';

import { BsDot } from 'react-icons/bs';
import { IoBookmarks, IoHeart } from 'react-icons/io5';

const ChallengeGrid = ({ cardData }) => {
    const {
        id,
        category,
        duration,
        title,
        content,
        authorId,
        postDate,
        postClicked,
        scrapCount,
        likesCount,
        participants,
    } = cardData;

    const { isModalOpen, openModal, closeModal } = useModal();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = localStorage.getItem('loggedInUser');

    const userString = localStorage.getItem('users');
    const users = userString ? JSON.parse(userString) : [];
    const currentUser = users.find((user) => user.userId === loggedInUser);
    const isLoggedIn = loggedInUser && currentUser;
    const isUserJoined = participants?.some(
        (participant) =>
            participant.userId === loggedInUser && participant.clgDoing === true
    );

    // 참여하기 버튼 핸들링
    const handleJoin = (e) => {
        e.stopPropagation(); // 이벤트 전파 중지
        e.preventDefault(); // 기본 동작 방지

        if (!loggedInUser) {
            openModal();
        } else {
            dispatch(joinChallenge({ id }));
        }
    };

    // 모달창 닫고 로그인 페이지로 이동하는 로직
    const handleNavigateToLogin = () => {
        closeModal();
        navigate('/login');
    };

    // 카드 클릭시 모달을 띄우는 이벤트 핸들러
    const handleCardClick = () => {
        // 선택한 카드의 데이터를 Redux store에 저장
        dispatch(setSelectedChallenge(cardData));

        // 해당 카드의 상세 모달 페이지로 이동
        navigate(`/challenges/${id}`);
    };

    return (
        <div
            className='card p-2 md:p-3 flex flex-col gap-2 md:gap-3'
            onClick={handleCardClick}
        >
            {/* 카테고리 & 기간 */}
            <div className='flex items-center gap-1'>
                <div className='w-4 md:w-6 h-4 md:h-6'>
                    <img alt={category} src={getCategoryIcon(category)} />
                </div>
                <span className='main-text badge'>{category}</span>
                <span className='main-text whitespace-nowrap'>{duration}</span>
            </div>

            {/* 기본 제공 이미지 */}
            <div className='h-32 md:h-36 card bg-neutral-300 flex justify-center items-center'>
                <img
                    src={getCategoryIllust(cardData.category)}
                    className='h-[70%] overflow-hidden'
                    alt={`${cardData.category} 챌린지`}
                />
            </div>

            {/* 챌린지 제목 & 내용 */}
            <div className='flex flex-col gap-1 md:gap-1.5'>
                <div className='sub-text flex items-center gap-1 md:gap-1.5 whitespace-nowrap'>
                    <span>{calcDate(postDate)}</span>
                    <BsDot className='-mx-0.5' />
                    <div className='flex items-center gap-0.5 md:gap-1'>
                        <IoBookmarks className='text-point-600' />
                        {scrapCount}
                    </div>

                    <div className='flex items-center gap-0.5 md:gap-1'>
                        <IoHeart className='size-2.5 text-point-600' />
                        {likesCount}
                    </div>
                </div>
                <p className='h-auto main-text font-semibold line-clamp-1'>
                    {title}
                </p>
                <p className='h-6 md:h-8 sub-text line-clamp-2'>{content}</p>
            </div>

            {/* 유저 닉네임 & 사진 */}
            <div className='flex justify-start items-center'>
                <img
                    src={getAuthorData(authorId).userImg}
                    alt={`${getAuthorData(authorId).nickname} 프로필 사진`}
                    className='w-4 md:w-6 h-4 md:h-6 object-cover rounded-full'
                />
                <p className='ml-2 sub-text'>
                    {getAuthorData(authorId).nickname}
                </p>
            </div>

            <div className='flex justify-center'>
                {isLoggedIn && (
                    <button
                        type='button'
                        className={`btn w-[60%] ${isUserJoined ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={handleJoin}
                    >
                        {isUserJoined ? '참여 중' : '참여하기'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChallengeGrid;
