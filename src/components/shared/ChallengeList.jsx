import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    joinChallenge,
    setSelectedChallenge,
} from '../../store/features/challengeSlice';
import LoginRequiredModal from '../common/components/LoginRequiredModal';
import useModal from '../common/hooks/useModal';
import { getCategoryIcon, getCategoryIllust } from '../../utils/categoryList';
import { calcPassedDate } from '../../utils/calcDate';
import { getAuthorData } from '../../utils/getUserData';
import { BsDot } from 'react-icons/bs';
import { IoBookmarks, IoHeart } from 'react-icons/io5';
import { FaPen } from 'react-icons/fa6';
import { ChallengeState } from '../../pages/MyChallenges/components/ChallengeState';

const ChallengeList = ({ cardData, viewMode }) => {
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
    const location = useLocation();
    const loggedInUser = localStorage.getItem('loggedInUser');

    const userString = localStorage.getItem('users');
    const users = userString ? JSON.parse(userString) : [];
    const currentUser = users.find((user) => user.userId === loggedInUser);
    const isLoggedIn = loggedInUser && currentUser;
    const isUserJoined = participants?.some(
        (participant) =>
            participant.userId === loggedInUser && participant.clgDoing === true
    );

    const isMyChallengesPage = location.pathname.includes('/my-challenges'); // 현재 페이지가 '내 챌린지'인지 확인하는 함수

    const getNewText =
        postDate.split('T')[0] === new Date().toISOString().split('T')[0];

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

    // 클릭시 해당 카드의 상세 모달 페이지로 이동
    const handleCardClick = () => {
        dispatch(setSelectedChallenge(cardData)); // 선택한 카드의 데이터를 Redux store에 저장
        navigate(`/challenges/${id}`);
    };

    return (
        <div
            className='card p-2 pr-3 md:p-3 md:pr-4 flex gap-2 md:gap-3 hover:scale-[101%] transition duration-300'
            onClick={handleCardClick}
        >
            {/* 기본 제공 이미지 */}
            <div className='relative h-24 md:h-28 lg:h-32 aspect-square card drop-shadow-none bg-neutral-200 dark:bg-neutral-600 flex justify-center items-center '>
                {getNewText ? (
                    <p className='absolute top-2 left-2.5 md:top-1 md:left-2 main-text font-semibold text-point-400'>
                        NEW
                    </p>
                ) : (
                    <></>
                )}
                <img
                    src={getCategoryIllust(cardData.category)}
                    className='h-[70%] overflow-hidden'
                    alt={`${cardData.category} 챌린지`}
                />
            </div>
            {/* 카테고리 & 기간 & 챌린지 제목*/}
            <div className='flex flex-col justify-between flex-1 min-w-0 '>
                <div className='flex items-center gap-1'>
                    <div className='w-4 md:w-6 h-4 md:h-6'>
                        <img alt={category} src={getCategoryIcon(category)} />
                    </div>
                    <span className='main-text badge'>{category}</span>
                    <span className='main-text font-normal text-neutral-600 dark:text-neutral-300 whitespace-nowrap mr-1.5 md:mr-2 '>
                        {duration}
                    </span>

                    <p className='flex-1 h-auto main-text font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
                        {title}
                    </p>
                    {isMyChallengesPage && (
                        <ChallengeState
                            loggedInUser={loggedInUser}
                            participants={participants}
                            viewMode={viewMode}
                        />
                    )}
                    <div className='sub-text flex justify-end items-center gap-1 md:gap-1.5 ml-1 md:ml-2'>
                        <span>{calcPassedDate(postDate)}</span>
                        <BsDot className='-mx-0.5' />
                        <div className='flex items-center gap-1 md:gap-[6px]'>
                            <IoBookmarks className='size-2 md:size-2.5 text-point-600 dark:text-point-400' />
                            {scrapCount}
                        </div>

                        <div className='flex items-center gap-0.5 md:gap-1'>
                            <IoHeart className='text-point-600 dark:text-point-400' />
                            {likesCount}
                        </div>
                    </div>
                </div>
                {/* 챌린지 내용 */}
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
                {/* 유저 닉네임 & 사진 */}
                <div className='w-full flex justify-between'>
                    <div className='flex justify-start items-center'>
                        <img
                            src={getAuthorData(authorId).userImg}
                            alt={`${getAuthorData(authorId).nickname} 프로필 사진`}
                            className='w-5 md:w-6 h-5 md:h-6 object-cover rounded-full'
                        />
                        <p className='ml-1.5 md:ml-2 sub-text'>
                            {getAuthorData(authorId).nickname}
                        </p>
                    </div>
                    {/* 참여버튼 */}
                    {isMyChallengesPage ? (
                        <button className='h-[30px] md:h-[34px]'>
                            <FaPen className='text-neutral-700 dark:text-neutral-200' />
                        </button>
                    ) : (
                        <>
                            {isLoggedIn && (
                                <button
                                    type='button'
                                    className={`btn min-w-[56px] w-[20%] md:w-[16%] max-w-[108px] ${isUserJoined ? 'btn-secondary' : 'btn-primary'}`}
                                    onClick={handleJoin}
                                >
                                    {isUserJoined ? '참여 중' : '참여하기'}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChallengeList;
