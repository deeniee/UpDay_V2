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
            <h2 className='card rounded-b-none bg-point-200 absolute top-0 title w-full h-8 md:h-10 flex items-center p-3 md:p-4 gap-1'>
                도전 중인 챌린지
                {isLoggedIn ? <span>({filteredChallenges.length})</span> : ''}
            </h2>
            {isLoggedIn ? (
                filteredChallenges.length > 0 ? (
                    <ul className='w-full h-full pt-8 md:pt-10 flex flex-col card bg-neutral-100 overflow-scroll scrollbar-none'>
                        {filteredChallenges.map((challenge, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`flex-shrink-0 w-full h-[33.6%] md:h-[20.1%] bg-neutral-100 flex justify-between px-3 md:px-4 border-b border-neutral-300 ${
                                        filteredChallenges.length >= 5 &&
                                        index === filteredChallenges.length - 1
                                            ? 'border-neutral-300/0'
                                            : 'border-neutral-300'
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
                                                    <span className='sub-text text-main-500 font-semibold'>
                                                        {calcPassedDays(
                                                            challenge.participants.find(
                                                                (p) =>
                                                                    p.userId ===
                                                                    userId
                                                            )?.joinDate
                                                        )}
                                                        일 째
                                                    </span>
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
                        {/* ✅ 챌린지 개수가 5개 미만일 때 메시지 표시 */}
                        {filteredChallenges.length > 0 &&
                            filteredChallenges.length < 5 && (
                                <div className='w-full h-full flex justify-center items-center main-text text-neutral-500'>
                                    다른 챌린지에도 도전해보는 건 어때요?
                                </div>
                            )}
                    </ul>
                ) : (
                    <div className='w-full h-[166px] md:h-[39vh] md:min-h-[280px] flex flex-col justify-center items-center card  main-text text-neutral-500'>
                        진행 중인 챌린지가 없습니다.
                    </div>
                )
            ) : (
                <div className='w-full h-full pt-8 md:pt-10 flex flex-col card bg-neutral-100 justify-around itmes-center'>
                    <h2 className='main-text font-semibold text-center text-neutral-700 ml-[3%]'>
                        로그인이 필요한 기능입니다.
                    </h2>
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
