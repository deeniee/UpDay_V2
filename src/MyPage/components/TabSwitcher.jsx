import React, { useState, useEffect } from 'react';

import PersonalInfo from './PersonalInfoSection';
import UserChallenge from './UserChallengeSection';

export default function TabSwitcher() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));

    const TEST_ACCOUNT_EMAIL = 'test01@naver.com'; // 테스트 계정 이메일 고정
    const [isTestAccount, setIsTestAccount] = useState(false);
    const [activeTab, setActiveTab] = useState(1); // 기본값으로 1번 탭을 활성화

    // 테스트 계정 여부 확인
    useEffect(() => {
        if (users.length > 0 && loggedInUser) {
            setIsTestAccount(loggedInUser === TEST_ACCOUNT_EMAIL);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser]);

    // 테스트 계정이 아니면 activeTab(2)로 설정
    useEffect(() => {
        if (isTestAccount) {
            setActiveTab(2);
        }
        if (!isTestAccount) {
            setActiveTab(2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTestAccount]);

    return (
        <section className='w-full h-full md:w-[48%] md:h-[76vh] md:min-h-[574px]'>
            <div className='flex gap-2'>
                <button
                    className={`title ${activeTab === 1 ? 'tap-onclick' : 'tap-default'}`}
                    onClick={() => setActiveTab(1)}
                >
                    <h2>챌린지 관리</h2>
                </button>
                <button
                    className={`title ${activeTab === 2 ? 'tap-onclick' : 'tap-default'}`}
                    onClick={() => setActiveTab(2)}
                >
                    <h2>개인정보 관리</h2>
                </button>
            </div>

            {/* 활성화된 탭에 맞는 컴포넌트 렌더링 */}
            {activeTab === 1 && <UserChallenge />}
            {activeTab === 2 && <PersonalInfo />}
        </section>
    );
}
