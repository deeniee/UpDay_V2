import React from 'react';
import { format } from 'date-fns';
import { getCategoryIllust } from '../../../utils/categoryList';
import { calcDate } from '../../../utils/calcDate';
import ChallengeHeader from './ChallengeHeader';

import { BsDot } from 'react-icons/bs';
import { IoBookmarks, IoHeart } from 'react-icons/io5';

const ChallengeInfo = ({ postData }) => {
    const {
        id,
        category,
        duration,
        title,
        content,
        userImg,
        nickname,
        postDate,
        postClicked,
        scrapCount,
        likesCount,
        authorId,
        clgJoin,
    } = postData;

    const getDateCount = calcDate(postDate);
    const formattedDate = format(postDate, 'yyyy.MM.dd');

    return (
        <section className='flex flex-col md:flex-row gap-4'>
            <div className='relative card w-full aspect-[5/3] md:w-[40%] md:max-w-[480px] md:aspect-square'>
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
            <div className='w-full md:w-[60%] flex flex-col gap-4'>
                <ChallengeHeader postData={postData} />
                <p className='main-text'>{content}</p>
                <p className='main-text'>ai 추천 멘트</p>
                <div className='flex items-center gap-2'>
                    <img
                        src={userImg}
                        alt={`${nickname}프로필 이미지`}
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <span className='main-text'>{nickname}</span>
                    <span>해당유저 달성율</span>
                </div>
            </div>
        </section>
    );
};
export default ChallengeInfo;
