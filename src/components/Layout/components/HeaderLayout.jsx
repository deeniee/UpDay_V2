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
    const [showNav, setShowNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
        // 페이지가 처음 렌더링될 때 localStorage에서 로그인 정보를 가져옴
        const loggedInUser = localStorage.getItem('loggedInUser');

        // 로그인 정보가 있을 경우에만 Redux에 상태 설정
        if (loggedInUser) {
            dispatch(setUser({ userId: loggedInUser }));
        }
    }, [dispatch]); // 한 번만 실행되도록 빈 배열로 설정 (리렌더링 시 실행되지 않음)

    useEffect(() => {
        // 스크롤 이벤트를 처리하는 함수
        const handleScroll = () => {
            const currentScrollY = window.scrollY; // 스크롤이 아래로 진행되었는지 확인
            if (currentScrollY > lastScrollY) {
                setShowNav(false); // 스크롤을 내릴 때 숨기기
            } else {
                setShowNav(true); // 스크롤을 올릴 때  표시
            }

            setLastScrollY(currentScrollY); // 마지막 스크롤 위치 업데이트
        };

        window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너 등록

        // 클린업 함수에서 이벤트 리스너 제거
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={`w-full h-12 fixed top-0
                ${isMenuOpen ? 'z-50' : isHighZIndexPage ? 'z-40' : 'z-0'}`}
        >
            {/* 데스크톱 메뉴 */}
            <DesktopNav handleLogout={handleLogout} showNav={showNav} />

            {/* 모바일 메뉴 */}
            <MobileNav
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                handleLogout={handleLogout}
                showNav={showNav}
            />
        </div>
    );
};

export default HeaderLayout;
