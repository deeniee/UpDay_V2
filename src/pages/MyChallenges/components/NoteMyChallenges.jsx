import React from 'react';
import moment from 'moment';
import { calcDays } from '../../../utils/calcDate';
import { HiFire } from 'react-icons/hi2';
import { getCategoryIcon } from '../../../utils/categoryList';

export const NoteMyChallenges = ({
    userJoined,
    currentUserId,
    activeDate,
    dateToChallengeMap,
    dateToColorMap,
}) => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const activeMoment = moment(activeDate, 'YYYY-MM-DD');
    const todayMoment = moment(today, 'YYYY-MM-DD');
    const unavailableDate = activeMoment.isAfter(todayMoment);
    const activeDateForShow = moment(activeDate).format('YYYY.MM.DD');

    const activeDateChallengeIds = dateToChallengeMap[activeDate] || [];
    const activeDateChallenges = userJoined
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

    const getClgDoingClass = (doing) => (doing ? 'doing-on' : 'doing-off');
    return (
        <div className='card lg:h-[476px] p-3 md:p-4 flex flex-col justify-between'>
            <div
                className={`flex flex-col gap-3 md:gap-4 ${unavailableDate && 'pb-1.5 md:pb-2'}`}
            >
                <div className='flex flex-row gap-3 md:gap-4 justify-start items-center'>
                    <h2 className='title'>오늘의 기록</h2>
                    <span className='main-text'>{activeDateForShow}</span>
                </div>
                <div className='flex flex-col gap-5 md:gap-6 md:h-[346px] overflow-y-scroll scrollbar-none'>
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
                                                {calcDays(joinDate, activeDate)}
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
    );
};
