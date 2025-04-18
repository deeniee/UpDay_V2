import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUserImages } from '../../../utils/useUserImages';
import { getCurrentUserData } from '../../../utils/localStorage';
import ChangeAction from './ChangeAction';

const ChallengeComments = ({ postData }) => {
    const { id, participants } = postData;
    const updatedParticipants = useUserImages(participants);
    const joinedChallenges = useSelector(
        (state) => state.userChallenge.joinedChallenges
    );
    const isJoined = joinedChallenges.some((c) => c.id === id);
    const currentUser = getCurrentUserData();
    const [commentInput, setCommentInput] = useState('');
    const [commentList, setCommentList] = useState([]);
    const loadCommentsFromStorage = () => {
        try {
            const saved = JSON.parse(
                localStorage.getItem('myComments') || '[]'
            );
            return Array.isArray(saved) ? saved : [];
        } catch (e) {
            console.error('댓글 파싱 에러:', e);
            return [];
        }
    };

    const savedComments = loadCommentsFromStorage();
    const hasMyComment = commentList.some(
        (c) => c.userId === currentUser.userId
    );

    useEffect(() => {
        const filtered = savedComments.filter((c) => c.postId === postData.id);
        setCommentList(filtered);
    }, [savedComments, postData.id]);

    const updateAllCommentsStorage = (updatedCurrentComments) => {
        const otherComments = savedComments.filter(
            (c) => c.postId !== postData.id || c.userId !== currentUser.userId
        );
        const merged = [...otherComments, ...updatedCurrentComments];
        localStorage.setItem('myComments', JSON.stringify(merged));
    };

    const handleSubmit = () => {
        if (!commentInput.trim()) return;

        const newComment = {
            postId: postData.id,
            userId: currentUser.userId,
            nickname: currentUser.nickname,
            userImg: currentUser.userImg,
            content: commentInput.trim(),
            isEditing: false,
        };

        const updatedCommentList = [newComment, ...commentList];
        setCommentList(updatedCommentList);
        updateAllCommentsStorage(updatedCommentList);
        setCommentInput('');
    };

    const handleEditToggle = (index) => {
        const updatedList = commentList.map((comment, i) => ({
            ...comment,
            isEditing: i === index ? !comment.isEditing : false,
        }));
        setCommentList(updatedList);
        updateAllCommentsStorage(updatedList);
    };

    const handleEditInput = (e, index) => {
        const value = e.target.value;
        const updatedList = commentList.map((comment, i) =>
            i === index ? { ...comment, content: value } : comment
        );
        setCommentList(updatedList);
    };

    const handleSaveEditedComment = (index) => {
        const updatedList = commentList.map((comment, i) => ({
            ...comment,
            isEditing: false,
        }));
        setCommentList(updatedList);
        updateAllCommentsStorage(updatedList);
    };

    const handleDeleteComment = (index) => {
        const updatedCommentList = commentList.filter((_, i) => i !== index);
        setCommentList(updatedCommentList);
        updateAllCommentsStorage(updatedCommentList);
    };

    const renderParticipantsPreview = () => (
        <div className='relative flex items-center justify-end border-b border-neutral-300 pb-3 md:pb-4 mx-3 md:mx-4'>
            {participants.length === 0 ? (
                <p className='main-text py-1 md:py-1.5'>
                    이 챌린지의 첫 주인공이 되어보세요!
                </p>
            ) : (
                <>
                    <p className='main-text mr-1.5'>
                        지금까지 {participants.length}명이 참여했어요!
                    </p>
                    {updatedParticipants.slice(0, 3).map((p, idx) => (
                        <div
                            key={idx}
                            className='w-auto blur-[0.3px]'
                            style={{
                                zIndex: participants.length - idx,
                                marginLeft: idx === 0 ? 0 : -14,
                            }}
                        >
                            <img
                                src={p.userImg}
                                alt={`${p.nickname} 프로필 사진`}
                                className='w-7 md:w-8 aspect-square object-cover rounded-full bg-neutral-100 drop-shadow-sm'
                            />
                        </div>
                    ))}
                </>
            )}
        </div>
    );

    const renderParticipantReviews = () =>
        updatedParticipants.slice(4, 7).map((participant) => (
            <li
                key={participant.nickname}
                className='flex items-start gap-3 md:gap-4 px-3 py-1.5 md:px-4 md:py-2'
            >
                <img
                    src={participant.userImg}
                    alt={`${participant.nickname} 프로필 사진`}
                    className='w-10 h-10 md:w-11 md:w-11 aspect-square object-cover rounded-full bg-neutral-200 drop-shadow-sm'
                />
                <div className='flex flex-col flex-1 main-text gap-1.5 md:gap-2'>
                    <span className='font-semibold'>
                        {participant.nickname}
                    </span>
                    <p className='flex items-center h-[30px] md:h-[34px]'></p>
                </div>
            </li>
        ));

    const renderCommentItem = (comment, idx) => (
        <li
            key={idx}
            className='flex gap-3 md:gap-4 px-3 py-1.5 md:px-4 md:py-2'
        >
            <img
                src={comment.userImg}
                alt={`${comment.nickname} 프로필 사진`}
                className='w-10 h-10 md:w-11 md:h-11 aspect-square object-cover rounded-full bg-neutral-200 drop-shadow-sm'
            />
            <div className='flex flex-col flex-1 main-text gap-0.5 md:gap-1'>
                <div className='flex w-full justify-between'>
                    <span className='font-semibold'>{comment.nickname}</span>
                    {comment.userId === currentUser.userId && (
                        <ChangeAction
                            onEdit={() => handleEditToggle(idx)}
                            onDelete={() => handleDeleteComment(idx)}
                            isEditing={comment.isEditing}
                        />
                    )}
                </div>
                {comment.isEditing ? (
                    <div className='flex gap-3 md:gap-4'>
                        <input
                            className='input-field flex-1'
                            value={comment.content}
                            onChange={(e) => handleEditInput(e, idx)}
                        />
                        <button
                            className='btn btn-primary w-24 md:w-28'
                            onClick={() => handleSaveEditedComment(idx)}
                            disabled={!comment.content.trim()}
                        >
                            저장하기
                        </button>
                    </div>
                ) : (
                    <p className='flex items-center h-[30px] md:h-[34px]'>
                        {comment.content}
                    </p>
                )}
            </div>
        </li>
    );

    const renderCommentForm = () =>
        currentUser &&
        !hasMyComment && (
            <li className='flex items-start gap-3 md:gap-4 px-3 py-1.5 md:px-4 md:py-2'>
                <img
                    src={currentUser.userImg}
                    alt='유저 프로필'
                    className='w-10 md:w-11 aspect-square object-cover rounded-full bg-neutral-200 drop-shadow-sm'
                />
                <div className='flex flex-col flex-1 main-text gap-1.5 md:gap-2'>
                    <span className='font-semibold'>
                        {currentUser.nickname}
                    </span>
                    <div className='flex gap-3 md:gap-4'>
                        <input
                            className='input-field flex-1'
                            placeholder={
                                isJoined
                                    ? '내 경험을 다른 사용자와 공유해보세요 :)'
                                    : '챌린지에 참여해야 후기를 남길 수 있어요.'
                            }
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            disabled={!isJoined}
                        />
                        <button
                            className='btn btn-primary w-24 md:w-28'
                            onClick={handleSubmit}
                            disabled={!commentInput.trim() || !isJoined}
                        >
                            등록하기
                        </button>
                    </div>
                </div>
            </li>
        );

    return (
        <section>
            {renderParticipantsPreview()}
            {participants.length > 1 && (
                <ul className='py-3 md:py-4'>
                    <p className='title px-3 py-1.5 md:px-4 md:py-2'>
                        참여자 후기
                    </p>
                    {renderParticipantReviews()}
                    {commentList.map(renderCommentItem)}
                    {renderCommentForm()}
                </ul>
            )}
        </section>
    );
};

export default ChallengeComments;
