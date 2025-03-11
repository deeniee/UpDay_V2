import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dummyChallenges } from '../../../assets/data/dummyChallenges';

import ChallengeInfo from './ChallengeInfo';
import ChallengeActions from './ChallengeActions';

export default function ChallengeDetail() {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const selectedChallenge = dummyChallenges.find(
            (challenge) => String(challenge.id) === String(id)
        );
        setPostData(selectedChallenge);
    }, [id]);

    // ChallengeHeader.jsx → 챌린지 제목, 카테고리, 진행 상태 등
    // ChallengeInfo.jsx → 설명, 목표, 주최자 정보 등
    // ChallengeActions.jsx → 참여하기 버튼, 공유, 스크랩 등의 인터랙션
    // ChallengeProgress.jsx → 진행률, 도전 완료 상태 등
    // ChallengeComments.jsx → 댓글 및 피드백 섹션
    // ChallengeParticipants.jsx → 참가자 목록

    if (!postData) return <p>챌린지를 찾을 수 없습니다.</p>;

    return (
        <main className='default-size flex-col'>
            <ChallengeInfo postData={postData} />

            <ChallengeActions postData={postData} />
        </main>
    );
}
