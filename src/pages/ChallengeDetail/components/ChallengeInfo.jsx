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
            <div className='card bg-neutral-300 w-auto aspect-[5/3] md:w-[45%] md:max-w-[420px] md:aspect-square m-3 md:m-4'>
                <img
                    src={getCategoryIllust(category)}
                    alt={category}
                    className='w-full p-4 aspect-[5/3] md:aspect-square'
                />
            </div>
            <div className='flex flex-col w-auto md:w-[60%] justify-between m-3 my-0 md:m-4 md:ml-0'>
                <div className='flex flex-col gap-3 mb-3'>
                    <ChallengeHeader postData={postData} />
                    <p className='main-text overflow-hidden'>{content}</p>
                </div>
                <ChallengeActions
                    scrapCount={scrapCount}
                    likesCount={likesCount}
                />
            </div>
        </section>
    );
};
export default ChallengeInfo;
