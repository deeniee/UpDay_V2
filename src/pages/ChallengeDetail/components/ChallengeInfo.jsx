import React from 'react';
import { getCategoryIllust } from '../../../utils/categoryList';
import { getAuthorData } from '../../../utils/getUserData';

import ChallengeHeader from './ChallengeHeader';
import ChallengeActions from './ChallengeActions';

const ChallengeInfo = ({
    postData,
    formData,
    setFormData,
    isCreateMode,
    isEditMode,
    onChange,
    onEdit,
    onDelete,
}) => {
    return (
        <section className='relative flex flex-col md:flex-row'>
            <div className='card bg-neutral-300 dark:bg-neutral-700 w-auto aspect-[5/3] md:w-[40%] md:max-w-[420px] md:self-start md:aspect-square m-3 md:m-4'>
                {isCreateMode ? (
                    <img
                        src='../../../assets/'
                        alt={'사용자가 업로드'}
                        className='w-full p-4 aspect-[5/3] md:aspect-square'
                        onChange={onChange}
                    />
                ) : (
                    <img
                        src={getCategoryIllust(postData?.category)}
                        alt={postData?.category}
                        className='w-full p-4 aspect-[5/3] md:aspect-square'
                    />
                )}
            </div>
            <div className='flex flex-col w-auto md:w-[60%] justify-between m-3 my-0 md:m-4 md:ml-0'>
                <div className='flex flex-col gap-3 mb-5'>
                    <ChallengeHeader
                        postData={postData}
                        formData={formData}
                        setFormData={setFormData}
                        isCreateMode={isCreateMode}
                        isEditMode={isEditMode}
                        onChange={onChange}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                    {isCreateMode || isEditMode ? (
                        <>
                            <label
                                htmlFor='challengeContent'
                                className='main-text font-semibold text-neutral-700 -mb-2'
                            >
                                챌린지 설명
                            </label>
                            <textarea
                                id='challengeContent'
                                name='challengeContent'
                                rows={5}
                                value={formData.content}
                                className='textarea-field'
                                placeholder='어떤 목표를 이루고 싶나요? 간단하고 구체적으로 250자 이내로 적어보세요 :)'
                            />
                        </>
                    ) : (
                        <p className='main-text overflow-hidden'>
                            {postData?.content}
                        </p>
                    )}
                    <div className='flex justify-end items-center gap-2 mt-2 md:mt-0'>
                        {!isCreateMode && (
                            <>
                                <img
                                    src={
                                        getAuthorData(postData?.authorId)
                                            .userImg
                                    }
                                    alt={`${getAuthorData(postData?.authorId).nickname} 프로필 사진`}
                                    className='w-6 md:w-7 aspect-square object-cover rounded-full'
                                />
                                <span className='main-text'>
                                    {getAuthorData(postData?.authorId).nickname}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <ChallengeActions
                    participants={postData?.participants}
                    scrapCount={postData?.scrapCount}
                    likesCount={postData?.likesCount}
                    isCreateMode={isCreateMode}
                    isEditMode={isEditMode}
                    onSubmit={onChange}
                />
            </div>
        </section>
    );
};
export default ChallengeInfo;
