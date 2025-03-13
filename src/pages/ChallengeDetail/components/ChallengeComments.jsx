import React, { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import useGemini from '../components/useGemini';

const ChallengeComments = ({ postData }) => {
    const { category, duration, title, content, participants } = postData;

    return (
        <div>
            <div className='relative flex items-center justify-end border-b border-neutral-300 p-3 md:p-4 mx-3 md:mx-4'>
                <p className='main-text mr-1.5'>
                    지금까지 {participants.length}명이 참여했어요!
                </p>
                <BsThreeDots className='absolute top-2 right-9 z-20 w-4 h-4 flex justify-center items-center text-neutral-100' />
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
                    </div>
                ))}
            </div>
            <ul>
                {participants.slice(0, 3).map((participant, index) => (
                    <li
                        key={participant.nickname}
                        className='flex p-3 md:p-4 gap-3 md:gap-4'
                    >
                        {participant.userImg ? (
                            <img
                                src={participant.userImg}
                                alt={`${participant.nickname} 프로필 사진`}
                                className='w-8 h-8 object-cover rounded-full'
                            />
                        ) : (
                            <img
                                src='../../../assets/images/pic_1.svg'
                                alt={`${participant.nickname} 프로필 사진`}
                                className='w-8 h-8 object-cover rounded-full'
                            />
                        )}
                        <div className='flex-1 main-text p-2 md:p-3'>
                            <span>{participant.nickname}</span>
                            <span>{content}</span>
                        </div>
                    </li>
                ))}
                <li className='flex p-3 md:p-4 gap-3 md:gap-4'>
                    <img
                        src={postData.userImg}
                        alt={`내 프로필`}
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <input
                        className='input-field w-[50%]'
                        placeholder='댓글을 입력하세요'
                    ></input>
                </li>
            </ul>
        </div>
    );
};

export default ChallengeComments;
