import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa6';
import { setSelectedChallenge } from '../../../store/features/challengeSlice';
import {
    getOngoingChallenge,
    toggleChallengeState,
} from '../../../store/features/userChallengeSlice';
import { getCategoryIcon } from '../../../utils/categoryList';
import { calcPassedDays } from '../../../utils/calcDate';

const OngoingChallenges = ({ userName, isLoggedIn }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ongoingChallenges = useSelector(
        (state) => state.userChallenge.ongoingChallenges
    );
    const userId = localStorage.getItem('loggedInUser'); // 현재 로그인한 사용자 ID

    useEffect(() => {
        dispatch(getOngoingChallenge());
    }, [dispatch]);

    const filteredChallenges = ongoingChallenges
        ? [...ongoingChallenges].sort((a, b) => {
              const daysA = calcPassedDays(
                  a.participants.find((p) => p.userId === userId)?.joinDate
              );
              const daysB = calcPassedDays(
                  b.participants.find((p) => p.userId === userId)?.joinDate
              );
              return daysA - daysB;
          })
        : [];

    // 챌린지 상태 변경 핸들러
    const handleToggle = (id, type) => {
        dispatch(toggleChallengeState({ id, type }));
    };

    const handleCardClick = (challenge) => {
        // 선택한 카드의 데이터를 Redux store에 저장
        dispatch(setSelectedChallenge(challenge));

        // 해당 카드의 상세 모달 페이지로 이동
        navigate(`/challenges/${challenge.id}`);
    };

    return (
        <div className='relative w-full h-[200px] md:h-[42vh] md:min-h-[320px] md:max-h-[540px]'>
            <h2
                className='card rounded-b-none drop-shadow-none absolute top-0 title w-full h-8 md:h-10 flex items-center
            p-3 md:p-4 gap-1 z-10 bg-main-200 text-neutral-700 dark:bg-main-500 dark:text-neutral-200'
            >
                도전 중인 챌린지
                {isLoggedIn ? <span>({filteredChallenges.length})</span> : ''}
            </h2>
            {isLoggedIn ? (
                filteredChallenges.length > 0 ? (
                    <ul className='w-full h-full pt-8 md:pt-10 flex flex-col card dark:bg-neutral-300 overflow-scroll scrollbar-none'>
                        {filteredChallenges.map((challenge, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`flex-shrink-0 w-full h-[33.6%] md:h-[20.1%] flex justify-between px-3 md:px-4 border-b border-neutral-300 ${
                                        filteredChallenges.length >= 5 &&
                                        index === filteredChallenges.length - 1
                                            ? 'border-neutral-300/0'
                                            : 'border-neutral-300 dark:border-neutral-700'
                                    }`}
                                    onClick={() => handleCardClick(challenge)} // 클릭 시 해당 challenge를 전달
                                >
                                    {challenge ? (
                                        <>
                                            <div className='w-full flex flex-col justify-evenly items-start overflow-hidden'>
                                                <div className='w-full flex items-center gap-1 text-neutral-700 whitespace-nowrap'>
                                                    <div className='flex items-center gap-1'>
                                                        <div className='w-4 md:w-6 h-4 md:h-6'>
                                                            <img
                                                                alt={
                                                                    challenge.category
                                                                }
                                                                src={getCategoryIcon(
                                                                    challenge.category
                                                                )}
                                                            />
                                                        </div>
                                                        <span className='main-text badge'>
                                                            {challenge.category}
                                                        </span>
                                                    </div>
                                                    <p className='sub-text font-semibold'>
                                                        <span className='text-point-500 dark:text-point-400'>
                                                            {calcPassedDays(
                                                                challenge.participants.find(
                                                                    (p) =>
                                                                        p.userId ===
                                                                        userId
                                                                )?.joinDate
                                                            )}
                                                        </span>
                                                        일 째
                                                    </p>
                                                </div>

                                                <span className='main-text w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                                                    {challenge.title}
                                                </span>
                                            </div>

                                            <button
                                                className={`flex justify-center items-center note-on`}
                                                onClick={(e) =>
                                                    handleToggle(
                                                        challenge.id,
                                                        'done',
                                                        e
                                                    )
                                                }
                                            >
                                                <FaPen className='text-sm' />
                                            </button>
                                        </>
                                    ) : null}
                                </li>
                            );
                        })}
                        {filteredChallenges.length > 0 &&
                            filteredChallenges.length < 5 && (
                                <div className='w-full h-full min-h-[33.6%] md:min-h-[20.1%] flex justify-center items-center main-text text-neutral-500'>
                                    다른 챌린지에도 도전해보는 건 어때요?
                                </div>
                            )}
                    </ul>
                ) : (
                    <div className='w-full h-[166px] md:h-[39vh] md:min-h-[280px] flex flex-col justify-center items-center card main-text text-neutral-500'>
                        진행 중인 챌린지가 없습니다.
                    </div>
                )
            ) : (
                <div className='w-full h-full pt-11 pb-4 md:pt-16 md:pb-8 flex flex-col card justify-between itmes-center'>
                    <div className='flex flex-col justify-center items-center gap-[20%] w-full h-[70%]'>
                        <h2 className='main-text font-semibold text-neutral-700 dark:text-neutral-100'>
                            로그인이 필요한 기능입니다
                        </h2>
                        <p className='sub-text text-neutral-700 dark:text-neutral-100'>
                            도전 중인 챌린지를 메인 페이지에서 한 눈에 볼 수
                            있어요!
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/login')}
                        className='btn btn-point w-auto mx-auto px-3 md:px-4'
                    >
                        로그인하러 가기
                    </button>
                </div>
            )}
        </div>
    );
};

export default OngoingChallenges;
