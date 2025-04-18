import React, { useState, useEffect } from 'react';
import { IoBookmarks, IoHeart, IoShareSocial } from 'react-icons/io5';

export default function ChallengeActions({
    id,
    participants,
    scrapCount: initialScrapCount,
    likesCount: initialLikesCount,
    onSubmit,
    onCancel,
    isCreateMode,
    isEditMode,
}) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [userPreferred, setUserPreferred] = useState(() => {
        const stored = localStorage.getItem('myPreferredClg');
        return stored
            ? JSON.parse(stored)
            : {
                  userId: loggedInUser,
                  likedChallengeIds: [1, 3, 7, 16, 18],
                  scrappedChallengeIds: [6, 8, 10],
              };
    });

    const [likesCount, setLikesCount] = useState(() => {
        const storedLikes = localStorage.getItem(`post no.${id} likesCounts`);
        return storedLikes
            ? (JSON.parse(storedLikes)[id] ?? initialLikesCount)
            : initialLikesCount;
    });

    const [scrapCount, setScrapCount] = useState(() => {
        const storedLikes = localStorage.getItem(`post no.${id} scrapedCounts`);
        return storedLikes
            ? (JSON.parse(storedLikes)[id] ?? initialScrapCount)
            : initialScrapCount;
    });
    const [isLiked, setIsLiked] = useState(() =>
        userPreferred.likedChallengeIds.includes(id)
    );
    const [isScrapped, setIsScrapped] = useState(() =>
        userPreferred.scrappedChallengeIds.includes(id)
    );

    useEffect(() => {
        localStorage.setItem('myPreferredClg', JSON.stringify(userPreferred));
    }, [userPreferred]);

    useEffect(() => {
        setIsLiked(userPreferred.likedChallengeIds.includes(id));
        setIsScrapped(userPreferred.scrappedChallengeIds.includes(id));
    }, [userPreferred, id]);

    const isUserJoined = participants?.some(
        (participant) =>
            participant.userId === loggedInUser && participant.clgJoin === true
    );

    const toggleLikedChallenge = (challengeId) => {
        const isLiked = userPreferred.likedChallengeIds.includes(challengeId);

        const updatedLikedIds = isLiked
            ? userPreferred.likedChallengeIds.filter((id) => id !== challengeId)
            : [...userPreferred.likedChallengeIds, challengeId];

        setUserPreferred((prev) => ({
            ...prev,
            likedChallengeIds: updatedLikedIds,
        }));

        const newCount = isLiked ? likesCount - 1 : likesCount + 1;
        setLikesCount(newCount);

        const storedLikes =
            JSON.parse(localStorage.getItem(`post no.${id} likesCounts`)) || {};
        const updatedLikes = {
            ...storedLikes,
            [challengeId]: newCount,
        };
        localStorage.setItem(
            `post no.${id} likesCounts`,
            JSON.stringify(updatedLikes)
        );
    };

    const toggleScrappedChallenge = (challengeId) => {
        const isScrapped =
            userPreferred.scrappedChallengeIds.includes(challengeId);

        const updatedScrappedIds = isScrapped
            ? userPreferred.scrappedChallengeIds.filter(
                  (id) => id !== challengeId
              )
            : [...userPreferred.scrappedChallengeIds, challengeId];

        setUserPreferred((prev) => ({
            ...prev,
            scrappedChallengeIds: updatedScrappedIds,
        }));

        const newCount = isScrapped ? scrapCount - 1 : scrapCount + 1;
        setScrapCount(newCount);

        const storedScraps =
            JSON.parse(localStorage.getItem(`post no.${id} scrapedCounts`)) ||
            {};
        const updatedScraps = {
            ...storedScraps,
            [challengeId]: newCount,
        };
        localStorage.setItem(
            `post no.${id} scrapedCounts`,
            JSON.stringify(updatedScraps)
        );
    };

    return (
        <>
            {isCreateMode || isEditMode ? (
                <section className='flex justify-center gap-3 md:gap-4 mb-3 md:mb-0'>
                    <button
                        className='btn btn-negative w-[30%] md:max-w-[240px]'
                        onClick={onCancel}
                    >
                        취소하기
                    </button>
                    <button
                        className='btn btn-primary w-[30%]'
                        onClick={onSubmit}
                    >
                        저장하기
                    </button>
                </section>
            ) : (
                <section className='flex justify-between'>
                    <div className='flex justify-center items-center w-[30%] md:max-w-[240px]'>
                        <button
                            className={`btn btn-primary w-full ${isUserJoined ? 'hidden' : ''}`}
                        >
                            참여하기
                        </button>
                    </div>
                    <div className='flex gap-1.5 md:gap-2'>
                        <button
                            onClick={() => toggleScrappedChallenge(id)}
                            className={`btn ${isScrapped ? 'btn-action-active' : 'btn-action'} flex gap-1.5 md:gap-2`}
                        >
                            <IoBookmarks className='size-5' />
                            <span className='main-text text-neutral-900 dark:text-neutral-100 font-semibold'>
                                {scrapCount}
                            </span>
                        </button>
                        <button
                            onClick={() => toggleLikedChallenge(id)}
                            className={`btn ${isLiked ? 'btn-action-active' : 'btn-action'} flex gap-1.5 md:gap-2`}
                        >
                            <IoHeart className='size-5' />
                            <span className='main-text text-neutral-900 dark:text-neutral-100 font-semibold'>
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
