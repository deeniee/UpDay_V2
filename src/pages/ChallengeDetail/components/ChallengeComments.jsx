import React, { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import useGemini from '../components/useGemini';
import { useUserImages } from '../../../utils/useUserImages';
import { getCurrentUserData } from '../../../utils/localStorage';

const ChallengeComments = ({ postData }) => {
    const { category, duration, title, content, participants } = postData;
    const updatedParticipants = useUserImages(participants);

    return (
        <section>
            <div className='relative flex items-center justify-end border-b border-neutral-300 pb-3 md:pb-4 mx-3 md:mx-4'>
                {participants.length === 1 ? (
                    <p className='main-text py-1 md:py-1.5'>
                        이 챌린지의 첫 주인공이 되어보세요!
                    </p>
                ) : (
                    <>
                        <p className='main-text mr-1.5 '>
                            지금까지 {participants.length}명이 참여했어요!
                        </p>
                        <BsThreeDots className='absolute top-4.5 right-[26px] md:top-2 md:right-11 z-30 w-3 h-3 md:w-4 md:h-4 flex justify-center items-center' />
                        {updatedParticipants
                            .slice(0, 3)
                            .map((participant, index) => (
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
                    </>
                )}
            </div>
            {participants.length === 1 ? (
                <></>
            ) : (
                <ul className='pt-3 md:pt-4'>
                    <span className='title p-3 md:p-4'>참여자 후기</span>
                    {updatedParticipants
                        .slice(4, 8)
                        .map((participant, index) => (
                            <li
                                key={participant.nickname}
                                className='flex gap-3 md:gap-4 p-3 pb-0 md:p-4 md:pb-0'
                            >
                                <img
                                    src={participant.userImg}
                                    alt={`${participant.nickname} 프로필 사진`}
                                    className='w-10 md:w-11 aspect-square object-cover rounded-full border border-neutral-400'
                                />
                                <div className='flex flex-col flex-1 main-text gap-1.5 md:gap-2'>
                                    <span className='font-semibold'>
                                        {participant.nickname}
                                    </span>
                                </div>
                            </li>
                        ))}
                    <li className='flex items-center p-3 md:p-4 gap-3 md:gap-4'>
                        <img
                            src={getCurrentUserData().userImg}
                            alt={`유저 프로필`}
                            className='w-10 md:w-11 aspect-square object-cover rounded-full border border-neutral-400'
                        />
                        <input
                            className='input-field h-[30px] md:h-[34px]'
                            placeholder='후기를 입력하세요.'
                        ></input>
                        <button className='btn btn-primary w-24 md:w-28'>
                            등록하기
                        </button>
                    </li>
                </ul>
            )}
        </section>
    );
};

export default ChallengeComments;
