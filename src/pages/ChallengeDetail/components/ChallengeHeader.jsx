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
    onDelete,
}) => {
    const isMyPost = postData.authorId === localStorage.getItem('loggedInUser');
    return (
        <div className='flex flex-col gap-1.5 md:gap-2'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1.5 md:gap-2'>
                    {isCreateMode || isEditMode ? (
                        <>
                            <div className='relative'>
                                <select
                                    className='input-field w-[70px] md:w-[82px] appearance-none font-semibold'
                                    value={formData.category}
                                    onChange={onChange}
                                >
                                    <option value=''>카테고리</option>
                                    <option value='습관'>습관</option>
                                    <option value='건강'>건강</option>
                                    <option value='학습'>학습</option>
                                    <option value='기타'>기타</option>
                                </select>
                                <FaChevronDown className='absolute top-2.5 right-1.5 md:top-[10px] md:right-2 text-neutral-700 size-2.5 md:size-3' />
                            </div>
                            <div className='relative'>
                                <select
                                    className='input-field w-[70px] md:w-[82px] appearance-none font-semibold'
                                    value={formData.duration}
                                    onChange={onChange}
                                >
                                    <option value=''>목표기간</option>
                                    <option value='1개월'>1개월</option>
                                    <option value='2개월'>2개월</option>
                                    <option value='3개월'>3개월</option>
                                    <option value='6개월'>6개월</option>
                                </select>
                                <FaChevronDown className='absolute top-2.5 right-1.5 md:top-[10px] md:right-2 text-neutral-700 size-2.5 md:size-3' />
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                src={getCategoryIcon(postData.category)}
                                alt={postData.category}
                                className='w-6 md:w-7'
                            />
                            <div className='badge'>{postData.category}</div>
                            <span className='main-text font-semibold text-neutral-600 whitespace-nowrap'>
                                {postData.duration}
                            </span>
                        </>
                    )}
                </div>
                <div
                    className={`${isMyPost ? '' : 'hidden'} flex items-center md:mr-1 gap-1.5 md:gap-2 sub-text text-neutral-500`}
                >
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
            <div className='w-full'>
                {isCreateMode || isEditMode ? (
                    <div className='flex flex-col gap-1'>
                        <label
                            htmlFor='challengeTitle'
                            className='main-text font-semibold text-neutral-700'
                        >
                            챌린지 이름
                        </label>
                        <input
                            id='challengeTitle'
                            type='text'
                            className='input-field'
                            value={formData.title}
                            placeholder='주요 키워드를 포함해 작성해보세요 :)'
                        />
                    </div>
                ) : (
                    <h1 className='title inline-flex'>{postData.title}</h1>
                )}
            </div>
        </div>
    );
};

export default ChallengeHeader;
