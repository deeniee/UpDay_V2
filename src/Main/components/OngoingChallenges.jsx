import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { HiFire } from 'react-icons/hi2';
import { FaCheck, FaPen } from 'react-icons/fa6';
import { toggleChallengeState } from '../../store/features/challengeSlice';
import IconHabit from '../../assets/images/icon_habit.svg';
import IconHealth from '../../assets/images/icon_health.svg';
import IconStudy from '../../assets/images/icon_study.svg';
import IconEtc from '../../assets/images/icon_etc.svg';
const OngoingChallenges = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [startIndex, setStartIndex] = useState(0);
    const challengesPerPage = 4;
    const ongoingChallenges =
        useSelector((state) => state.challenge.ongoingChallenges) || [];

    const calculateDaysPassed = (joinDate) => {
        const start = new Date(joinDate);
        const today = new Date();
        const diffTime = Math.abs(today - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredChallenges = ongoingChallenges
        ? [...ongoingChallenges].sort((a, b) => {
              const daysA = calculateDaysPassed(a.joinDate);
              const daysB = calculateDaysPassed(b.joinDate);
              return daysA - daysB; // 날짜 기준 오름차순 정렬
          })
        : [];

    const handleLeftClick = () => {
        setStartIndex((prev) =>
            prev - challengesPerPage < 0 ? 0 : prev - challengesPerPage
        );
    };

    const handleRightClick = () => {
        setStartIndex((prev) =>
            prev + challengesPerPage >= filteredChallenges.length
                ? prev
                : prev + challengesPerPage
        );
    };

    const dispatch = useDispatch();

    // 챌린지 상태 변경 핸들러
    const handleToggle = (id, type) => {
        dispatch(toggleChallengeState({ id, type }));
    };

    // 챌린지 카테고리별 뱃지 클래스
    const badgeClasses = {
        습관: 'badge-habit',
        건강: 'badge-health',
        학습: 'badge-study',
        기타: 'badge-etc',
    };
    const getBadgeClass = (category) => badgeClasses[category] || '';

    // 챌린지 카테고리별 아이콘
    const badgeIcons = {
        습관: IconHabit,
        건강: IconHealth,
        학습: IconStudy,
        기타: IconEtc,
    };
    const getBadgeIcon = (category) => badgeIcons[category] || '';

    // // 챌린지 상태 클래스
    // const getClgTitleClass = (doing, done) =>
    //     !doing && done
    //         ? 'line-through'
    //         : !doing && !done
    //           ? 'line-through text-neutral-500'
    //           : '';
    // const getClgDoingClass = (doing) => (doing ? 'check-on' : 'check-off');
    // const getClgNoteClass = (done) => (done ? 'note-on' : 'note-off');

    {
        /* <div className='flex gap-3'>
                    <IoIosArrowDropleftCircle
                        direction='left'
                        onClick={handleLeftClick}
                        className='text-3xl md:text-4xl'
                    />
                    <IoIosArrowDroprightCircle
                        direction='right'
                        onClick={handleRightClick}
                        className='text-3xl md:text-4xl'
                    />
                </div> */
    }

    return (
        <div className='relative w-full h-[200px] md:h-full'>
            <h2 className='absolute top-0 title w-full h-8 md:h-10 flex items-center p-3 md:p-4 rounded-t-[18px] md:rounded-t-2xl bg-point-200'>
                도전 중인 챌린지 ({filteredChallenges.length})
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
                                >
                                    {challenge ? (
                                        <>
                                            <div className='w-full flex flex-col justify-evenly items-start overflow-hidden'>
                                                <div className='w-full flex items-center gap-1 text-neutral-700 whitespace-nowrap'>
                                                    <div className='flex items-center gap-1'>
                                                        <div className='w-4 md:w-6 h-4 md:h-6'>
                                                            <img
                                                                alt='icon'
                                                                src={getBadgeIcon(
                                                                    challenge.category
                                                                )}
                                                            />
                                                        </div>
                                                        <span className='main-text badge'>
                                                            {challenge.category}
                                                        </span>
                                                    </div>
                                                    <span className='sub-text text-main-500 font-semibold'>
                                                        {calculateDaysPassed(
                                                            challenge.joinDate
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
                                                <FaPen text-sm />
                                            </button>
                                        </>
                                    ) : null}
                                </li>
                            );
                        })}
                        {/* ✅ 챌린지 개수가 5개 미만일 때 메시지 표시 */}
                        {filteredChallenges.length > 0 &&
                            filteredChallenges.length < 5 && (
                                <div className='w-full min-h-[56px] md:h-[7.8vh] flex justify-center items-center main-text text-neutral-500'>
                                    챌린지를 더 추가해보세요!
                                </div>
                            )}
                    </ul>
                ) : (
                    <div className='w-full h-[166px] md:h-[39vh] md:min-h-[280px] flex flex-col justify-center items-center  card rounded-t-none  main-text text-neutral-500'>
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
