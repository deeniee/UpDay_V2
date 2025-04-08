import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DesktopNav = ({ handleLogout, showNav, getLogo }) => {
    const loggedInUser = useSelector((state) => state.user.userId);

    return (
        <header
            className={`header hidden md:flex justify-between items-center
                w-[90vw] md:w-[80vw] md:max-w-[1344px] h-full mx-auto ${showNav ? '' : 'hide-nav'}`}
        >
            {/* 로고 */}
            <Link to='main'>
                <img alt='logo' src={getLogo} className='h-6 md:h-8 ' />
            </Link>
            <nav className='flex items-center h-full main-text'>
                <ul className='flex gap-10'>
                    <li>
                        <Link to='/main' className='hover:font-extrabold'>
                            홈
                        </Link>
                    </li>
                    <li>
                        <Link to='/challenges' className='hover:font-extrabold'>
                            챌린지 둘러보기
                        </Link>
                    </li>

                    {loggedInUser && ( // 로그인 상태일 때만 개인화 페이지 표시
                        <>
                            <li>
                                <Link
                                    to='/my-challenges'
                                    className='hover:font-extrabold'
                                >
                                    내 챌린지
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/mypage'
                                    className='hover:font-extrabold'
                                >
                                    마이페이지
                                </Link>
                            </li>
                        </>
                    )}

                    <li>
                        {loggedInUser ? (
                            <button
                                onClick={handleLogout}
                                className='hover:font-extrabold'
                            >
                                로그아웃
                            </button>
                        ) : (
                            <Link to='/login' className='hover:font-extrabold'>
                                로그인
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default DesktopNav;
