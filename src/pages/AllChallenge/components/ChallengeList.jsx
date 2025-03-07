import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    joinChallenge,
    setSelectedChallenge,
} from '../../../store/features/challengeSlice';

import LoginRequiredModal from '../../../components/common/components/LoginRequiredModal';
import useModal from '../../../components/common/hooks/useModal';
import {
    getCategoryIcon,
    getCategoryIllust,
} from '../../../utils/categoryList';

const ChallengeList = ({ cardData }) => {
    // cardData 구조분해할당
    const {
        id,
        category,
        duration,
        title,
        content,
        userImg,
        nickname,
        authorId,
        clgJoin,
    } = cardData;

    const { isModalOpen, openModal, closeModal } = useModal();

    // 라우터 이동을 위한 navigate 함수
    const navigate = useNavigate();

    // Redux 액션 dispatch를 위한 함수
    const dispatch = useDispatch();

    // 로그인 한 유저의 아이디
    const loggedInUser = localStorage.getItem('loggedInUser');

    // 로그인한 유저 정보 가져오기 (users 배열에서)
    const userString = localStorage.getItem('users');
    const users = userString ? JSON.parse(userString) : [];

    // 현재 로그인한 유저 정보 찾기
    const currentUser = users.find((user) => user.email === loggedInUser);

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
            className='card p-3 md:p-4 flex gap-3 md:gap-4'
            onClick={handleCardClick}
        >
            {/* 기본 제공 이미지 */}
            <div
                className='h-24 md:h-28 aspect-square
 card bg-neutral-300 flex justify-center items-center'
            >
                <img
                    src={getCategoryIllust(cardData.category)}
                    className='h-[70%] overflow-hidden'
                    alt={`${cardData.category} 챌린지`}
                />
            </div>
            <div className='w-full flex flex-col gap-1.5 md:gap-2.5'>
                <div className='flex items-center gap-1'>
                    <div className='w-4 md:w-6 h-4 md:h-6'>
                        <img alt={category} src={getCategoryIcon(category)} />
                    </div>
                    <span className='main-text badge'>{category}</span>
                    <span className='main-text whitespace-nowrap mr-2'>
                        {duration}
                    </span>
                    <p className='h-auto main-text font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
                        {title}
                    </p>
                    <div className='sub-text flex flex-1 justify-end gap-2'>
                        <span>날짜 (0000-00-00)</span>
                        <span>조회수</span>
                        <span>스크랩</span>
                        <span>좋아요</span>
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='h-6 md:h-8 sub-text line-clamp-2'>
                        {content}
                    </p>
                </div>

                <div className='w-full flex justify-between'>
                    <div className='flex justify-start items-center'>
                        <img
                            src={userImg}
                            alt={`${nickname} 사진`}
                            className='w-4 md:w-6 h-4 md:h-6 object-cover rounded-full'
                        />
                        <p className='ml-2 sub-text'>{nickname}</p>
                    </div>

                    {isLoggedIn && (
                        <button
                            type='button'
                            className={`btn w-[15%] ${isAuthor || clgJoin ? 'btn-secondary' : 'btn-primary'}`}
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
