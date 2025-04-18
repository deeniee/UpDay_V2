import React from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
import { TiDelete } from 'react-icons/ti';

const ChangeAction = ({ onEdit, onDelete, isEditing }) => {
    return (
        <div
            className={`${isEditing ? 'hidden' : ''} flex items-center md:mr-1 gap-1.5 md:gap-2 main-text`}
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
    );
};

export default ChangeAction;
