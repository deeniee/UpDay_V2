import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGemini from '../components/useGemini';
import { useUserImages } from '../../../utils/useUserImages';
import { getCurrentUserData } from '../../../utils/localStorage';
import ChangeAction from './ChangeAction';

const ChallengeComments = ({ postData, onEdit, onDelete }) => {
    const { id, participants } = postData;
    const updatedParticipants = useUserImages(participants);
    const joinedChallenges = useSelector(
        (state) => state.userChallenge.joinedChallenges
    );
    const isJoined = joinedChallenges.some((c) => c.id === postData.id);
    const [mode, setMode] = useState('');
    const editMode = mode === 'edit';
    const [commentInput, setCommentInput] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [commentData, setCommentData] = useState({
        userId: '',
        userImg: '',
        duration: '',
        content: commentInput,
    });
    const currentUser = getCurrentUserData();
    const isMyComment = commentList.some(
        (c) => c.userId === currentUser.userId
    );

    const handleSubmit = () => {
        if (!commentInput.trim()) return;

        const newComment = {
            userId: currentUser.userId,
            nickname: currentUser.nickname,
            userImg: currentUser.userImg,
            content: commentInput.trim(),
        };

        setCommentList((prev) => [newComment, ...prev]);
        setCommentInput('');
    };

    const handleEditComment = () => {
        setMode('edit');
        setCommentData({
            userId: isMyComment.userId,
            nickname: isMyComment.nickname,
            userImg: isMyComment.userImg,
            content: isMyComment.content || [],
        });
    };

    useEffect(() => {}, [commentList]);

    return (
        <section>
            <div className='relative flex items-center justify-end border-b border-neutral-300 pb-3 md:pb-4 mx-3 md:mx-4'>
                {participants.length === 0 ? (
                    <p className='main-text py-1 md:py-1.5'>
                        이 챌린지의 첫 주인공이 되어보세요!
                    </p>
                ) : (
                    <>
                        <p className='main-text mr-1.5 '>
                            지금까지 {participants.length}명이 참여했어요!
                        </p>

                        {updatedParticipants
                            .slice(0, 3)
                            .map((participant, index) => (
                                <div
                                    key={index}
                                    className='w-auto blur-[0.3px]'
                                    style={{
                                        zIndex: participants.length - index, // index가 클수록 z-index가 낮아지도록 설정
                                        marginLeft: index === 0 ? 0 : -14, // index가 커질수록 왼쪽 여백이 증가
                                    }}
                                >
                                    <img
                                        src={participant.userImg}
                                        alt={`${participant.nickname} 프로필 사진`}
                                        className='w-7 md:w-8 aspect-square object-cover rounded-full bg-neutral-100 drop-shadow-sm'
                                    />
                                </div>
                            ))}
                    </>
                )}
            </div>
            {participants.length === 1 ? null : (
                <ul className='py-3 md:py-4'>
                    <span className='title p-3 md:p-4'>참여자 후기</span>

                    {/* 기존 참여자 일부 출력 */}
                    {updatedParticipants
                        .slice(4, 8)
                        .map((participant, index) => (
                            <li
                                key={participant.nickname}
                                className='flex gap-3 md:gap-4 p-3 pb-0 md:p-4 md:pb-0'
                            >
                                <img
                                    src={participant.userImg}
                                    alt={`${participant.nickname} 프로필 사진`}
                                    className='w-10 md:w-11 aspect-square object-cover rounded-full bg-neutral-200 drop-shadow-sm'
                                />
                                <div className='flex flex-col flex-1 main-text gap-1.5 md:gap-2'>
                                    <span className='font-semibold'>
                                        {participant.nickname}
                                    </span>
                                </div>
                            </li>
                        ))}

                    {/* 추가된 댓글 리스트 */}
                    {commentList.map((comment, idx) => (
                        <li
                            key={idx}
                            className='flex gap-3 md:gap-4 p-3 pb-0 md:p-4 md:pb-0'
                        >
                            <img
                                src={comment.userImg}
                                alt={`${comment.nickname} 프로필 사진`}
                                className='w-10 h-10 md:w-11 md:h-11 aspect-square object-cover rounded-full bg-neutral-200 drop-shadow-sm'
                            />
                            <div className='flex flex-col flex-1 main-text gap-1.5 md:gap-2'>
                                <div className='flex w-full justify-between'>
                                    <span className='font-semibold'>
                                        {comment.nickname}
                                    </span>
                                    <ChangeAction
                                        isMine={isMyComment}
                                        onEdit={handleEditComment}
                                        onDelete={onDelete}
                                        className={`${editMode ? 'hidden' : ''}`}
                                    />
                                </div>
                                {editMode ? (
                                    <input
                                        className='input-field h-[30px] md:h-[34px] flex-1'
                                        placeholder={
                                            isJoined
                                                ? '내 경험을 다른 사용자와 공유해보세요 :)'
                                                : '챌린지에 참여해야 후기를 남길 수 있어요.'
                                        }
                                        value={commentInput}
                                        onChange={(e) =>
                                            setCommentInput(e.target.value)
                                        }
                                        disabled={!isJoined}
                                    />
                                ) : (
                                    <p
                                        className='h-[30px] md:h-[34px] flex-1'
                                        placeholder={
                                            isJoined
                                                ? '내 경험을 다른 사용자와 공유해보세요 :)'
                                                : '챌린지에 참여해야 후기를 남길 수 있어요.'
                                        }
                                        value={commentInput}
                                        onChange={(e) =>
                                            setCommentInput(e.target.value)
                                        }
                                        disabled={!isJoined}
                                    />
                                )}
                            </div>
                        </li>
                    ))}

                    {/* 댓글 입력창 */}
                    {currentUser && (
                        <li
                            className={`${isMyComment ? 'hidden' : ''} flex items-center p-3 pb-0 md:p-4 md:pb-0 gap-3 md:gap-4`}
                        >
                            <img
                                src={currentUser.userImg}
                                alt={`유저 프로필`}
                                className='w-10 md:w-11 aspect-square object-cover rounded-full bg-neutral-200 drop-shadow-sm'
                            />

                            <input
                                className='input-field h-[30px] md:h-[34px] flex-1'
                                placeholder={
                                    isJoined
                                        ? '내 경험을 다른 사용자와 공유해보세요 :)'
                                        : '챌린지에 참여해야 후기를 남길 수 있어요.'
                                }
                                value={commentInput}
                                onChange={(e) =>
                                    setCommentInput(e.target.value)
                                }
                                disabled={!isJoined}
                            />
                            <button
                                className='btn btn-primary w-24 md:w-28'
                                onClick={handleSubmit}
                                disabled={!commentInput.trim() || !isJoined}
                            >
                                등록하기
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </section>
    );
};

export default ChallengeComments;
