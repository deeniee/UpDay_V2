import React from 'react';
import {
    IoBookmarks,
    IoBookmarksOutline,
    IoHeart,
    IoHeartOutline,
    IoShareSocial,
} from 'react-icons/io5';
export default function ChallengeActions({ scrapCount, likesCount }) {
    return (
        <section className='flex justify-between'>
            <div className='flex justify-center items-center w-[30%] md:max-w-[420px]'>
                <button className='btn btn-primary w-full'>참여하기</button>
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
    );
}
