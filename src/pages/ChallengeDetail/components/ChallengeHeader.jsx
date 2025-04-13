import React from 'react';
import { format } from 'date-fns';
import { getCategoryIcon } from '../../../utils/categoryList';

import ChangeAction from './ChangeAction';

const ChallengeHeader = ({
    postData = {},
    formData,
    setFormData,
    isCreateMode,
    isEditMode,
    onChange,
    onEdit,
    onDelete,
}) => {
    const isMyPost = postData.authorId === localStorage.getItem('loggedInUser');

    return (
        <div className='flex flex-col gap-1.5 md:gap-2'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1.5 md:gap-2'>
                    <img
                        src={getCategoryIcon(postData.category)}
                        alt={postData.category}
                        className='w-6 md:w-7'
                    />
                    <div className='badge'>{postData.category}</div>
                    <span className='main-text font-semibold text-neutral-600 dark:text-neutral-300 whitespace-nowrap'>
                        {postData.duration}
                    </span>
                </div>
                <ChangeAction
                    isMine={isMyPost}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
            <div className='w-full'>
                <h1 className='title inline-flex'>{postData.title}</h1>
            </div>
        </div>
    );
};

export default ChallengeHeader;
