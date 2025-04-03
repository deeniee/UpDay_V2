import React, { useState, useEffect } from 'react';

import PersonalInfo from './PersonalInfoSection';
import ServiceSetting from './ServiceSettingSection';

export default function TabSwitcher() {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <section className='w-full h-full md:w-[48%] md:h-[76vh] md:min-h-[574px] md:max-h-[972.8px]'>
            <div className='flex gap-2'>
                <button
                    className={`title ${activeTab === 1 ? 'tap-onclick' : 'tap-default'} drop-shadow-sm`}
                    onClick={() => setActiveTab(1)}
                >
                    <h2>개인정보관리</h2>
                </button>
                <button
                    className={`title ${activeTab === 2 ? 'tap-onclick' : 'tap-default'} drop-shadow-sm`}
                    onClick={() => setActiveTab(2)}
                >
                    <h2>서비스 설정</h2>
                </button>
            </div>

            {/* 활성화된 탭에 맞는 컴포넌트 렌더링 */}
            {activeTab === 1 && <PersonalInfo />}
            {activeTab === 2 && <ServiceSetting />}
        </section>
    );
}
