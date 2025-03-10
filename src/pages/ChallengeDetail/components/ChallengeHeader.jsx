import React from 'react';
import { format } from 'date-fns';
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

    const formattedDate = format(postDate, 'yyyy.MM.dd');

    return (
        <div className='flex items-center gap-1'>
            <img
                src={getCategoryIcon(category)}
                alt={category}
                className='w-7 md:w-8'
            />
            <div className='badge-lg'>{category}</div>
            <span className='title whitespace-nowrap'>{title}</span>
        </div>
    );
};

export default ChallengeHeader;
