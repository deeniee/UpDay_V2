import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { BsDot } from 'react-icons/bs';
import MyCalendar from './MyCalendar';
import {
    getCategoryIcon,
    getCategoryIllust,
} from '../../../utils/categoryList';

const NoteMyChallengesLayout = () => {
    const userOngoing = useSelector(
        (state) => state.userChallenge.ongoingChallenges || []
    );

    // 기록 작성 날짜 리스트
    const dayList = [
        '2025-03-10',
        '2025-03-21',
        '2025-04-02',
        '2025-04-14',
        '2025-04-27',
    ];

    // 각 날짜 타일에 컨텐츠 추가
    const addContent = ({ date }) => {
        const contents = []; // 해당 날짜(하루)에 추가할 컨텐츠의 배열
        if (dayList.includes(moment(date).format('YYYY.MM.DD'))) {
            contents.push(<BsDot className='text-point-400 text-lg' />);
        }
        return (
            <div className='absolute flex justify-start items-start w-full h-full pt-3 px-0.5 md:pt-4 md:px-1'>
                {contents}
            </div>
        );
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

                            <div className='flex md:flex-col gap-0.5 md:gap-1'>
                                <div>간단체크용 일러스트</div>
                                <textarea
                                    name='content'
                                    id=''
                                    className='textarea-field'
                                ></textarea>
                            </div>
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
