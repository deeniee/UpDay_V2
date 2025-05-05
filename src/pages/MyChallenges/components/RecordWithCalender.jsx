import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import moment from 'moment';
import { parseDurationToDays } from '../../../store/features/userChallengeSlice';
import { BsDot } from 'react-icons/bs';
import { RecordMyChallenges } from './RecordMyChallenges';

const RecordWithCalender = () => {
    const currentUserId = localStorage.getItem('loggedInUser');
    const userJoined = useSelector(
        (state) => state.userChallenge.joinedChallenges
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
        const sortedUserChallenges = userJoined
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

            const durationInDays = parseDurationToDays(durationStr);
            const end = start.clone().add(durationInDays - 1, 'days');

            const days = end.diff(start, 'days');

            for (let i = 0; i <= days; i++) {
                const dateStr = start
                    .clone()
                    .add(i, 'days')
                    .format('YYYY-MM-DD');

                if (!dToCMap[dateStr]) dToCMap[dateStr] = [];
                dToCMap[dateStr].push(challenge.id);
                // 고정된 맵으로 색상 부여
                if (!dToColorMap[dateStr]) dToColorMap[dateStr] = {};
                dToColorMap[dateStr][challenge.id] =
                    challengeIdToColorMap[challenge.id];
            }
        });

        return { dateToChallengeMap: dToCMap, dateToColorMap: dToColorMap };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userJoined, currentUserId]);

    const addContent = ({ date }) => {
        const dateStr = moment(date).format('YYYY-MM-DD');
        const challengeIds = dateToChallengeMap[dateStr];

        if (challengeIds && challengeIds.length > 0) {
            return (
                <div className='absolute top-0 left-0 w-full h-full flex flex-col pt-5 md:pt-6 gap-0.5'>
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

    return (
        <section className='flex flex-col h-full min-h-0 lg:h-[1092px] gap-4'>
            <div className='flex flex-col gap-3 md:gap-4 w-full shrink-0'>
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
            <div className='card grow overflow-hidden scrollbar-none'>
                <div className='sticky top-0 p-3 md:p-4 border-b border-neutral-300 dark:border-neutral-700'>
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

                <RecordMyChallenges
                    userJoined={userJoined}
                    currentUserId={currentUserId}
                    activeDate={activeDate}
                    dateToChallengeMap={dateToChallengeMap}
                    dateToColorMap={dateToColorMap}
                />
            </div>
        </section>
    );
};

export default RecordWithCalender;
