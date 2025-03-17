import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getCategoryIllust } from '../../../utils/categoryList';
import { getParticipantDatas } from '../../../utils/getUserData';
import { getAuthorData } from '../../../utils/getUserData';
import { calcActiveDays } from '../../../utils/calcDate';

import ChallengeHeader from './ChallengeHeader';
import ChallengeActions from './ChallengeActions';

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
    const formattedDate = format(postDate, 'yyyy.MM.dd');

    useEffect(() => {
        const participantIds = postData.participants;
        const fetchParticipants = async () => {
            const updatedParticipants = getParticipantDatas(participantIds);
            setParticipantsData(updatedParticipants);
        };
        fetchParticipants();
    }, [postData, participants]);

    return (
        <section className='flex flex-col md:flex-row'>
            <div className='card bg-neutral-300 w-auto aspect-[5/3] md:w-[45%] md:max-w-[420px] md:aspect-square m-3 md:m-4 md:mb-10'>
                <img
                    src={getCategoryIllust(category)}
                    alt={category}
                    className='w-full p-4 aspect-[5/3] md:aspect-square'
                />
            </div>
            <div className='w-auto md:w-[60%] flex flex-col justify-between m-3 mt-0 md:m-4 md:ml-0'>
                <div className='space-y-2'>
                    <ChallengeHeader postData={postData} />
                    <p className='main-text overflow-hidden'>{content}</p>
                </div>

                <div className='flex justify-end items-center gap-2 mt-2 md:mt-0'>
                    <img
                        src={getAuthorData(authorId).userImg}
                        alt={`${getAuthorData(authorId).nickname} 프로필 사진`}
                        className='w-6 md:w-8 aspect-square object-cover rounded-full'
                    />
                    <span className='main-text'>
                        {getAuthorData(authorId).nickname}
                    </span>
                    <span className='main-text'>{calcActiveDays()}</span>
                </div>
            </div>
        </section>
    );
};
export default ChallengeInfo;
