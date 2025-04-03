import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const MobileNav = ({ isMenuOpen, setIsMenuOpen, handleLogout, showNav }) => {
    const loggedInUser = useSelector((state) => state.user.userId);

    return (
        <>
            {isMenuOpen ? (
                <>
                    <div
                        className='fixed inset-0 h-screen w-screen min-w-[390px] flex flex-col items-center justify-center
                                    bg-main-100/95 backdrop-blur-sm'
                    >
                        <button
                            className='md:hidden flex flex-col items-center justify-center w-8 h-8 fixed top-2 right-6'
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <IoClose className='text-4xl font-bold text-neutral-900' />
                        </button>
                        <nav>
                            <ul className='main-text text-base text-center space-y-10'>
                                <li>
                                    <Link
                                        to='/main'
                                        onClick={() => setIsMenuOpen(false)}
                                        className='hover:font-extrabold'
                                    >
                                        홈
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/challenges'
                                        onClick={() => setIsMenuOpen(false)}
                                        className='hover:font-extrabold'
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
                                                className='hover:font-extrabold'
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
                                        <Link
                                            to='/login'
                                            onClick={() => setIsMenuOpen(false)}
                                            className='hover:font-extrabold'
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
                <header
                    className={`bg-gradient-to-b from-main-100 from-60% via-main-100/90 via-90% to-main-100/90 md:hidden flex
                        justify-between items-center w-[90vw] md:w-[80vw] md:max-w-[1344px] h-full mx-auto ${showNav ? '' : 'hide-nav'}`}
                >
                    {/* 로고 */}
                    <Link to='main'>
                        <img
                            alt='logo'
                            src='/upday_logo.svg'
                            className='h-6 md:h-8'
                        />
                    </Link>
                    <button
                        className='flex flex-col items-center justify-center w-8 h-8'
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <IoMenu className='text-4xl font-bold text-black' />
                    </button>
                </header>
            )}
        </>
    );
};

export default MobileNav;
