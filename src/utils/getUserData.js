import { dummyUsers } from '../assets/data/dummyUsers';
import { dummyChallenges } from '../assets/data/dummyChallenges';

export const getAuthorData = (authorId) => {
    if (!authorId) return null;

    let authorData = dummyUsers?.find((user) => user.userId === authorId);

    if (!authorData) {
        const usersDataRaw = localStorage.getItem('users');
        if (!usersDataRaw) return null;

        try {
            const usersData = JSON.parse(usersDataRaw);
            if (!Array.isArray(usersData)) return null;

            authorData = usersData.find((user) => user.userId === authorId);
        } catch (err) {
            console.error('getAuthorData JSON parse error:', err);
            return null;
        }
    }

    return authorData || null;
};
export const getParticipantDatas = () => {
    const participantIds = dummyChallenges.flatMap((item) =>
        item.participants.map((participant) => participant.userId)
    );

    const topParticipantsIds = participantIds.slice(0, 3);

    const participantDatas = topParticipantsIds.map((id) =>
        dummyUsers.find((user) => user.userId === id)
    );

    return participantDatas;
};

export const getUserSavedData = () => {
    const userId = localStorage.getItem('loggedInUser');
    const savedData = JSON.parse(localStorage.getItem('mySavedClg')) || {};
    const hasInitialized = localStorage.getItem('hasInitializedUserData');

    const defaultUser = {
        userId: 'daymaker@naver.com',
        likedIds: [1, 3, 7, 16, 18],
        scrappedIds: [6, 8, 10],
    };

    // 테스트 계정 처리
    if (userId === defaultUser.userId) {
        const existing = savedData[userId] || {
            likedIds: [],
            scrappedIds: [],
        };

        const mergedLiked = [
            ...new Set([...defaultUser.likedIds, ...existing.likedIds]),
        ];
        const mergedScrapped = [
            ...new Set([...defaultUser.scrappedIds, ...existing.scrappedIds]),
        ];

        savedData[userId] = {
            likedIds: mergedLiked,
            scrappedIds: mergedScrapped,
        };

        localStorage.setItem('mySavedClg', JSON.stringify(savedData));

        // 초기화 flag 남기기
        if (!hasInitialized) {
            localStorage.setItem('hasInitializedUserData', 'true');
        }
    }

    // 일반 계정인데 아직 데이터 없을 경우, 빈 배열로 초기화
    if (!savedData[userId]) {
        savedData[userId] = {
            likedIds: [],
            scrappedIds: [],
        };
        localStorage.setItem('mySavedClg', JSON.stringify(savedData));
    }

    return savedData[userId] || { likedIds: [], scrappedIds: [] };
};

export const getUserRecordData = () => {
    const userId = localStorage.getItem('loggedInUser');
    const rawData = localStorage.getItem('myClgRecord');

    if (!userId) return {};

    const parsed = rawData ? JSON.parse(rawData) : {};

    // 해당 유저의 기록만 반환
    return parsed[userId] || {};
};
