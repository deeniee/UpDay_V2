import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getChallenges } from '../../../utils/localStorage';
import {
    addChallenge,
    updateChallenge,
    deleteChallenge,
} from '../../../store/features/challengeSlice';
import { getJoinedChallenge } from '../../../store/features/userChallengeSlice';
import ChallengeInfo from './ChallengeInfo';
import ChallengeComments from './ChallengeComments';

import pic3 from '../../../assets/images/backgrounds/pic_3.svg';
import pic4 from '../../../assets/images/backgrounds/pic_4.svg';
import PostForm from './PostForm';

export default function ChallengeDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    const { id } = useParams();
    const [mode, setMode] = useState('');
    const isCreateMode = mode === 'create';
    const isEditMode = mode === 'edit';
    const selectedChallenge = useSelector(
        (state) => state.challenge.selectedChallenge
    );
    const [postData, setPostData] = useState(null);
    const [challenges, setChallenges] = useState(getChallenges());

    // 챌린지 생성 & 수정 모드일 때 사용할 상태
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        duration: '',
    });
    const allChallenges = JSON.parse(localStorage.getItem('clgList'));
    const maxId =
        allChallenges.length > 0
            ? Math.max(...allChallenges.map((ch) => ch.id))
            : 0;

    useEffect(() => {
        const selectedChallenge = getChallenges().find(
            (challenge) => String(challenge.id) === String(id)
        );
        setPostData(selectedChallenge);
    }, [id]);

    useEffect(() => {
        if (isEditMode && selectedChallenge) {
            setFormData({
                clgImg: selectedChallenge.clgImg,
                title: selectedChallenge.title,
                content: selectedChallenge.content,
                category: selectedChallenge.category,
                duration: selectedChallenge.duration,
                participants: selectedChallenge.participants || [],
            });
        }
    }, [isEditMode, selectedChallenge]);

    useEffect(() => {
        dispatch(getJoinedChallenge()); // 컴포넌트가 처음 렌더링될 때 참여한 챌린지 가져오기
    }, [dispatch]); // 의존성 배열에서 dispatch를 넣어주면 컴포넌트가 처음 렌더링될 때만 실행됨

    // 글 수정하는 로직
    const handleEditClick = () => {
        // if (!selectedChallenge) {
        //     alert('수정할 챌린지가 존재하지 않습니다.');
        //     return;
        // }
        setMode('edit');
        setFormData({
            title: selectedChallenge.title,
            content: selectedChallenge.content,
            category: selectedChallenge.category,
            duration: selectedChallenge.duration,
            participants: selectedChallenge.participants || [],
        });
    };

    // 글 작성하는 로직
    const handleSubmit = () => {
        if (
            !formData.title ||
            !formData.content ||
            !formData.category ||
            !formData.duration
        ) {
            alert('모든 항목을 입력하세요.');
            return;
        }

        if (isEditMode) {
            dispatch(updateChallenge({ ...selectedChallenge, ...formData }));
        } else {
            const newChallenge = {
                id: maxId + 1, // ID 생성 & 데이터 순서를 위해 ...대신 모든 속성을 명시
                category: formData.category,
                duration: formData.duration,
                title: formData.title,
                content: formData.content,
                authorId: loggedInUser,
                postDate: new Date().toISOString().slice(0, 19),
                postClicked: 0,
                scrapCount: 0,
                likesCount: 0,
                participants: [
                    {
                        userId: loggedInUser,
                        joinDate: new Date().toISOString().slice(0, 19),
                        clgJoin: true,
                        clgDoing: true,
                        clgDone: false,
                    },
                ],
            };
            dispatch(addChallenge(newChallenge));
            setTimeout(() => {
                dispatch(getJoinedChallenge());
            }, 100);
        }

        setMode('view');
        setTimeout(() => navigate(-1), 100);
    };

    // 글 수정 및 작성 취소하는 로직
    const handleCancelEdit = () => {
        setMode('view');
        navigate(-1);
    };

    // 글 삭제하는 로직
    const handleDelete = (challengeId) => {
        const storedChallenges =
            JSON.parse(localStorage.getItem('clgList')) || [];

        const updatedChallenges = storedChallenges.filter(
            (challenge) => challenge.id !== challengeId
        );

        // 삭제된 챌린지를 기록
        const deletedChallenges =
            JSON.parse(localStorage.getItem('deletedChallenges')) || [];
        localStorage.setItem(
            'deletedChallenges',
            JSON.stringify([...deletedChallenges, challengeId])
        );

        localStorage.setItem('clgList', JSON.stringify(updatedChallenges)); // localStorage 업데이트
        setChallenges(getChallenges()); // 상태 업데이트 (리렌더링을 위함)
        navigate('/challenges', { state: { refresh: true } }); // 페이지 이동 후 새로고침 트리거 추가
    };

    return (
        <div className='relative md:default-size md:mt-0'>
            <main
                className={`card default-size ${isCreateMode || isEditMode ? 'min-h-[100%]' : ''} md:h-full flex-col justify-start gap-3 md:gap-0`}
            >
                {isCreateMode || isEditMode ? (
                    <PostForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        onCancel={handleCancelEdit}
                        isCreateMode={isCreateMode}
                        isEditMode={isEditMode}
                    />
                ) : postData ? (
                    <>
                        <ChallengeInfo
                            postData={postData}
                            formData={formData}
                            setFormData={setFormData}
                            isCreateMode={isCreateMode}
                            isEditMode={isEditMode}
                            onChange={handleSubmit}
                            onEdit={handleEditClick}
                            onDelete={() => handleDelete(selectedChallenge?.id)}
                        />
                        <ChallengeComments
                            postData={postData}
                            onEdit={handleEditClick}
                            onDelete={() => handleDelete(selectedChallenge?.id)}
                        />
                    </>
                ) : (
                    <p>챌린지를 찾을 수 없습니다.</p>
                )}
            </main>
            {isCreateMode || isEditMode ? (
                <div className='absolute -bottom-12 flex justify-between w-full'>
                    <img
                        src={pic4}
                        alt='bg_illust_pic4'
                        className='hidden md:block md:w-44'
                    />
                    <img
                        src={pic3}
                        alt='bg_illust_pic3'
                        className='hidden md:block md:w-40'
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
