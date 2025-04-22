import React from 'react';
import ChallengesLayout from './components/ChallengesLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaPlus } from 'react-icons/fa6';

const AllChallenges = () => {
    // 글 생성하는 모달로 가게 하기 위해 호출
    const navigate = useNavigate();

    // 클릭시 글 생성하는 모달로 이동하는 로직
    const handleCreateClick = () => {
        navigate('create');
    };

    return (
        <>
            <Helmet>
                <title>챌린지 둘러보기 - UpDay</title>
            </Helmet>
            <ChallengesLayout />
            <Outlet />
            <button
                className='flex items-center justify-center text-neutral-100 rounded-full bg-point-400 drop-shadow-md
                fixed bottom-[11%] right-[6%] md:right-[11%] w-12 md:w-14 h-12 md:h-14 text-2xl md:text-3xl'
                onClick={handleCreateClick}
            >
                <FaPlus />
            </button>
        </>
    );
};

export default AllChallenges;
