import React, { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import useGemini from '../components/useGemini';
import { useUserImages } from '../../../utils/useUserImages';
import { getCurrentUserData } from '../../../utils/localStorage';

const ChallengeComments = ({ postData }) => {
    const { category, duration, title, content, participants } = postData;
    const updatedParticipants = useUserImages(participants);

    console.log(getCurrentUserData());

    return (
        <div>
            <div className='relative flex items-center justify-end border-b border-neutral-300 p-3 md:p-4 mx-3 md:mx-4'>
                <p className='main-text mr-1.5'>
                    지금까지 {participants.length}명이 참여했어요!
                </p>
                <BsThreeDots className='absolute top-4 right-9 md:top-6 md:right-[60px] z-30 w-4 h-4 flex justify-center items-center text-neutral-100' />
                {updatedParticipants.slice(0, 3).map((participant, index) => (
                    <div
                        key={index}
                        className='w-auto blur-[0.3px]'
                        style={{
                            zIndex: participants.length - index, // index가 클수록 z-index가 낮아지도록 설정
                            marginLeft: index === 0 ? 0 : -14, // index가 커질수록 왼쪽 여백이 증가
                        }}
                    >
                        <img
                            src={participant.userImg}
                            alt={`${participant.nickname} 프로필 사진`}
                            className='w-6 md:w-8 aspect-square object-cover rounded-full'
                        />
                    </div>
                ))}
            </div>
            <ul className='py-3 md:py-4'>
                <span className='title p-3 md:p-4'>참여자 후기</span>
                {updatedParticipants.slice(4, 8).map((participant, index) => (
                    <li
                        key={participant.nickname}
                        className='flex gap-3 md:gap-4 p-3 pb-0 md:p-4 md:pb-0'
                    >
                        <img
                            src={participant.userImg}
                            alt={`${participant.nickname} 프로필 사진`}
                            className='w-10 h-10 md:w-11 md:h-11 object-cover rounded-full'
                        />
                        <div className='flex flex-col flex-1 main-text gap-1.5 md:gap-2'>
                            <span className='font-semibold'>
                                {participant.nickname}
                            </span>
                            <span>{content}</span>
                        </div>
                    </li>
                ))}
                <li className='flex p-3 md:p-4 gap-3 md:gap-4'>
                    <img
                        src={getCurrentUserData()}
                        alt={`내 프로필`}
                        className='w-10 h-10 md:w-11 md:h-11 object-cover rounded-full'
                    />
                    <input
                        className='input-field'
                        placeholder='후기를 입력하세요'
                    ></input>
                </li>
            </ul>
        </div>
    );
};

export default ChallengeComments;
