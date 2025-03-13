import React from 'react';
import { format } from 'date-fns';
import { calcDate } from '../../../utils/calcDate';
import { getCategoryIcon } from '../../../utils/categoryList';

const ChallengeHeader = ({ postData }) => {
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
        <div className='flex flex-col gap-1.5 md:gap-2'>
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

            <div className='main-text'>
                <span className='title whitespace-nowrap'>{title}</span>(
                {getDateCount},{formattedDate})
            </div>
        </div>
    );
};

export default ChallengeHeader;
