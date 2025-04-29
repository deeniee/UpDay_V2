import React from 'react';
import ChallengesLayout from './components/ChallengesLayout';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AllChallenges = () => {
    return (
        <>
            <Helmet>
                <title>챌린지 둘러보기 - UpDay</title>
            </Helmet>
            <ChallengesLayout />
            <Outlet />
        </>
    );
};

export default AllChallenges;
