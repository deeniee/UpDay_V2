import React from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import ChallengeActions from './ChallengeActions';

const PostForm = ({
    formData,
    setFormData,
    onSubmit,
    onCancel,
    isCreateMode,
    isEditMode,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className='relative flex flex-col md:flex-row'>
            <div className='card drop-shadow-none bg-neutral-200 dark:bg-neutral-600 w-auto aspect-[5/3] md:w-[40%] md:max-w-[420px] md:self-start md:aspect-square m-3 md:m-4'>
                <label
                    htmlFor='file-upload'
                    className='flex items-center justify-center cursor-pointer w-full h-full'
                >
                    {!formData ? (
                        <img
                            src='../../../assets/'
                            alt='challengeImg'
                            className='w-full p-4 aspect-[5/3] md:aspect-square'
                        />
                    ) : (
                        <p className='w-full h-full flex items-center justify-center font-medium text-neutral-500 dark:text-neutral-300'>
                            이미지 업로드
                        </p>
                    )}
                </label>

                <input
                    id='file-upload'
                    type='file'
                    accept='image/*'
                    name='clgImg'
                    onChange={handleChange}
                    className='hidden'
                />
            </div>
            <div className='flex flex-col w-auto md:w-[60%] justify-between m-3 my-0 md:m-4 md:ml-0'>
                <div className='flex flex-col gap-3 md:gap-4 mb-5'>
                    <div className='flex items-center gap-3 md:gap-4'>
                        <div className='relative'>
                            <select
                                className='input-field w-[70px] md:w-[82px] appearance-none font-semibold'
                                value={formData.category}
                                name='category'
                                onChange={handleChange}
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
                                name='duration'
                                onChange={handleChange}
                            >
                                <option value=''>목표기간</option>
                                <option value='1개월'>1개월</option>
                                <option value='2개월'>2개월</option>
                                <option value='3개월'>3개월</option>
                                <option value='6개월'>6개월</option>
                            </select>
                            <FaChevronDown className='absolute top-2.5 right-1.5 md:top-[10px] md:right-2 text-neutral-700 size-2.5 md:size-3' />
                        </div>
                    </div>
                    <label
                        htmlFor='challengeTitle'
                        className='main-text font-medium text-neutral-700 dark:text-neutral-300 -mb-1.5 md:-mb-2'
                    >
                        챌린지 이름
                    </label>
                    <input
                        id='challengeTitle'
                        type='text'
                        className='input-field'
                        value={formData.title}
                        name='title'
                        onChange={handleChange}
                        placeholder='주요 키워드를 포함해 작성해보세요 :)'
                    />
                    <label
                        htmlFor='challengeContent'
                        className='main-text font-medium text-neutral-700 dark:text-neutral-300 -mb-1.5 md:-mb-2'
                    >
                        챌린지 설명
                    </label>
                    <textarea
                        id='challengeContent'
                        rows={5}
                        value={formData.content}
                        name='content'
                        onChange={handleChange}
                        className='textarea-field'
                        placeholder='어떤 목표를 이루고 싶나요? 간단하고 구체적으로 250자 이내로 적어보세요 :)'
                    />
                </div>

                <ChallengeActions
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    isCreateMode={isCreateMode}
                    isEditMode={isEditMode}
                />
            </div>
        </section>
    );
};
export default PostForm;
