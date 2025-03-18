import React from 'react';
import { format } from 'date-fns';
import { calcPassedDate } from '../../../utils/calcDate';
import { getCategoryIcon } from '../../../utils/categoryList';
import { getAuthorData } from '../../../utils/getUserData';
import { calcActiveDays } from '../../../utils/calcDate';
import { IoBookmarks, IoHeart } from 'react-icons/io5';

const ChallengeHeader = ({ postData }) => {
    const { category, duration, title, authorId, postDate } = postData;

    const formattedDate = format(postDate, 'yyyy.MM.dd');

    return (
        <div className='flex flex-col gap-1.5 md:gap-2'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1.5 md:gap-2'>
                    <img
                        src={getCategoryIcon(category)}
                        alt={category}
                        className='w-6 md:w-7'
                    />
                    <div className='badge'>{category}</div>

                    <span className='main-text font-semibold text-neutral-600 whitespace-nowrap'>
                        {duration}
                    </span>
                </div>
                <div className='flex justify-end items-center gap-2 mt-2 md:mt-0'>
                    <img
                        src={getAuthorData(authorId).userImg}
                        alt={`${getAuthorData(authorId).nickname} 프로필 사진`}
                        className='w-6 md:w-7 aspect-square object-cover rounded-full'
                    />
                    <span className='main-text'>
                        {getAuthorData(authorId).nickname}
                    </span>
                </div>
            </div>
            <div className='flex justify-between'>
                <h1 className='title inline-flex'>{title}</h1>
            </div>
        </div>
    );
};

export default ChallengeHeader;
