import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { HiFire } from 'react-icons/hi2';
import { FaCheck, FaPen } from 'react-icons/fa6';
import {
    setMyPosts,
    toggleClgState,
    setSelectedChallenge,
} from '../../store/features/userChallengeSlice';

const OngoingChallenges = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [startIndex, setStartIndex] = useState(0);
    const challengesPerPage = 4;
    const ongoingChallenges =
        useSelector((state) => state.myClgList.ongoingChallenges) || [];

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
        dispatch(toggleClgState({ id, type }));
    };

    // 챌린지 카테고리별 뱃지 클래스
    const badgeClasses = {
        식단: 'budge-meal',
        학습: 'budge-study',
        운동: 'budge-sport',
        습관: 'budge-habit',
    };
    const getBadgeClass = (category) => badgeClasses[category] || '';

    // 챌린지 상태 클래스
    const getClgTitleClass = (doing, done) =>
        !doing && done
            ? 'line-through'
            : !doing && !done
              ? 'line-through text-neutral-500'
              : '';
    const getClgDoingClass = (doing) => (doing ? 'check-on' : 'check-off');
    const getClgNoteClass = (done) => (done ? 'note-on' : 'note-off');

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
        <div className='w-full h-[200px] md:w-[48vw] md:h-[42vh] md:min-h-[320px]'>
            <h2 className='title w-full h-8 md:h-10 flex items-center p-4 rounded-t-2xl text-neutral-100 bg-neutral-800'>
                도전 중인 챌린지 ({filteredChallenges.length})
            </h2>
            {isLoggedIn ? (
                filteredChallenges.length > 0 ? (
                    <ul className='w-full h-[166px] md:h-[39vh] md:min-h-[280px] flex flex-col rounded-b-2xl md:rounded-b-3xl bg-neutral-100 overflow-scroll scrollbar-none'>
                        {filteredChallenges.map((challenge, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`w-full min-h-[56px] md:h-[7.8vh] bg-neutral-100 flex justify-between px-4 border-b border-neutral-300 ${
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
                                                    <div
                                                        className={`${getBadgeClass(challenge.category)}`}
                                                    >
                                                        {challenge.category}
                                                    </div>
                                                    <span className='sub-text'>
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
                <div className='w-full h-[166px] md:h-[39vh] md:min-h-[280px] flex flex-col justify-between items-center card rounded-t-none pt-12 pb-6 md:pt-20 md:pb-10'>
                    <h2 className='text-sm md:text-base font-semibold text-neutral-700 ml-[3%]'>
                        로그인이 필요한 기능입니다.
                    </h2>
                    <button
                        onClick={() => navigate('/login')}
                        className='btn btn-key px-4 py-2 text-sm md:text-base '
                    >
                        로그인하러 가기
                    </button>
                </div>
            )}
        </div>
    );
};

export default OngoingChallenges;
