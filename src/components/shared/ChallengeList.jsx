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
import { calcDate } from '../../utils/clacDate';

import { BsDot } from 'react-icons/bs';
import { IoBookmarks, IoHeart } from 'react-icons/io5';

const ChallengeList = ({ cardData }) => {
    const {
        id,
        category,
        duration,
        title,
        content,
        userImg,
        nickname,
        postDate,
        postClicked,
        scrapCount,
        likesCount,
        authorId,
        clgJoin,
    } = cardData;

    const { isModalOpen, openModal, closeModal } = useModal();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedInUser = localStorage.getItem('loggedInUser');
    const userString = localStorage.getItem('users');
    const users = userString ? JSON.parse(userString) : []; // 로그인한 유저 정보 가져오기 (users 배열에서)

    const currentUser = users.find((user) => user.email === loggedInUser); // 현재 로그인한 유저 정보 찾기

    // 내가 작성한 글이 아니고, 로그인한 유저가 있는 경우에만 참여 가능
    // const canJoin = loggedInUser && loggedInUser !== authorId && currentUser;
    // 로그인한 유저인지 확인
    const isLoggedIn = loggedInUser && currentUser;
    const isAuthor = loggedInUser === authorId;

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
        navigate(`/challengelist/${id}`);
    };

    return (
        <div
            className='card p-2 md:p-3 flex gap-2 md:gap-3'
            onClick={handleCardClick}
        >
            <div className='h-24 md:h-28 aspect-square card bg-neutral-300 flex justify-center items-center'>
                <img
                    src={getCategoryIllust(cardData.category)}
                    className='h-[70%] overflow-hidden'
                    alt={`${cardData.category} 챌린지`}
                />
            </div>
            <div className='flex flex-col justify-between flex-1 min-w-0 '>
                <div className='flex items-center gap-1'>
                    <div className='w-4 md:w-6 h-4 md:h-6'>
                        <img alt={category} src={getCategoryIcon(category)} />
                    </div>
                    <span className='main-text badge'>{category}</span>
                    <span className='text-[10px] md:text-xs whitespace-nowrap mr-1.5 md:mr-2'>
                        {duration}
                    </span>
                    <p className='flex-1 h-auto main-text font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
                        {title}
                    </p>
                    <div className='sub-text flex justify-end items-center gap-1 md:gap-2 ml-1 md:ml-2'>
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
                </div>

                <p
                    className='h-6 md:h-8 sub-text line-clamp-2 overflow-hidden text-ellipsis'
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}
                >
                    {content}
                </p>

                <div className='w-full flex justify-between'>
                    <div className='flex justify-start items-center'>
                        <img
                            src={userImg}
                            alt={`${nickname} 프로필 사진`}
                            className='w-5 md:w-6 h-5 md:h-6 object-cover rounded-full'
                        />
                        <p className='ml-1.5 md:ml-2 sub-text'>{nickname}</p>
                    </div>

                    {isLoggedIn && (
                        <button
                            type='button'
                            className={`btn w-[18%] md:w-[15%] ${isAuthor || clgJoin ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={handleJoin}
                        >
                            {isAuthor || clgJoin ? '참여 중' : '참여하기'}
                        </button>
                    )}
                </div>
                <LoginRequiredModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onNavigate={handleNavigateToLogin}
                    stopPropagation={true}
                />
            </div>
        </div>
    );
};

export default ChallengeList;
