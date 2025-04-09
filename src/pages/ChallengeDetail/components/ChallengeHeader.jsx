import React from 'react';
import { format } from 'date-fns';
import { getCategoryIcon } from '../../../utils/categoryList';
import { FaPenToSquare, FaChevronDown } from 'react-icons/fa6';
import { TiDelete } from 'react-icons/ti';

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
                <div
                    className={`${isMyPost ? '' : 'hidden'} flex items-center md:mr-1 gap-1.5 md:gap-2 main-text`}
                >
                    <button
                        className='flex items-center gap-0.5 md:gap-1 transition text-neutral-500 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100'
                        onClick={onEdit}
                    >
                        <FaPenToSquare className='size-2.5 md:size-3' />
                        수정
                    </button>

                    <button
                        className='flex items-center md:gap-0.5 transition text-red-300 hover:text-red-500 dark:hover:text-red-400'
                        onClick={onDelete}
                    >
                        <TiDelete className='size-3.5 md:size-[18px]' />
                        삭제
                    </button>
                </div>
            </div>
            <div className='w-full'>
                <h1 className='title inline-flex'>{postData.title}</h1>
            </div>
        </div>
    );
};

export default ChallengeHeader;
