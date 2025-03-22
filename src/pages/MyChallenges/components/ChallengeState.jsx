import React from 'react';
import { IoClose } from 'react-icons/io5';
import { HiFire, HiDocumentCheck, HiOutlineDocument } from 'react-icons/hi2';
import { FaPen } from 'react-icons/fa6';

export const ChallengeState = ({ loggedInUser, participants, viewMode }) => {
    const isUserDoing = participants?.some(
        (participant) =>
            participant.userId === loggedInUser &&
            participant.clgDoing === true &&
            participant.clgDone === false
    );
    const isUserDone = participants?.some(
        (participant) =>
            participant.userId === loggedInUser &&
            participant.clgDoing === false &&
            participant.clgDone === true
    );
    const isUserOver = participants?.some(
        (participant) =>
            participant.userId === loggedInUser &&
            participant.clgDoing === false &&
            participant.clgDone === false
    );

    const getClgDoingClass = (doing) => (doing ? 'doing-on' : 'doing-off');
    const getClgDoneClass = (done) => (done ? 'done-on' : 'done-off');
    const getClgOverClass = (over) => (over ? 'over-on' : 'over-off');
    // const getClgStateText = () => {
    //     if (isUserDoing) return '진행 중';
    //     if (isUserDone) return '완료';
    //     if (isUserOver) return '종료';
    //     return ''; // 기본값 (아무 조건도 충족하지 않을 경우)
    // };

    return (
        <div
            className={`flex justify-between items-center ${viewMode === 2 ? 'gap-3 md:gap-4' : ''}`}
        >
            <div className='relative md:text-lg w-full h-[30px] md:h-[34px] flex justify-start items-center gap-2 md:gap-3 '>
                <button
                    className={`aspect-square ${getClgDoingClass(isUserDoing)} ${isUserDoing ? '' : ''}`}
                >
                    <HiFire />
                </button>
                <button
                    className={`aspect-square ${getClgDoneClass(isUserDone)} ${isUserDone ? '' : ''}`}
                >
                    <HiDocumentCheck />
                </button>
                <button
                    className={`aspect-square relative ${getClgOverClass(isUserOver)} ${isUserOver ? '' : ''}`}
                >
                    <HiOutlineDocument />
                    <IoClose className='absolute top-1.5 md:top-2 size-2.5 md:size-3' />
                </button>
                {/* <span className='sub-text'>{getClgStateText()}</span> */}
            </div>
            <FaPen className='size-4 md:size-5 text-neutral-600 transition hover:text-neutral-800' />
        </div>
    );
};
