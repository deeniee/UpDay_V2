import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import ModalHeader from './components/ModalHeader';
import ModalContent from './components/ModalContent';
import ModalFooter from './components/ModalFooter';

import {
    addChallenge,
    deleteChallenge,
    updateChallenge,
} from '../../store/features/challengeSlice';
import { getCategoryIllust } from '../../utils/categoryList';
import { dummyChallenges } from '../../assets/data/dummyChallenges';
import useModal from '../../components/common/hooks/useModal';

import LoginRequiredModal from '../../components/common/components/LoginRequiredModal';

const PostDetailModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isModalOpen, openModal, closeModal } = useModal();

    // 현재 모드 확인
    const isCreateMode = pathname.endsWith('/create');
    const isEditMode = pathname.endsWith('/edit');
    const isViewMode = !isCreateMode && !isEditMode;

    const selectedChallenge = useSelector(
        (state) => state.challenge.selectedChallenge
    );

    const loggedInUser = localStorage.getItem('loggedInUser');

    // 로그인하지 않은 상태로 글 작성 시도할 경우 로그인 모달 표시하는 함수
    const checkLoginStatus = React.useCallback(() => {
        if (isCreateMode && !loggedInUser) {
            openModal();
        }
    }, [isCreateMode, loggedInUser, openModal]);

    // 글 작성 시도 시 로그인 상태 확인
    useEffect(() => {
        checkLoginStatus();
    }, [checkLoginStatus]);

    // 로그인 페이지로 이동하는 핸들러
    const handleNavigateToLogin = () => {
        closeModal();
        navigate('/login');
    };

    // 챌린지 생성 & 수정 모드일 때 사용할 상태
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        duration: '',
    });

    useEffect(() => {
        if (isEditMode && selectedChallenge) {
            setFormData({
                title: selectedChallenge.title,
                content: selectedChallenge.content,
                category: selectedChallenge.category,
                duration: selectedChallenge.duration,
            });
        }
    }, [isEditMode, selectedChallenge]); // isEditMode 혹은 selectedChallenge가 변경될 때마다 재렌더링

    // 존재하지 않는 글을 보려고 할 때 빈 화면을 보여주는 안전장치
    if (isViewMode && !selectedChallenge) {
        return null;
    }

    // 로그인 한 유저인지 확인하는 로직
    const isMyPost =
        isCreateMode || loggedInUser === selectedChallenge?.authorId;

    // 창 닫기
    const handleClose = () => {
        navigate('/challenges');
    };

    // 수정 버튼 클릭시 수정하는 모달 상태창으로 변경하는 로직
    const handleUpdate = () => {
        navigate(`/challenges/${selectedChallenge.id}/edit`);
    };

    // 글 작성하는 로직
    const handleSubmit = () => {
        if (isCreateMode) {
            // 1. 로컬 스토리지의 챌린지 가져오기
            const existingStorageChallenges = JSON.parse(
                localStorage.getItem('clgList') || '[]'
            );

            // 2. 더미 데이터 챌린지와 로컬 스토리지에 저장된 챌린지 합치기
            const allChallenges = [
                ...dummyChallenges,
                ...existingStorageChallenges,
            ];

            // 3. 합쳐진 챌린지들 중에서 가장 큰 id 값 찾은 후에 + 1 하기
            const maxId =
                Math.max(...allChallenges.map((challenge) => challenge.id), 0) +
                1;

            // users 정보 다 가져오기
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // 현재 로그인한 유저 구별하기
            const userInfo = users.find((user) => user.email === loggedInUser);

            const newChallenge = {
                ...formData,
                id: maxId,
                authorId: loggedInUser,
                userImg: userInfo?.profileImage || '',
                nickname: userInfo?.nickname || '기본 닉네임',
                postDate: new Date().toISOString().slice(0, 19),
                postClicked: 0,
                joinDate: new Date().toISOString().split('T')[0], // 작성자는 자동으로 참여
                clgJoin: true, // 추가: 처음에는 참여한 상태
                clgDoing: true, // 추가: 처음에는 진행한 상태
                clgDone: false, // 추가: 처음에는 완료하지 않은 상태,
            };
            // 필수 입력 체크
            if (
                !formData.title ||
                !formData.content ||
                !formData.duration ||
                !formData.category
            ) {
                alert('모든 항목을 입력하시오');
                return;
            }

            dispatch(addChallenge(newChallenge));
            navigate('/challenges');
        } else if (isEditMode) {
            // 필수 입력 체크
            if (
                !formData.title ||
                !formData.content ||
                !formData.duration ||
                !formData.category
            ) {
                alert('모든 항목을 입력하시오');
                return;
            }

            // 수정된 내용 저장하는 로직
            const updatedChallenge = {
                ...selectedChallenge,
                ...formData,
            };

            dispatch(updateChallenge(updatedChallenge));
            navigate('/challenges');
        }
    };

    // 글 삭제하는 로직
    const handleDelete = (id) => {
        dispatch(deleteChallenge(id));
        navigate('/challenges');
    };

    return (
        <>
            {isCreateMode && !loggedInUser ? (
                <LoginRequiredModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        closeModal();
                        navigate('/challenges');
                    }}
                    onNavigate={handleNavigateToLogin}
                />
            ) : (
                <div
                    className='flex items-center justify-center z-[100]'
                    onClick={handleClose}
                >
                    <div className='w-[80%] md:w-[400px] max-md:mx-4 p-3 pt-9 md:p-4 md:pt-12 card'>
                        <div className='card bg-neutral-300 h-[300px] md:h-[280px] mb-4 max-md:mb-3 overflow-hidden'>
                            <img
                                className='h-full mx-auto'
                                src={getCategoryIllust()}
                                alt=''
                            />
                        </div>
                        <ModalHeader
                            mode={
                                isCreateMode
                                    ? 'create'
                                    : isEditMode
                                      ? 'edit'
                                      : 'view'
                            }
                            category={
                                isViewMode
                                    ? selectedChallenge?.category
                                    : formData.category
                            }
                            duration={
                                isViewMode
                                    ? selectedChallenge?.duration
                                    : formData.duration
                            }
                            isMyPost={isMyPost}
                            onChange={setFormData}
                            formData={formData}
                            onDelete={() => handleDelete(selectedChallenge.id)}
                            onUpdate={handleUpdate}
                        />
                        <ModalContent
                            mode={
                                isCreateMode
                                    ? 'create'
                                    : isEditMode
                                      ? 'edit'
                                      : 'view'
                            }
                            title={
                                isViewMode
                                    ? selectedChallenge?.title
                                    : formData.title
                            }
                            content={
                                isViewMode
                                    ? selectedChallenge?.content
                                    : formData.content
                            }
                            onChange={setFormData}
                            formData={formData}
                        />
                        <ModalFooter
                            mode={
                                isCreateMode
                                    ? 'create'
                                    : isEditMode
                                      ? 'edit'
                                      : 'view'
                            }
                            userImg={
                                isViewMode
                                    ? selectedChallenge?.userImg
                                    : 'https://img.freepik.com/free-photo/happy-smiling-young-woman-outdoor-with-headphones_624325-2774.jpg?t=st=1739337349~exp=1739340949~hmac=09682bb91bc32e12f74294761387c2d0b03eb8ba74bc808b70070949c2b90a8c&w=900'
                            }
                            nickname={
                                isViewMode ? selectedChallenge?.nickname : ''
                            }
                            isMyPost={isMyPost}
                            onSubmit={handleSubmit}
                            onClose={handleClose}
                            challengeId={selectedChallenge?.id}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default PostDetailModal;
