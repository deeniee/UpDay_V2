import React from 'react';
import { IoClose } from 'react-icons/io5';
import { HiFire, HiDocumentCheck, HiOutlineDocument } from 'react-icons/hi2';

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

    return (
        <div
            className={`flex ${viewMode === 1 ? 'flex-grow ' : ''} justify-end items-center relative md:text-lg gap-1 md:gap-2`}
        >
            <button
                className={`aspect-square ${getClgDoingClass(isUserDoing)} ${isUserDoing ? '' : 'hidden'}`}
            >
                <HiFire />
            </button>
            <button
                className={`aspect-square ${getClgDoneClass(isUserDone)} ${isUserDone ? '' : 'hidden'}`}
            >
                <HiDocumentCheck />
            </button>
            <button
                className={`aspect-square relative ${getClgOverClass(isUserOver)} ${isUserOver ? '' : 'hidden'}`}
            >
                <HiOutlineDocument />
                <IoClose className='absolute top-1.5 md:top-2 size-2.5 md:size-3' />
            </button>
        </div>
    );
};
