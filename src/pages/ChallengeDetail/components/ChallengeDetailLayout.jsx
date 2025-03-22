import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { dummyChallenges } from '../../../assets/data/dummyChallenges';
import {
    addChallenge,
    updateChallenge,
    deleteChallenge,
} from '../../../store/features/challengeSlice';
import ChallengeInfo from './ChallengeInfo';
import ChallengeComments from './ChallengeComments';

export default function ChallengeDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    const { id } = useParams();
    const { pathname } = useLocation();
    const isCreateMode = pathname.endsWith('/create'); // 현재 모드 확인
    const isEditMode = pathname.endsWith('/edit');
    const isViewMode = !isCreateMode && !isEditMode;
    const selectedChallenge = useSelector(
        (state) => state.challenge.selectedChallenge
    );
    const [postData, setPostData] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        duration: '',
    }); // 챌린지 생성 & 수정 모드일 때 사용할 상태

    useEffect(() => {
        if (isEditMode && selectedChallenge) {
            setFormData({
                title: selectedChallenge.title,
                content: selectedChallenge.content,
                category: selectedChallenge.category,
                duration: selectedChallenge.duration,
                participants: selectedChallenge.participants || [],
            });
        }
    }, [isEditMode, selectedChallenge]);

    useEffect(() => {
        if (selectedChallenge) {
            setPostData(selectedChallenge);
        }
    }, [selectedChallenge]);

    // 글 작성&수정하는 로직
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
        if (isCreateMode) {
            // 1. 로컬 스토리지의 챌린지 가져오기
            const existingStorageChallenges = JSON.parse(
                localStorage.getItem('clgList') || '[]'
            );
            // 2. 전체 챌린지 목록 업데이트
            const allChallenges = [
                ...dummyChallenges,
                ...existingStorageChallenges,
            ];
            // 3. 새 챌린지의 id값 계산
            const maxId =
                Math.max(...allChallenges.map((challenge) => challenge.id), 0) +
                1;
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userInfo = users.find((user) => user.userId === loggedInUser); // 현재 로그인한 유저 구별

            const newChallenge = {
                ...formData,
                id: maxId,
                authorId: loggedInUser,
                userImg: userInfo?.userImg || '',
                nickname: userInfo?.nickname || '기본 닉네임',
                postDate: new Date().toISOString().slice(0, 19),
                postClicked: 0,
                scrapCount: 0,
                likesCount: 0,
                participants: [
                    ...(formData.participants || []),
                    {
                        userId: loggedInUser, // 작성자는 자동으로 참여
                        joinDate: new Date().toISOString().split('T')[0],
                        clgJoin: true,
                        clgDoing: true,
                        clgDone: false,
                    },
                ],
            };
            dispatch(addChallenge(newChallenge));
        } else if (isEditMode) {
            const updatedChallenge = { ...selectedChallenge, ...formData };
            dispatch(updateChallenge(updatedChallenge));
        }

        setTimeout(() => navigate('/challenges'), 100);
    };

    // 글 삭제하는 로직
    const handleDelete = (id) => {
        dispatch(deleteChallenge(id));
        navigate('/challenges');
    };

    useEffect(() => {
        const selectedChallenge = dummyChallenges.find(
            (challenge) => String(challenge.id) === String(id)
        );
        setPostData(selectedChallenge);
    }, [id]);

    const [participantsData, setParticipantsData] = useState([]);

    return (
        <main
            className={`card default-size ${isCreateMode || isEditMode ? 'min-h-[100%]' : ''} md:h-full flex-col justify-start gap-3 md:gap-0`}
        >
            {isCreateMode ? (
                <>
                    <ChallengeInfo
                        formData={formData}
                        setFormData={setFormData}
                        isCreateMode={isCreateMode}
                        isEditMode={isEditMode}
                        onChange={handleSubmit}
                    />
                </>
            ) : postData ? (
                <>
                    <ChallengeInfo
                        postData={postData}
                        formData={formData}
                        setFormData={setFormData}
                        isCreateMode={isCreateMode}
                        isEditMode={isEditMode}
                        onChange={handleSubmit}
                        onDelete={() => handleDelete(selectedChallenge?.id)}
                    />
                    <ChallengeComments postData={postData} />
                </>
            ) : (
                <p>챌린지를 찾을 수 없습니다.</p>
            )}
        </main>
    );
}
