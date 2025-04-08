import React, { useEffect, useState, useCallback } from 'react';
import useModal from '../../../components/common/hooks/useModal';
import { Helmet } from 'react-helmet';
import MyPageNonLogin from './MyPageNonLogin';
import UserProfile from './UserProfileSection';
import UserReport from './UserReport';
import TabSwitcher from './TabSwitcher';
import PersonalInfo from './PersonalInfoSection';
import ModalForLogin from '../../../components/common/ModalForLogin';

const MyPageLayout = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const { isModalOpen, openModal, closeModal } = useModal();

    const checkUserLogin = useCallback(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        const storedUsers = localStorage.getItem('users');
        if (!storedUser || !storedUsers) {
            openModal();
        } else {
            try {
                setLoggedInUser(storedUser);
            } catch (error) {
                console.error('Error parsing loggedInUser:', error);
                setLoggedInUser(storedUser);
            }
        }
    }, [openModal]);

    useEffect(() => {
        checkUserLogin();
    }, [checkUserLogin]);

    return (
        <main className='default-size flex-col md:flex-row gap-4 md:gap-0'>
            <Helmet>
                <title>마이페이지 - UpDay</title>
            </Helmet>
            {!loggedInUser ? (
                <MyPageNonLogin />
            ) : (
                <>
                    <section className='flex flex-col w-full gap-4 md:w-[48%] md:gap-0 md:justify-between'>
                        <UserProfile />
                        {/* <UserReport /> */}
                    </section>
                    <TabSwitcher />
                    {/* <PersonalInfo /> */}
                </>
            )}
            <ModalForLogin
                isOpen={isModalOpen} // 모달 열기 여부
                onClose={closeModal} // 모달 닫기
            />
        </main>
    );
};

export default MyPageLayout;
