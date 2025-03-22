import React from 'react';
import {
    IoBookmarks,
    IoBookmarksOutline,
    IoHeart,
    IoHeartOutline,
    IoShareSocial,
} from 'react-icons/io5';
export default function ChallengeActions({
    scrapCount,
    likesCount,
    isCreateMode,
    isEditMode,
    onSubmit,
}) {
    return (
        <>
            {isCreateMode || isEditMode ? (
                <section className='flex justify-center gap-3 md:gap-4 mb-3 md:mb-0'>
                    <button className='btn btn-negative w-[30%] md:max-w-[240px]'>
                        취소하기
                    </button>
                    <button className='btn btn-primary w-[30%]'>
                        저장하기
                    </button>
                </section>
            ) : (
                <section className='flex justify-between'>
                    <div className='flex justify-center items-center w-[30%] md:max-w-[240px]'>
                        <button className='btn btn-primary w-full'>
                            참여하기
                        </button>
                    </div>
                    <div className='flex gap-1.5 md:gap-2'>
                        <button className='btn btn-action flex gap-1.5 md:gap-2'>
                            <IoBookmarksOutline className='size-5' />
                            <span className='main-text text-neutral-900 font-semibold'>
                                {scrapCount}
                            </span>
                        </button>
                        <button className='btn btn-action flex gap-1.5 md:gap-2'>
                            <IoHeartOutline className='size-5' />
                            <span className='main-text text-neutral-900 font-semibold'>
                                {likesCount}
                            </span>
                        </button>
                        <button className='btn btn-action flex'>
                            <IoShareSocial className='size-5' />
                        </button>
                    </div>
                </section>
            )}
        </>
    );
}
