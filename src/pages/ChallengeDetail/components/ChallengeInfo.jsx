import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getCategoryIllust } from '../../../utils/categoryList';
import { calcDate } from '../../../utils/calcDate';
import { getAuthorData, getParticipantDatas } from '../../../utils/getUserData';

import ChallengeHeader from './ChallengeHeader';

import { FaPlus } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';
import { BsDot } from 'react-icons/bs';
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

    const getDateCount = calcDate(postDate);
    const formattedDate = format(postDate, 'yyyy.MM.dd');

    const [participantsData, setParticipantsData] = useState([]);

    useEffect(() => {
        // 예시로 participants 데이터를 받아올 때
        const participantIds = postData.participants; // 예시로 participants 목록
        const fetchParticipants = async () => {
            const updatedParticipants =
                await getParticipantDatas(participantIds);
            setParticipantsData(updatedParticipants);
        };

        console.log('참가자 데이터:', participants);
        fetchParticipants();
    }, [postData]); // postData 변경 시마다 다시 호출

    return (
        <section className='card flex flex-col md:flex-row'>
            <div className='relative card bg-neutral-300 w-auto aspect-[5/3] md:w-[40%] md:max-w-[480px] md:aspect-square m-3 md:m-4'>
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
            <div className='w-auto md:w-[60%] flex flex-col gap-4 m-3 mt-0 md:m-4 md:ml-0'>
                <ChallengeHeader postData={postData} />
                <p className='main-text'>{content}</p>
                <div className='relative flex items-center'>
                    <p className='main-text mr-1.5'>
                        {participants.length}명이 참여하고 있어요!
                    </p>
                    {participants.slice(0, 3).map((participant, index) => (
                        <div
                            key={index}
                            className='w-auto blur-[0.5px]'
                            style={{
                                zIndex: participants.length - index, // index가 클수록 z-index가 낮아지도록 설정
                                marginLeft: index === 0 ? 0 : -18, // index가 커질수록 왼쪽 여백이 증가
                            }}
                        >
                            <img
                                src={participant.userImg}
                                alt={`${participant.nickname} 프로필 사진`}
                                className='w-8 h-8 object-cover rounded-full'
                            />
                            <div
                                className='absolute top-0 w-8 h-8 object-cover rounded-full bg-neutral-900/20'
                                style={{
                                    zIndex: participants.length - index, // index가 클수록 z-index가 낮아지도록 설정
                                    marginLeft: index === 0 ? 0 : -18, // index가 커질수록 왼쪽 여백이 증가
                                    left: index === 0 ? 0 : 18,
                                }}
                            />
                        </div>
                    ))}
                    <BsThreeDots className='absolute top-1 left-36 z-20 w-6 h-6 flex justify-center items-center text-neutral-100' />
                </div>

                <p className='main-text'>ai 추천 멘트</p>
                <div className='flex items-center gap-2'>
                    <img
                        src={getAuthorData(authorId).userImg}
                        alt={`${getAuthorData(authorId).nickname} 프로필 사진`}
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <span className='main-text'>
                        {getAuthorData(authorId).nickname}
                    </span>
                    <span>해당유저 달성율</span>
                </div>
            </div>
        </section>
    );
};
export default ChallengeInfo;
