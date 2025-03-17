import React from 'react';
import { format } from 'date-fns';
import { calcPassedDate } from '../../../utils/calcDate';
import { getCategoryIcon } from '../../../utils/categoryList';
import { getAuthorData } from '../../../utils/getUserData';
import { calcActiveDays } from '../../../utils/calcDate';
import { IoBookmarks, IoHeart } from 'react-icons/io5';

const ChallengeHeader = ({ postData }) => {
    const {
        category,
        duration,
        title,
        postDate,
        postClicked,
        scrapCount,
        likesCount,
    } = postData;

    const formattedDate = format(postDate, 'yyyy.MM.dd');

    return (
        <div className='flex flex-col gap-1.5 md:gap-2'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1.5 md:gap-2'>
                    <img
                        src={getCategoryIcon(category)}
                        alt={category}
                        className='w-5 md:w-6'
                    />
                    <div className='badge'>{category}</div>

                    <span className='main-text font-semibold text-neutral-600 whitespace-nowrap'>
                        {duration}
                    </span>
                </div>
                <div className='main-text flex items-center gap-1 md:gap-1.5'>
                    <div className='flex items-center gap-0.5 md:gap-1'>
                        <IoBookmarks className='text-point-500 ' />
                        {scrapCount}
                    </div>

                    <div className='flex items-center gap-0.5 md:gap-1'>
                        <IoHeart className='text-point-500 size-3.5' />
                        {likesCount}
                    </div>
                </div>
            </div>
            <div className='flex justify-between'>
                <h1 className='title inline-flex'>{title}</h1>
            </div>
        </div>
    );
};

export default ChallengeHeader;
