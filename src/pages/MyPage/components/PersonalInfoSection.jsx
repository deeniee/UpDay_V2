import React, { useState, useEffect, useRef, useMemo } from 'react';
import img1 from '../../../assets/images/icons/icon_habit.svg';
import img2 from '../../../assets/images/icons/icon_etc.svg';
import img3 from '../../../assets/images/icons/icon_health.svg';
import img4 from '../../../assets/images/icons/icon_study.svg';
import { validatePassword, validateNickname } from '../../../utils/validation';
import { getAllUsers, getCurrentUserData } from '../../../utils/localStorage';

export default function PersonalInfo() {
    const handleRefresh = () => {
        window.location.reload();
    };

    const loggedInUserId = localStorage.getItem('loggedInUser');
    const [users, setUsers] = useState(getAllUsers());
    const currentUserData = getCurrentUserData();

    const [userInfo, setUserInfo] = useState({
        userId: '',
        passsword: '',
        confirmPassword: '',
        signupDate: '',
        nickname: '',
        userImg: null,
        userIntroduction: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const defaultImgs = useMemo(() => [img1, img2, img3, img4], []);
    const [tempUserImg, setTempUserImg] = useState(null); // 임시 이미지
    const uploadPhotoInput = useRef(tempUserImg);

    useEffect(() => {
        if (currentUserData) {
            setUserInfo((prev) => {
                let initialUserImg = currentUserData.userImg;

                // 프로필 이미지가 없는 경우 랜덤 이미지 설정
                if (!initialUserImg) {
                    initialUserImg =
                        defaultImgs[
                            Math.floor(Math.random() * defaultImgs.length)
                        ];
                }

                const updatedInfo = {
                    ...prev,
                    userId: currentUserData.userId || '',
                    password: '',
                    nickname: currentUserData.nickname || '',
                    signupDate: currentUserData.signupDate || '',
                    userImg: initialUserImg,
                    userIntroduction: currentUserData.userIntroduction || '',
                };
                if (JSON.stringify(prev) === JSON.stringify(updatedInfo)) {
                    return prev;
                }
                return updatedInfo;
            });
        }
    }, [currentUserData, defaultImgs]);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));

        if (name === 'nickname') {
            const error = validateNickname(value);
            setNicknameError(error || '');
        }

        if (name === 'password') {
            const error = validatePassword(value);
            setPasswordError(error || '');
        }

        if (name === 'confirmPassword') {
            if (value !== userInfo.password) {
                setPasswordError('비밀번호가 일치하지 않습니다.');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleImageUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxSize = 200; // 최대 크기 (200px)

                let width = img.width;
                let height = img.height;

                // 비율 유지하며 크기 조정
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // 압축하여 JPEG 저장 (품질 70%)
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);

                setTempUserImg(compressedDataUrl); // 미리보기 용
                setUserInfo((prev) => ({
                    ...prev,
                    userImg: compressedDataUrl,
                }));
            };
        };
    };

    const handleImageDelete = () => {
        const randomImage =
            defaultImgs[Math.floor(Math.random() * defaultImgs.length)];
        setTempUserImg(randomImage); // 미리보기용 상태만 변경
        setUserInfo((prev) => ({
            ...prev,
            userImg: randomImage,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 닉네임 유효성 검사 + 중복 검사 통합
        const nicknameErrorMsg = validateNickname(userInfo.nickname);
        if (nicknameErrorMsg) {
            setNicknameError(nicknameErrorMsg);
            return;
        }

        // 비밀번호 확인
        if (userInfo.password !== userInfo.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 기존 유저 정보 유지하면서 업데이트할 부분만 덮어쓰기
        const updatedUser = {
            ...currentUserData, // 기존 정보 유지
            ...userInfo, // 새로 입력한 정보 적용
            password: userInfo.password || currentUserData.password, // 비밀번호 유지
            userImg: tempUserImg || userInfo.userImg, // 임시 이미지 우선 적용
        };

        // 유저 목록 업데이트
        const updatedUsers = users.map((user) =>
            user.userId === loggedInUserId ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);

        // 챌린지 목록 업데이트 (닉네임 & 프로필 이미지 변경)
        const currentChallenges = JSON.parse(
            localStorage.getItem('clgList') || '[]'
        );
        const updatedChallenges = currentChallenges.map((challenge) =>
            challenge.authorId === loggedInUserId
                ? {
                      ...challenge,
                      nickname: userInfo.nickname,
                      userImg: userInfo.userImg || challenge.userImg,
                  }
                : challenge
        );

        localStorage.setItem('clgList', JSON.stringify(updatedChallenges));

        // 화면 갱신 및 수정 모드 종료
        handleRefresh();
        setEditMode(false);
        setTempUserImg(null);
    };

    if (!currentUserData) {
        return (
            <div className='w-full h-[756px] rounded-r-3xl rounded-bl-3xl bg-neutral-100 p-[36px]'>
                <p className='text-center text-gray-500'>
                    로그인한 유저 정보를 찾을 수 없습니다.
                </p>
            </div>
        );
    }

    return (
        <form
            className={`w-full ${editMode ? 'h-[720px]' : 'h-[570px]'} md:h-full flex flex-col justify-between card rounded-tl-none p-4 md:p-6 md:pt-4`}
            onSubmit={handleSubmit}
        >
            <div className='flex flex-col gap-3 md:gap-4 -mt-1 md:mt-0'>
                <div className='col-span-full'>
                    <label
                        htmlFor='photo'
                        className='main-text font-semibold text-neutral-700 dark:text-neutral-200'
                    >
                        프로필 사진
                    </label>
                    <div className='mt-2 flex items-center gap-x-3'>
                        <img
                            src={tempUserImg || userInfo.userImg}
                            alt='프로필'
                            className='w-[25%] md:w-[30%] shrink-0 ring-1 ring-neutral-400 aspect-square object-cover bg-neutral-200 overflow-hidden rounded-full bg-neutral-100'
                        />

                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageUpload}
                            className='hidden'
                            id='upload-photo'
                            disabled={!editMode}
                            ref={uploadPhotoInput}
                        />
                        <label
                            htmlFor='upload-photo'
                            className={`btn px-3 text-center whitespace-nowrap ${editMode ? 'btn-primary' : 'hidden'} `}
                        >
                            사진 올리기
                        </label>
                        <input
                            type='button'
                            onClick={handleImageDelete}
                            className='hidden'
                            id='delete-photo'
                            disabled={!editMode}
                        />
                        <label
                            htmlFor='delete-photo'
                            className={`btn px-3 text-center whitespace-nowrap ${editMode ? 'btn-negative' : 'hidden'} `}
                        >
                            삭제하기
                        </label>
                    </div>
                </div>
                <div className='col-span-full'>
                    <label
                        htmlFor='userIntroduction'
                        className='main-text font-semibold text-neutral-700 dark:text-neutral-200'
                    >
                        소개글
                    </label>
                    <div className='mt-2 '>
                        {editMode ? (
                            <textarea
                                id='userIntroduction'
                                name='userIntroduction'
                                rows={4}
                                value={userInfo.userIntroduction}
                                onChange={handleChange}
                                className='textarea-field sub-text w-full overflow-scroll scrollbar-none'
                            />
                        ) : (
                            <p className='textarea-field w-full h-[78px] md:h-[94px] main-text overflow-scroll scrollbar-none'>
                                {userInfo.userIntroduction ||
                                    '아직 소개글을 작성하지 않았습니다.'}
                            </p>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-3 md:gap-x-4 md:gap-y-2 md:grid-cols-2'>
                    <div className='space-y-2'>
                        <label
                            htmlFor='userNickname'
                            className='main-text font-semibold text-neutral-700 dark:text-neutral-200'
                        >
                            닉네임
                        </label>

                        <input
                            id='userNickname'
                            name='userNickname'
                            type='text'
                            value={userInfo.nickname}
                            onChange={handleChange}
                            className='input-field w-full'
                            disabled={!editMode}
                        />
                        {nicknameError && (
                            <p className='text-red-500 text-sm'>
                                {nicknameError}
                            </p>
                        )}
                    </div>
                    <div className='space-y-2'>
                        <label
                            htmlFor='email'
                            className='main-text font-semibold text-neutral-700 dark:text-neutral-200'
                        >
                            아이디
                        </label>

                        <input
                            id='email'
                            name='email'
                            type='text'
                            value={userInfo.userId}
                            className='input-field w-full'
                            disabled
                        />
                    </div>
                    {editMode && (
                        <div className='space-y-2'>
                            <label
                                htmlFor='password'
                                className='main-text font-semibold text-neutral-700 dark:text-neutral-200'
                            >
                                새 비밀번호
                            </label>

                            <input
                                id='password'
                                name='password'
                                type='password'
                                value={userInfo.password}
                                onChange={handleChange}
                                className='input-field w-full'
                                disabled={!editMode}
                            />
                            {passwordError && (
                                <p className='text-red-500 text-sm'>
                                    {passwordError}
                                </p>
                            )}
                        </div>
                    )}
                    {editMode && (
                        <div className='space-y-2'>
                            <label
                                htmlFor='confirmPassword'
                                className='main-text font-semibold text-neutral-700 dark:text-neutral-200'
                            >
                                새 비밀번호 확인
                            </label>

                            <input
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                value={userInfo.confirmPassword}
                                onChange={handleChange}
                                className='input-field w-full'
                                disabled={!editMode}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-center gap-x-6 mt-6'>
                {!editMode ? (
                    <button
                        type='button'
                        onClick={() => setEditMode(true)}
                        className='btn btn-primary w-[36%] whitespace-nowrap'
                    >
                        수정하기
                    </button>
                ) : (
                    <div className='w-full flex justify-center gap-x-4 whitespace-nowrap'>
                        <button
                            type='button'
                            onClick={() => setEditMode(false)}
                            className='btn btn-negative w-28'
                        >
                            취소하기
                        </button>
                        <button type='submit' className='btn btn-primary w-28'>
                            저장하기
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
}
