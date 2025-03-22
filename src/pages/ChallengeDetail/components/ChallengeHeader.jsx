import React from 'react';
import { format } from 'date-fns';
import { getCategoryIcon } from '../../../utils/categoryList';
import { FaPenToSquare } from 'react-icons/fa6';
import { TiDelete } from 'react-icons/ti';

const ChallengeHeader = ({
    postData = {},
    setFormData,
    isCreateMode,
    isEditMode,
    onChange,
    onDelete,
}) => {
    const { category, duration, title, authorId, postDate } = postData;

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
                <div className='flex items-center md:mr-1 gap-1.5 md:gap-2 sub-text text-neutral-500'>
                    <button className='flex items-center gap-0.5 md:gap-1 transition hover:text-neutral-800'>
                        <FaPenToSquare
                            className='size-2.5 md:size-3'
                            onChange={onChange}
                        />
                        수정
                    </button>

                    <button className='flex items-center md:gap-0.5 transition text-red-300 hover:text-red-500'>
                        <TiDelete
                            className='size-3.5 md:size-[18px]'
                            onDelete={onDelete}
                        />
                        삭제
                    </button>
                </div>
            </div>
            <div className='flex justify-between'>
                <h1 className='title inline-flex'>{title}</h1>
            </div>
        </div>
    );
};

export default ChallengeHeader;
