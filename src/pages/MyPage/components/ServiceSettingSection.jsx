import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa6';
import ToggleButton from '../../../components/ui/ToggleButton';
import RadioButton from '../../../components/ui/RadioButton';
import { useThemeManager } from '../hooks/useThemeManager';

export default function ServiceSetting() {
    const { theme, changeTheme } = useThemeManager();
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

    return (
        <section className='card w-full h-full rounded-tl-none p-3 md:p-4 main-text drop-shadow-sm'>
            {/* 알림 설정 */}
            <div className='flex flex-col gap-3 md:gap-4 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-neutral-300'>
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
            <div className='flex flex-col gap-3 md:gap-4 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-neutral-300'>
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
                {/* <label className='flex items-center gap-2'>
                    <RadioButton
                        value='system'
                        checked={theme === 'system'}
                        onChange={handleThemeChange}
                    />
                    시스템 설정 따르기
                </label> */}
            </div>

            {/* 소셜 로그인 관리 */}
            {/* <div className='flex flex-col gap-3 md:gap-4 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-neutral-300'>
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
            <div className='flex flex-col gap-3 md:gap-4 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-neutral-300'>
                <h3 className='title'>시간 설정</h3>
                <label>시간대 설정</label>
                <label>날짜 및 시간 형식 변경</label>
            </div>
            <h3 className='text-neutral-500 transition hover:text-red-300'>
                <button>회원탈퇴하기</button>
            </h3>
        </section>
    );
}
