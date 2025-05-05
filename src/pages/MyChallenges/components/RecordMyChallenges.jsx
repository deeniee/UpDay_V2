import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { calcDays } from '../../../utils/calcDate';
import { HiFire } from 'react-icons/hi2';
import { getCategoryIcon } from '../../../utils/categoryList';
import { setClgRecord } from '../../../store/features/userRecordSlice';

const formatDate = (dateStr) => moment(dateStr).format('YYYY.MM.DD');

export const RecordMyChallenges = ({
    userJoined,
    currentUserId,
    activeDate,
    dateToChallengeMap,
    dateToColorMap,
}) => {
    const dispatch = useDispatch();
    const today = moment(new Date()).format('YYYY-MM-DD');
    const activeMoment = moment(activeDate, 'YYYY-MM-DD');
    const todayMoment = moment(today, 'YYYY-MM-DD');
    const unavailableDate = activeMoment.isAfter(todayMoment);

    const activeDateChallengeIds = useMemo(() => {
        return dateToChallengeMap[activeDate] || [];
    }, [dateToChallengeMap, activeDate]);

    const activeDateChallenges = useMemo(() => {
        return userJoined
            .filter((challenge) =>
                activeDateChallengeIds.includes(challenge.id)
            )
            .sort((a, b) => {
                const joinDateA = a.participants.find(
                    (p) => p.userId === currentUserId
                )?.joinDate;
                const joinDateB = b.participants.find(
                    (p) => p.userId === currentUserId
                )?.joinDate;
                return new Date(joinDateA) - new Date(joinDateB);
            });
    }, [userJoined, activeDateChallengeIds, currentUserId]);

    const [userNote, setUserNote] = useState();

    useEffect(() => {
        if (!currentUserId) return;

        const saved = JSON.parse(localStorage.getItem('myClgRecord')) || {};
        const userData = saved[currentUserId] || {};
        const recordsForDate = userData[activeDate] || {};

        const formatted = {
            userId: currentUserId,
            records: {
                [activeDate]: {},
            },
        };

        activeDateChallenges.forEach((challenge) => {
            formatted.records[activeDate][challenge.id] = {
                done: recordsForDate[challenge.id]?.done || false,
                note: recordsForDate[challenge.id]?.note || '',
            };
        });

        if (JSON.stringify(userNote) !== JSON.stringify(formatted)) {
            setUserNote(formatted);
        } // eslint-disable-next-line
    }, [currentUserId, activeDate, activeDateChallenges]);

    const getClgDoingClass = (doing) => (doing ? 'doing-on' : 'doing-off');

    const handleChange = (e, challengeId) => {
        const { value } = e.target;

        setUserNote((prev) => {
            const prevRecords = prev?.records || {};
            const prevDayRecords = prevRecords[activeDate] || {};
            const prevChallenge = prevDayRecords[challengeId] || {
                done: false,
                note: '',
            };

            return {
                ...prev,
                userId: currentUserId,
                records: {
                    ...prevRecords,
                    [activeDate]: {
                        ...prevDayRecords,
                        [challengeId]: {
                            ...prevChallenge,
                            note: value,
                        },
                    },
                },
            };
        });
    };

    const handleSave = () => {
        const saved = JSON.parse(localStorage.getItem('myClgRecord')) || {};
        const userData = saved[currentUserId] || {};

        const updatedForDate = { ...(userNote?.records?.[activeDate] || {}) };

        saved[currentUserId] = {
            ...userData,
            [activeDate]: updatedForDate,
        };

        localStorage.setItem('myClgRecord', JSON.stringify(saved));

        activeDateChallenges.forEach((challenge) => {
            dispatch(
                setClgRecord({
                    userId: currentUserId,
                    date: activeDate,
                    challengeId: challenge.id,
                    done: true,
                    note:
                        userNote?.records?.[activeDate]?.[challenge.id]?.note ||
                        '',
                })
            );
        });
    };

    return (
        <div
            className={`flex flex-col justify-between overflow-scroll scrollbar-none  ${unavailableDate ? '' : 'h-[280px] md:h-[344px]'} lg:h-[486px]`}
        >
            <div className='flex flex-col'>
                <div className='flex flex-row gap-3 md:gap-4 p-3 pb-2 md:p-4 md:pb-3 justify-start items-center sticky top-0 bg-neutral-100 z-10'>
                    <h2 className='title'>오늘의 기록</h2>
                    <span className='main-text'>{formatDate(activeDate)}</span>
                </div>
                <div
                    className={`flex flex-col p-3 pt-0 md:p-4 md:pt-0 ${unavailableDate ? 'gap-1.5 md:gap-2' : 'gap-5 md:gap-6'}`}
                >
                    {activeDateChallenges.map((challenge) => {
                        const participant = challenge.participants.find(
                            (p) => p.userId === currentUserId
                        );
                        const joinDate = participant?.joinDate;
                        return (
                            <div
                                key={challenge.id}
                                className='main-text flex flex-col gap-1.5 md:gap-2 pt-2 md:pt-3'
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
                                </div>
                                <div className='flex gap-3 md:gap-4'>
                                    <textarea
                                        id={`note-${challenge.id}`}
                                        name='noteChallenge'
                                        rows={3}
                                        value={
                                            userNote?.records?.[activeDate]?.[
                                                challenge.id
                                            ]?.note || ''
                                        }
                                        onChange={(e) =>
                                            handleChange(e, challenge.id)
                                        }
                                        className={`textarea-field sub-text w-full overflow-scroll scrollbar-none ${unavailableDate && 'hidden'}`}
                                        readOnly={unavailableDate}
                                    />

                                    <div className='flex flex-col justify-between items-end'>
                                        <button
                                            className={`md:text-lg aspect-square ${unavailableDate && 'hidden'} ${getClgDoingClass()}`}
                                        >
                                            <HiFire />
                                        </button>
                                        <button
                                            className={`btn btn-primary w-24 mx-auto mt-5 md:mt-6 ${unavailableDate && 'hidden'}`}
                                            onClick={handleSave}
                                        >
                                            저장하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
