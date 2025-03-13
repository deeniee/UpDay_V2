import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCategoryIllust } from '../../../utils/categoryList';
import { getAuthorData, getParticipantDatas } from '../../../utils/getUserData';

import ChallengeHeader from './ChallengeHeader';

import { IoBookmarks, IoHeart } from 'react-icons/io5';

const ChallengeInfo = ({ postData }) => {
    const {
        id,
        category,
        duration,
        title,
        content,
        authorId,
        postDate,
        postClicked,
        scrapCount,
        likesCount,
        participants,
    } = postData;

    const [participantsData, setParticipantsData] = useState([]);

    useEffect(() => {
        const participantIds = postData.participants;
        const fetchParticipants = async () => {
            const updatedParticipants = getParticipantDatas(participantIds);
            setParticipantsData(updatedParticipants);
        };
        fetchParticipants();
    }, [postData, participants]);

    return (
        <section className='card flex flex-col md:flex-row'>
            <div className='relative card bg-neutral-300 w-auto aspect-[5/3] md:w-[40%] md:max-w-[420px] md:aspect-square m-3 md:m-4'>
                <img
                    src={getCategoryIllust(category)}
                    alt={category}
                    className='w-full p-4 aspect-[5/3] md:aspect-square'
                />
                <div className='absolute bottom-3 right-3.5 main-text text-neutral-100 mix-blend-difference flex justify-end items-center gap-1 md:gap-1.5 ml-1 md:ml-2'>
                    <div className='flex items-center gap-0.5 md:gap-1'>
                        <IoBookmarks />
                        {scrapCount}
                    </div>

                    <div className='flex items-center gap-0.5 md:gap-1'>
                        <IoHeart className='size-3.5' />
                        {likesCount}
                    </div>
                </div>
            </div>
            <div className='w-auto md:w-[60%] flex flex-col justify-between m-3 mt-0 md:m-4 md:ml-0'>
                <div className='space-y-3 md:space-y-4'>
                    <ChallengeHeader postData={postData} />
                    <p className='main-text h-20'>{content}</p>
                </div>

                <div className='flex items-center gap-2'>
                    <img
                        src={getAuthorData(authorId).userImg}
                        alt={`${getAuthorData(authorId).nickname} 프로필 사진`}
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <span className='main-text'>
                        {getAuthorData(authorId).nickname}
                    </span>
                    <span>가입일/달성율</span>
                </div>
            </div>
        </section>
    );
};
export default ChallengeInfo;
