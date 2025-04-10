import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '../../../components/ui/ToggleButton';
import RadioButton from '../../../components/ui/RadioButton';
import { useThemeManager } from '../../../hooks/useThemeManager';

export default function ServiceSetting() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { theme, changeTheme } = useThemeManager();
    const currentUserId = localStorage.getItem('loggedInUser');
    const checkTestAccout = currentUserId === 'daymaker@naver.com';
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const [notifications, setNotifications] = useState({
        challenge: true,
        participant: false,
        general: true,
    });

    const [socialAccounts, setSocialAccounts] = useState({
        google: true,
        kakao: true,
        apple: false,
    });

    const toggleNotification = (type) => {
        setNotifications((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const toggleSocialLogin = (platform) => {
        setSocialAccounts((prev) => ({
            ...prev,
            [platform]: !prev[platform],
        }));
    };

    const openDeleteModal = () => {
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
    };

    const deleteUser = () => {
        if (checkTestAccout) {
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            const updatedUsers = users.filter(
                (user) => user.userId !== currentUserId
            ); // 현재 유저를 제외한 나머지 유저들로 필터링

            localStorage.setItem('users', JSON.stringify(updatedUsers)); // 업데이트된 유저 리스트 localStorage에 저장
            localStorage.removeItem('loggedInUser'); // 로그인 상태도 초기화
            navigate('/main');
            window.location.reload();
        }
    };

    return (
        <section className='card w-full h-[570px] md:h-full rounded-tl-none p-4 md:p-6 main-text drop-shadow-sm'>
            {/* 알림 설정 */}
            <div className='flex flex-col gap-3 md:gap-4 md:-mt-1 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-neutral-300 dark:border-neutral-700'>
                <h3 className='title'>알림 설정</h3>
                <label className='flex items-center gap-2'>
                    챌린지 리마인더
                    <ToggleButton
                        checked={notifications.challenge}
                        onChange={() => toggleNotification('challenge')}
                    />
                </label>
                <label className='flex items-center gap-2'>
                    댓글 및 좋아요
                    <ToggleButton
                        checked={notifications.challenge}
                        onChange={() => toggleNotification('participant')}
                    />
                </label>
                <label className='flex items-center gap-2'>
                    추천 챌린지
                    <ToggleButton
                        checked={notifications.challenge}
                        onChange={() => toggleNotification('general')}
                    />
                </label>
            </div>

            {/* 다크모드 설정 */}
            <div className='flex flex-col gap-3 md:gap-4 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-neutral-300 dark:border-neutral-700'>
                <h3 className='title'>테마 설정</h3>
                <label className='flex items-center gap-2'>
                    <RadioButton
                        value='light'
                        checked={theme === 'light'}
                        onChange={() => changeTheme('light')}
                    />
                    라이트 모드
                </label>
                <label className='flex items-center gap-2'>
                    <RadioButton
                        value='dark'
                        checked={theme === 'dark'}
                        onChange={() => changeTheme('dark')}
                    />
                    다크 모드
                </label>
                <label className='flex items-center gap-2'>
                    <RadioButton
                        value='system'
                        checked={theme === 'system'}
                        onChange={() => changeTheme('system')}
                    />
                    시스템 설정 따르기
                </label>
            </div>

            {/* 소셜 로그인 관리 */}
            {/* <div className='flex flex-col gap-3 md:gap-4 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-neutral-300 dark:border-neutral-700'>
                <h3 className='title'>소셜 로그인 관리</h3>
                <div>
                    <span>Google</span>
                    <button onClick={() => toggleSocialLogin('google')}>
                        {socialAccounts.google ? '해제하기' : '연결하기'}
                    </button>
                </div>
                <div>
                    <span>Kakao</span>
                    <button onClick={() => toggleSocialLogin('kakao')}>
                        {socialAccounts.kakao ? '해제하기' : '연결하기'}
                    </button>
                </div>
                <div>
                    <span>Apple</span>
                    <button onClick={() => toggleSocialLogin('apple')}>
                        {socialAccounts.apple ? '해제하기' : '연결하기'}
                    </button>
                </div>
            </div> */}
            {/* 언어 및 지역 설정 */}
            {/* <div className='flex flex-col gap-3 md:gap-4 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-neutral-300 dark:border-neutral-700'>
                <h3 className='title'>시간 설정</h3>
                <label>시간대 설정</label>
                <label>날짜 및 시간 형식 변경</label>
            </div> */}
            <h3 className='text-neutral-500 transition hover:text-red-300 dark:text-neutral-400 dark:hover:text-red-300'>
                <button onClick={openDeleteModal}>회원탈퇴하기</button>
            </h3>
            {isModalOpen && (
                <div
                    className='absolute inset-0 flex items-center justify-center card rounded-tl-none bg-neutral-900/30'
                    onClick={closeDeleteModal}
                >
                    <div className='relative card flex flex-col justify-between items-center w-96 p-6 pt-9 md:w-[90%] md:max-w-96 h-56 md:p-6'>
                        <div className='title font-bold mt-4'>
                            {checkTestAccout
                                ? '테스트 계정은 삭제 할 수 없습니다.'
                                : '정말 떠나시겠어요?'}
                        </div>
                        <div className='main-text'>
                            {checkTestAccout
                                ? ''
                                : '당신을 응원하는 친구들이 업데이에서 활동하고 있어요.'}

                            <br />
                        </div>
                        <div className='flex gap-3 md:gap-4'>
                            <button
                                onClick={deleteUser}
                                className={`${checkTestAccout ? 'hidden' : ''} btn btn-negative w-auto mx-auto px-3 md:px-4 h-10`}
                            >
                                삭제하기
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className='btn btn-primary w-auto mx-auto px-3 md:px-4 h-10'
                            >
                                돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
