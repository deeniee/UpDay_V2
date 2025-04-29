import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IoBookmarks, IoHeart, IoShareSocial } from 'react-icons/io5';
import {
    joinChallenge,
    addChallenge,
} from '../../../store/features/challengeSlice';
import {
    toggleLike,
    toggleScrap,
} from '../../../store/features/userSavedSlice';
import ModalForShare from './ModalForShare';

export default function ChallengeActions({
    postData = {},
    onSubmit,
    onCancel,
    isCreateMode,
    isEditMode,
    isModalOpen,
    isFadingOut,
    openModal,
    closeModal,
}) {
    const { id, likesCount, scrapCount, participants } = postData;
    const dispatch = useDispatch();
    const loggedInUser = localStorage.getItem('loggedInUser');

    const [localLikesCount, setLocalLikesCount] = useState(likesCount);
    const [localScrapCount, setLocalScrapCount] = useState(scrapCount);

    const likedIds = useSelector((state) => state.userSaved.likedIds);
    const [isLiked, setIsLiked] = useState(() => likedIds.includes(id));
    const scrappedIds = useSelector((state) => state.userSaved.scrappedIds);
    const [isScrapped, setIsScrapped] = useState(() =>
        scrappedIds.includes(id)
    );
    const [copied, setCopied] = useState(false);

    const isUserJoined = participants?.some(
        (participant) =>
            participant.userId === loggedInUser && participant.clgJoin === true
    );

    useEffect(() => {
        setLocalLikesCount(likesCount);
        setLocalScrapCount(scrapCount);
    }, [likesCount, scrapCount]);

    // 참여하기 버튼 핸들링
    const handleJoin = (e) => {
        if (loggedInUser) {
            e.stopPropagation(); // 이벤트 전파 중지
            e.preventDefault(); // 기본 동작 방지

            dispatch(joinChallenge({ id, participant: loggedInUser }));
            window.location.reload();
        }
    };

    // 좋아요/스크랩 버튼 핸들링
    const handleToggleLike = () => {
        if (loggedInUser) {
            dispatch(toggleLike({ id: id, isLiked }));
            setIsLiked((prev) => !prev);
            setLocalLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
        }
    };
    const handleToggleScrap = () => {
        if (loggedInUser) {
            dispatch(toggleScrap({ id: id, isScrapped }));
            setIsScrapped((prev) => !prev);
            setLocalScrapCount((prev) => (isScrapped ? prev - 1 : prev + 1));
        }
    };

    // 공유 버튼 핸들링
    const handleShare = async () => {
        openModal();
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500); // 2초 뒤 안내 메시지 제거
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
        }
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
                            type='button'
                            className={`btn btn-primary w-full ${isUserJoined ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={handleJoin}
                        >
                            {isUserJoined ? '참여 중' : '참여하기'}
                        </button>
                    </div>
                    <div className='flex gap-1.5 md:gap-2'>
                        <button
                            onClick={handleToggleScrap}
                            className={`btn ${isScrapped ? 'btn-action-active' : 'btn-action'} flex gap-1.5 md:gap-2`}
                        >
                            <IoBookmarks className='size-5' />
                            <span className='main-text text-neutral-900 dark:text-neutral-100 font-semibold'>
                                {localScrapCount}
                            </span>
                        </button>
                        <button
                            onClick={handleToggleLike}
                            className={`btn ${isLiked ? 'btn-action-active' : 'btn-action'} flex gap-1.5 md:gap-2`}
                        >
                            <IoHeart className='size-5' />
                            <span className='main-text text-neutral-900 dark:text-neutral-100 font-semibold'>
                                {localLikesCount}
                            </span>
                        </button>
                        <div className='relative'>
                            <button
                                className='btn btn-action flex'
                                onClick={handleShare}
                            >
                                <IoShareSocial className='size-5' />
                            </button>
                            {isModalOpen && (
                                <ModalForShare
                                    closeModal={closeModal}
                                    isFadingOut={isFadingOut}
                                />
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
