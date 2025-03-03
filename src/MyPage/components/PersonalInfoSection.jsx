import React, { useState, useEffect, useRef, useMemo } from 'react';
import img1 from '../img/1.svg';
import img2 from '../img/2.svg';
import img3 from '../img/3.svg';
import img4 from '../img/4.svg';

// 비밀번호 유효성 검사 함수
const validatePassword = (password) => {
    if (password.length < 8) {
        return '비밀번호는 8자 이상이어야 합니다.';
    }
    if (!/[a-z]/.test(password)) {
        return '비밀번호에는 소문자가 하나 이상 포함되어야 합니다.';
    }
    if (!/[0-9]/.test(password)) {
        return '비밀번호에는 숫자가 하나 이상 포함되어야 합니다.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
        return '비밀번호에는 특수 문자가 하나 이상 포함되어야 합니다.';
    }
    return null;
};

const validateNickname = (nickname) => {
    if (nickname.length > 6) {
        return '닉네임은 6글자 이내여야 합니다.';
    }
    return null;
};

export default function PersonalInfo() {
    const handleRefresh = () => {
        window.location.reload();
    };

    const loggedInUserEmail = localStorage.getItem('loggedInUser');

    const [users, setUsers] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('users')) || [];
        } catch (error) {
            return [];
        }
    });
    const loggedInUser = users.find((user) => user.email === loggedInUserEmail);

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        nickname: '',
        confirmPassword: '',
        about: '',
        profileImage: null,
        signupDate: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const defaultImages = useMemo(() => [img1, img2, img3, img4], []);
    const [originalUserInfo, setOriginalUserInfo] = useState(null);
    const uploadPhotoInput = useRef(null);

    useEffect(() => {
        if (loggedInUser) {
            setUserInfo((prev) => {
                let initialProfileImage = loggedInUser.profileImage;

                // 프로필 이미지가 없는 경우 랜덤 이미지 설정
                if (!initialProfileImage) {
                    initialProfileImage =
                        defaultImages[
                            Math.floor(Math.random() * defaultImages.length)
                        ];
                }

                const updatedInfo = {
                    ...prev,
                    email: loggedInUser.email || '',
                    password: '',
                    nickname: loggedInUser.nickname || '',
                    signupDate: loggedInUser.signupDate || '',
                    profileImage: initialProfileImage,
                    about: loggedInUser.about || '',
                };
                if (JSON.stringify(prev) === JSON.stringify(updatedInfo)) {
                    return prev;
                }
                return updatedInfo;
            });
        }
    }, [loggedInUser, defaultImages]);

    const [challengeList, setChallengeList] = useState([]);

    useEffect(() => {
        const challenges = JSON.parse(localStorage.getItem('clglist')) || [];
        setChallengeList(challenges);
    }, []);

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
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUserInfo((prev) => ({
                    ...prev,
                    profileImage: reader.result,
                }));

                // localStorage 즉시 업데이트
                const updatedUsers = users.map((user) =>
                    user.email === loggedInUserEmail
                        ? { ...user, profileImage: reader.result }
                        : user
                );
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                setUsers(updatedUsers);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        // 랜덤 이미지 선택
        const randomImage =
            defaultImages[Math.floor(Math.random() * defaultImages.length)];

        // userInfo 상태 업데이트 및 localStorage 업데이트
        setUserInfo((prev) => ({ ...prev, profileImage: randomImage }));

        const updatedUsers = users.map((user) =>
            user.email === loggedInUserEmail
                ? { ...user, profileImage: randomImage }
                : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let error = validateNickname(userInfo.nickname);
        if (error) {
            setNicknameError(error);
            return;
        }

        const isNicknameTaken = users.some(
            (user) =>
                user.nickname === userInfo.nickname &&
                user.email !== loggedInUserEmail
        );
        if (isNicknameTaken) {
            setNicknameError('이 닉네임은 이미 사용 중입니다.');
            return;
        }

        if (passwordError) {
            alert(passwordError);
            return;
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const currentUserId = loggedInUserEmail;
        const newNickname = userInfo.nickname;

        const updatedUser = {
            email: userInfo.email,
            password: userInfo.password || loggedInUser.password, // 기존 비밀번호 유지
            nickname: userInfo.nickname,
            signupDate: userInfo.signupDate,
            about: userInfo.about,
            profileImage: userInfo.profileImage,
        };
        const updatedUsers = users.map((user) =>
            user.email === userInfo.email ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);

        // 챌린지 목록 업데이트 (닉네임 & 프로필 이미지 변경)
        const currentChallenges = JSON.parse(
            localStorage.getItem('clglist') || '[]'
        );

        if (Array.isArray(currentChallenges)) {
            const updatedChallenges = currentChallenges.map((challenge) => {
                if (challenge.authorId === currentUserId) {
                    return {
                        ...challenge,
                        nickname: newNickname,
                        profileImage:
                            userInfo.profileImage || challenge.profileImage,
                        userImg: userInfo.profileImage || challenge.userImg,
                    };
                }
                return challenge;
            });
            localStorage.setItem('clglist', JSON.stringify(updatedChallenges));
        } else {
            console.error('clglist는 배열 형식이어야 합니다.');
        }

        // 프로필 이미지 변경 후 화면 다시 렌더링
        handleRefresh();
        setEditMode(false);
    };

    const handleEditMode = () => {
        setOriginalUserInfo({ ...userInfo });
        setEditMode(true);
    };

    const handleCancel = () => {
        setUserInfo(userInfo); // Reset userInfo to the original values
        setEditMode(false);
        setPasswordError('');
        setNicknameError('');

        // If a new photo was selected but not saved, clear the input
        if (uploadPhotoInput.current) {
            uploadPhotoInput.current.value = ''; // Clear the file input
        }
    };

    if (!loggedInUser) {
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
            className='w-full h-full flex flex-col justify-between card rounded-tl-none bg-neutral-100 p-4 md:p-6 md:pt-4'
            onSubmit={handleSubmit}
        >
            <div className='flex flex-col gap-3 md:gap-4'>
                <div className='col-span-full'>
                    <label
                        htmlFor='photo'
                        className='main-text font-semibold text-neutral-700'
                    >
                        프로필 사진
                    </label>
                    <div className='mt-2 flex items-center gap-x-3'>
                        {userInfo.profileImage ? (
                            <div className='w-[25%] ring-1 ring-neutral-400 aspect-square overflow-hidden rounded-full flex-shrink-0'>
                                <img
                                    src={userInfo.profileImage}
                                    alt='프로필'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        ) : (
                            <div className='w-[25%] aspect-square overflow-hidden rounded-full flex-shrink-0 flex items-center justify-center bg-gray-200'>
                                <img
                                    src={
                                        defaultImages[
                                            Math.floor(
                                                Math.random() *
                                                    defaultImages.length
                                            )
                                        ]
                                    }
                                    alt='기본 프로필'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        )}

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
                            className={`btn px-3 text-center whitespace-nowrap
                                            ${
                                                editMode
                                                    ? 'btn-primary'
                                                    : 'opacity-0 cursor-default'
                                            } `}
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
                            className={`btn px-3 text-center whitespace-nowrap
                                            ${
                                                editMode
                                                    ? 'btn-negative '
                                                    : 'opacity-0 cursor-default'
                                            } `}
                        >
                            삭제하기
                        </label>
                    </div>
                </div>
                <div className='col-span-full'>
                    <label
                        htmlFor='about'
                        className='main-text font-semibold text-neutral-700'
                    >
                        소개글
                    </label>
                    <div className='mt-2'>
                        {editMode ? (
                            <textarea
                                id='about'
                                name='about'
                                rows={3}
                                value={userInfo.about}
                                onChange={handleChange}
                                className='input-field sub-text w-full h-28'
                            />
                        ) : (
                            <p className='card h-28 main-text px-3 py-1.5 border border-neutral-400'>
                                {userInfo.about ||
                                    '아직 소개글을 작성하지 않았습니다.'}
                            </p>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-3 md:gap-x-4 md:gap-y-2 md:grid-cols-2'>
                    <div className='space-y-2'>
                        <label
                            htmlFor='nickname'
                            className='main-text font-semibold text-neutral-700'
                        >
                            닉네임
                        </label>

                        <input
                            id='nickname'
                            name='nickname'
                            type='text'
                            value={userInfo.nickname}
                            onChange={handleChange}
                            className='input-field w-full focus:outline-poiny-500'
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
                            className='main-text font-semibold text-neutral-700'
                        >
                            아이디
                        </label>

                        <input
                            id='email'
                            name='email'
                            type='text'
                            value={userInfo.email}
                            className='input-field w-full'
                            readOnly
                        />
                    </div>
                    {editMode && (
                        <div className='space-y-2'>
                            <label
                                htmlFor='password'
                                className='main-text font-semibold text-neutral-700'
                            >
                                새 비밀번호
                            </label>

                            <input
                                id='password'
                                name='password'
                                type='password'
                                value={userInfo.password}
                                onChange={handleChange}
                                className='input-field w-full focus:outline-poiny-500'
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
                                className='main-text font-semibold text-neutral-700'
                            >
                                새 비밀번호 확인
                            </label>

                            <input
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                value={userInfo.confirmPassword}
                                onChange={handleChange}
                                className='input-field w-full focus:outline-poiny-500'
                                disabled={!editMode}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-center gap-x-6'>
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
