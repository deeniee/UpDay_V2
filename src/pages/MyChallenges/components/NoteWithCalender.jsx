import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { BsDot } from 'react-icons/bs';
import { HiFire, HiDocumentCheck, HiOutlineDocument } from 'react-icons/hi2';
import { getCategoryIcon } from '../../../utils/categoryList';
import { calcDays } from '../../../utils/calcDate';

const NoteWithCalender = () => {
    const currentUserId = localStorage.getItem('loggedInUser');
    const userOngoing = useSelector(
        (state) => state.userChallenge.ongoingChallenges || []
    );
    const sequentialColors = [
        'bg-red-200 dark:bg-red-600',
        'bg-orange-200 dark:bg-orange-900',
        'bg-yellow-100 dark:bg-yellow-600',
        'bg-point-200 dark:bg-point-600',
        'bg-blue-200 dark:bg-blue-900',
        'bg-pink-200 dark:bg-pink-900',
    ];

    const { dateToChallengeMap, dateToColorMap } = useMemo(() => {
        const dToCMap = {};
        const dToColorMap = {};

        // 현재 유저가 참여 중인 챌린지들만 ID 순으로 정렬
        const sortedUserChallenges = userOngoing
            .filter((challenge) =>
                challenge.participants.some((p) => p.userId === currentUserId)
            )
            .sort((a, b) => {
                const dateA = new Date(
                    a.participants.find(
                        (p) => p.userId === currentUserId
                    )?.joinDate
                );
                const dateB = new Date(
                    b.participants.find(
                        (p) => p.userId === currentUserId
                    )?.joinDate
                );
                return dateA - dateB;
            });

        // 챌린지 ID별 고정 색상 매핑
        const challengeIdToColorMap = {};
        sortedUserChallenges.forEach((ch, idx) => {
            challengeIdToColorMap[ch.id] =
                sequentialColors[idx % sequentialColors.length];
        });

        // 날짜별 챌린지 ID 수집
        sortedUserChallenges.forEach((challenge) => {
            const participant = challenge.participants.find(
                (p) => p.userId === currentUserId
            );
            if (!participant?.joinDate) return;

            const start = moment(participant.joinDate);
            const durationStr = challenge.duration;

            let end;
            if (durationStr.includes('개월')) {
                const monthCount = parseInt(
                    durationStr.replace('개월', ''),
                    10
                );
                end = start.clone().add(monthCount, 'months');
            } else if (durationStr.includes('일')) {
                const dayCount = parseInt(durationStr.replace('일', ''), 10);
                end = start.clone().add(dayCount, 'days');
            } else {
                end = start.clone().add(30, 'days');
            }

            const days = end.diff(start, 'days');

            for (let i = 0; i <= days; i++) {
                const dateStr = start
                    .clone()
                    .add(i, 'days')
                    .format('YYYY-MM-DD');
                if (!dToCMap[dateStr]) dToCMap[dateStr] = [];
                dToCMap[dateStr].push(challenge.id);
                // 고정된 맵을 통해 색상 부여
                if (!dToColorMap[dateStr]) dToColorMap[dateStr] = {};
                dToColorMap[dateStr][challenge.id] =
                    challengeIdToColorMap[challenge.id];
            }
        });

        return { dateToChallengeMap: dToCMap, dateToColorMap: dToColorMap };
    }, [userOngoing, currentUserId]);

    const addContent = ({ date }) => {
        const dateStr = moment(date).format('YYYY-MM-DD');
        const challengeIds = dateToChallengeMap[dateStr];

        if (challengeIds && challengeIds.length > 0) {
            return (
                <div className='absolute top-0 left-0 w-full h-full flex flex-col pt-6 md:pt-7 gap-0.5'>
                    {challengeIds.map((id) => {
                        const colorClass =
                            dateToColorMap[dateStr]?.[id] ||
                            'bg-neutral-300 dark:bg-neutral-600';
                        return (
                            <div
                                key={id}
                                className={`w-full h-1.5 ${colorClass}`}
                            />
                        );
                    })}
                </div>
            );
        }

        return null;
    };

    const addClassName = ({ date, view }) => {
        if (view !== 'month') return '';

        return 'react-calendar__tile--active';
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const activeDate = moment(selectedDate).format('YYYY-MM-DD');
    const activeDateChallengeIds = dateToChallengeMap[activeDate] || [];
    const activeDateChallenges = userOngoing
        .filter((challenge) => activeDateChallengeIds.includes(challenge.id))
        .sort((a, b) => {
            const joinDateA = a.participants.find(
                (p) => p.userId === currentUserId
            )?.joinDate;
            const joinDateB = b.participants.find(
                (p) => p.userId === currentUserId
            )?.joinDate;

            return new Date(joinDateA) - new Date(joinDateB);
        });

    const today = moment(new Date()).format('YYYY-MM-DD');
    const activeMoment = moment(activeDate, 'YYYY-MM-DD');
    const todayMoment = moment(today, 'YYYY-MM-DD');
    const unavailableDate = activeMoment.isAfter(todayMoment);

    const getClgDoingClass = (doing) => (doing ? 'doing-on' : 'doing-off');

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-3 md:gap-4 w-full'>
                <h1 className='title'>챌린지 기록하기</h1>
                <div className='flex flex-col md:flex-row gap-2.5 md:gap-1'>
                    <span className='sub-text -mt-2 md:-mt-3'>
                        매일의 챌린지를 확인하고
                    </span>
                    <span className='sub-text -mt-2 md:-mt-3'>
                        오늘의 기록을 남겨보세요.
                    </span>
                </div>
            </div>
            <div className='card p-3 md:p-4 mb-2'>
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    formatDay={(locale, date) => moment(date).format('D')} // 숫자 뒤 '일' 제외
                    className='custom-calendar'
                    calendarType='gregory'
                    view='month'
                    tileContent={addContent}
                    prev2Label={null}
                    next2Label={null}
                    showNeighboringMonth={true}
                    onClickDay={addClassName}
                />
            </div>
            <div className='card p-3 md:p-4 flex flex-col justify-between'>
                <div className='flex flex-col gap-3 md:gap-4'>
                    <div className='flex flex-row gap-3 md:gap-4 justify-start items-center'>
                        <h2 className='title'>오늘의 기록</h2>
                        <span className='main-text'>{activeDate}</span>
                    </div>
                    <div className='flex flex-col gap-5 md:gap-6 overflow-y-scroll'>
                        {activeDateChallenges.map((challenge) => {
                            const participant = challenge.participants.find(
                                (p) => p.userId === currentUserId
                            );
                            const joinDate = participant?.joinDate;
                            return (
                                <div
                                    key={challenge.id}
                                    className='main-text flex flex-col gap-1.5 md:gap-2 pt-3 md:pt-4 border-t border-dotted border-neutral-300 dark:border-neutral-700'
                                >
                                    <div className='flex justify-between items-center'>
                                        <div className='flex gap-0.5 md:gap-1 items-center'>
                                            <div className='w-4 md:w-6 h-4 md:h-6'>
                                                <img
                                                    alt={challenge.category}
                                                    src={getCategoryIcon(
                                                        challenge.category
                                                    )}
                                                />
                                            </div>
                                            <span
                                                className={`badge text-neutral-900 dark:text-neutral-100 ${dateToColorMap[activeDate]?.[challenge.id]}`}
                                            >
                                                {challenge.category}
                                            </span>

                                            <span className='font-normal text-neutral-600 dark:text-neutral-300 whitespace-nowrap'>
                                                {challenge.duration}
                                            </span>
                                            <span className='whitespace-nowrap'>
                                                {challenge.title}
                                            </span>
                                            <p className='flex items-center main-text font-semibold pl-0.5 md:pl-1'>
                                                <span className='text-point-500 dark:text-point-400'>
                                                    {calcDays(
                                                        joinDate,
                                                        activeDate
                                                    )}
                                                </span>
                                                일 째
                                            </p>
                                        </div>
                                        <button
                                            className={`md:text-lg aspect-square ${unavailableDate && 'hidden'} ${getClgDoingClass()}`}
                                        >
                                            <HiFire />
                                        </button>
                                    </div>

                                    <textarea
                                        name='content'
                                        id=''
                                        className={`textarea-field ${unavailableDate && 'hidden'}`}
                                        readOnly={unavailableDate}
                                    ></textarea>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button
                    className={`btn btn-primary w-24 mx-auto mt-5 md:mt-6 ${unavailableDate && 'hidden'}`}
                >
                    저장하기
                </button>
            </div>
        </div>
    );
};

export default NoteWithCalender;
