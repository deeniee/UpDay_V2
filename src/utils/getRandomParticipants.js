import { getChallenges } from './localStorage';

export const getRandomParticipants = (users, count) => {
    let challenges = getChallenges(); // 기존 챌린지 목록 가져오기
    let isUpdated = false; // 변경 여부 체크

    const shuffled = [...users].sort(() => 0.5 - Math.random()); // 유저 목록 섞기
    const randomParticipants = shuffled.slice(0, count); // 랜덤 참가자 선택

    // participants가 비어 있는 챌린지만 업데이트
    challenges = challenges.map((challenge) => {
        if (!challenge.participants || challenge.participants.length === 1) {
            isUpdated = true; // 데이터 변경 확인
            return {
                ...challenge,
                participants: randomParticipants, // 새 참가자 추가
            };
        }
        return challenge;
    });

    // 변경된 경우에만 localStorage에 저장
    if (isUpdated) {
        localStorage.setItem('clgList', JSON.stringify(challenges));
    }

    return randomParticipants;
};
