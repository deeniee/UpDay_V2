import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { BsDot } from 'react-icons/bs';
import { HiFire, HiDocumentCheck, HiOutlineDocument } from 'react-icons/hi2';
import {
    getCategoryIcon,
    getCategoryIllust,
} from '../../../utils/categoryList';

const NoteMyChallengesLayout = () => {
    const loggedInUserId = localStorage.getItem('loggedInUser');

    const userOngoing = useSelector(
        (state) => state.userChallenge.ongoingChallenges || []
    );

    const dateToChallengeMap = {};

    userOngoing.forEach((challenge) => {
        const participant = challenge.participants.find(
            (p) => p.userId === loggedInUserId
        );

        if (!participant?.joinDate) return; // 참여 기록이 없으면 스킵

        const start = moment(participant.joinDate);
        const durationStr = challenge.duration;

        let end;
        if (durationStr.includes('개월')) {
            const monthCount = parseInt(durationStr.replace('개월', ''), 10);
            end = start.clone().add(monthCount, 'months');
        } else if (durationStr.includes('일')) {
            const dayCount = parseInt(durationStr.replace('일', ''), 10);
            end = start.clone().add(dayCount, 'days');
        } else {
            end = start.clone().add(30, 'days'); // 기본 30일
        }

        const days = end.diff(start, 'days');

        for (let i = 0; i <= days; i++) {
            const dateStr = start.clone().add(i, 'days').format('YYYY-MM-DD');
            if (!dateToChallengeMap[dateStr]) {
                dateToChallengeMap[dateStr] = [];
            }
            dateToChallengeMap[dateStr].push(challenge.id);
        }
    });
    console.log(dateToChallengeMap);

    // 고정된 색상 매핑
    const challengeColorMap = {
        4: 'bg-red-200 dark:bg-red-600',
        13: 'bg-point-200 dark:bg-point-600',
        15: 'bg-yellow-100 dark:bg-yellow-600',
        21: 'bg-pink-200 dark:bg-pink-900',
        22: 'bg-blue-200 dark:bg-blue-900',
    };

    const addContent = ({ date }) => {
        const dateStr = moment(date).format('YYYY-MM-DD');
        const challengeIds = dateToChallengeMap[dateStr];

        if (challengeIds && challengeIds.length > 0) {
            return (
                <div className='absolute top-0 left-0 w-full h-ful flex flex-col pt-6 md:pt-7 gap-0.5'>
                    {challengeIds.map((id) => (
                        <div
                            key={id}
                            className={`w-full h-2 ${challengeColorMap[id] || 'text-neutral-300'}`}
                        />
                    ))}
                </div>
            );
        }

        return null;
    };

    const addClassName = ({ date, view }) => {
        if (view !== 'month') return '';

        const dateStr = moment(date).format('YYYY-MM-DD');
        const challengeIds = dateToChallengeMap[dateStr];

        if (challengeIds && challengeIds.length > 0) {
            const firstId = challengeIds[0];
            return `relative`;
        }

        return '';
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const activeDate = moment(selectedDate).format('YYYY.MM.DD');

    return (
        <main className='default-size flex-col lg:flex-row gap-6'>
            <div className='card w-full p-3 md:p-4'>
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    formatDay={(locale, date) => moment(date).format('D')} // 숫자 뒤 '일' 제외
                    className='custom-calendar'
                    calendarType='gregory'
                    view='month'
                    tileContent={addContent}
                    tileClassName={addClassName}
                    prev2Label={null}
                    next2Label={null}
                    showNeighboringMonth={true}
                />
            </div>
            <div className='card flex flex-col gap-3 md:gap-4  p-3 md:p-4 w-full'>
                <div className='flex flex-row gap-3 md:gap-4 justify-start items-center'>
                    <h1 className='title'>챌린지 기록하기</h1>
                    <span className='main-text'>{activeDate}</span>
                </div>
                <div className='flex flex-col gap-3 md:gap-4 overflow-y-scroll'>
                    {userOngoing.map((challenge) => (
                        <div className='main-text flex flex-col gap-1.5 md:gap-2 pt-3 md:pt-4 border-t border-dotted border-neutral-300 dark:border-neutral-700'>
                            <div className='flex justify-between'>
                                <div className='flex gap-0.5 md:gap-1 items-center'>
                                    <div className='w-4 md:w-6 h-4 md:h-6'>
                                        <img
                                            alt={challenge.category}
                                            src={getCategoryIcon(
                                                challenge.category
                                            )}
                                        />
                                    </div>
                                    <span className='badge'>
                                        {challenge.category}
                                    </span>
                                    <span className='font-normal text-neutral-600 dark:text-neutral-300 whitespace-nowrap'>
                                        {challenge.duration}
                                    </span>
                                    <span className='whitespace-nowrap'>
                                        {challenge.title}
                                    </span>
                                </div>
                                <div className='flex gap-3 md:gap-4'>
                                    <HiFire />
                                    <HiDocumentCheck />
                                </div>
                            </div>

                            <textarea
                                name='content'
                                id=''
                                className='textarea-field'
                            ></textarea>
                        </div>
                    ))}
                </div>
                <button className='btn btn-primary w-24 mx-auto'>
                    저장하기
                </button>
            </div>
        </main>
    );
};

export default NoteMyChallengesLayout;
