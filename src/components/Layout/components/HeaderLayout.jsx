import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNev';
import { setUser } from '../../../store/features/UserSlice';

const HeaderLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 특정 페이지에만 z-index 높게 설정
    const isHighZIndexPage =
        [
            '/challenges',
            '/',
            '/main',
            '/mypage',
            '/login',
            '/challenges/:id',
        ].includes(location.pathname) ||
        /^\/challenges\/\d+$/.test(location.pathname);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        // localStorage에서 로그인 정보 제거
        localStorage.removeItem('loggedInUser');

        // Redux 상태 초기화
        dispatch(
            setUser({
                userId: '',
                password: '',
                userNickname: '',
                userImg: '',
            })
        );

        // 로그아웃 후 홈으로 이동
        navigate('/');
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false); // 화면이 커지면 메뉴 닫기
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // localStorage에서 로그인한 사용자 정보가 있다면 상태 초기화
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            // 상태를 Redux에 저장
            dispatch(setUser({ userID: loggedInUser }));
        }
    }, [dispatch]);

    return (
        <div
            className={`w-full h-12 fixed top-0 bg-main-100 ${
                isMenuOpen ? 'z-50' : isHighZIndexPage ? 'z-40' : 'z-0'
            }`}
        >
            <header className='flex justify-between items-center w-[90vw] md:w-[80vw] md:max-w-[1344px] h-full mx-auto'>
                {/* 로고 */}
                <Link to='main'>
                    <img
                        alt='logo'
                        src='/upday_logo.svg'
                        className='h-6 md:h-8'
                    />
                </Link>

                {/* 데스크톱 메뉴 */}
                <DesktopNav handleLogout={handleLogout} />

                {/* 모바일 메뉴 */}
                <MobileNav
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    handleLogout={handleLogout}
                />
            </header>
        </div>
    );
};

export default HeaderLayout;
