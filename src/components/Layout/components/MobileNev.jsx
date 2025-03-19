import React from 'react';
import { Link } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const MobileNav = ({ isMenuOpen, setIsMenuOpen, handleLogout }) => {
    const loggedInUser = useSelector((state) => state.user.userId);

    return (
        <>
            {isMenuOpen ? (
                <>
                    <div className='fixed inset-0 h-screen w-screen min-w-[390px] flex flex-col items-center justify-center bg-main-100/95 backdrop-blur-sm z-60'>
                        <button
                            className='md:hidden flex flex-col items-center justify-center w-8 h-8 z-70 fixed top-5 right-8'
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <IoClose className='text-4xl font-bold text-neutral-900' />
                        </button>
                        <nav>
                            <ul className='text-lg text-center space-y-10 font-medium'>
                                <li>
                                    <Link
                                        to='/main'
                                        onClick={() => setIsMenuOpen(false)}
                                        className='hover:font-black'
                                    >
                                        홈
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/challenges'
                                        onClick={() => setIsMenuOpen(false)}
                                        className='hover:font-black'
                                    >
                                        챌린지 둘러보기
                                    </Link>
                                </li>
                                {loggedInUser && ( // 로그인 상태일 때만 개인화 페이지 표시
                                    <>
                                        <li>
                                            <Link
                                                to='/my-challenges'
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                                className='hover:font-black'
                                            >
                                                내 챌린지
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to='/mypage'
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                                className='hover:font-black'
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
                                            className='hover:font-black'
                                        >
                                            로그아웃
                                        </button>
                                    ) : (
                                        <Link
                                            to='/login'
                                            onClick={() => setIsMenuOpen(false)}
                                            className='hover:font-black'
                                        >
                                            로그인
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
            ) : (
                <button
                    className='md:hidden flex flex-col items-center justify-center w-8 h-8 z-70'
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    <IoMenu className='text-4xl font-bold text-black' />
                </button>
            )}
        </>
    );
};

export default MobileNav;
