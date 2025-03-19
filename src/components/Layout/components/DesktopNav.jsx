import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DesktopNav = ({ handleLogout }) => {
    const loggedInUser = useSelector((state) => state.user.userId);

    return (
        <nav className='hidden md:flex items-center h-full text-sm font-medium'>
            <ul className='flex gap-10'>
                <li>
                    <Link to='/main' className='hover:font-black'>
                        홈
                    </Link>
                </li>
                <li>
                    <Link to='/challenges' className='hover:font-black'>
                        챌린지 둘러보기
                    </Link>
                </li>

                {loggedInUser && ( // 로그인 상태일 때만 개인화 페이지 표시
                    <>
                        <li>
                            <Link
                                to='/my-challenges'
                                className='hover:font-black'
                            >
                                내 챌린지
                            </Link>
                        </li>
                        <li>
                            <Link to='/mypage' className='hover:font-black'>
                                마이페이지
                            </Link>
                        </li>
                    </>
                )}

                <li>
                    {loggedInUser ? (
                        <button
                            onClick={handleLogout}
                            className='hover:font-black'
                        >
                            로그아웃
                        </button>
                    ) : (
                        <Link to='/login' className='hover:font-black'>
                            로그인
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default DesktopNav;
