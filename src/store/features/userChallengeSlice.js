import { createSlice } from '@reduxjs/toolkit';
import { dummyChallenges } from '../../assets/data/dummyChallenges';
import { getChallenges } from '../../utils/localStorage';
import moment from 'moment';

// 챌린지 데이터를 localStorage에 저장
const saveChallengeToLocalStorage = (challenges) => {
    // 같은 id를 가진 챌린지가 중복으로 존재하지 않도록 필터링
    const uniqueChallenges = challenges.reduce((acc, cur) => {
        if (!acc.find((item) => item.id === cur.id)) {
            acc.push(cur);
        }
        return acc;
    }, []);
    localStorage.setItem('clgList', JSON.stringify(uniqueChallenges));
};

const getInitialList = () => {
    const savedChallenges = JSON.parse(localStorage.getItem('clgList')) || [];

    // dummyChallenges를 Map으로 변환하여 빠르게 병합
    const challengeMap = new Map(savedChallenges.map((c) => [c.id, c]));

    dummyChallenges.forEach((challenge) => {
        if (!challengeMap.has(challenge.id)) {
            challengeMap.set(challenge.id, challenge);
        }
    });

    const mergedChallenges = Array.from(challengeMap.values());

    // 병합된 데이터로 로컬 스토리지 업데이트
    localStorage.setItem('clgList', JSON.stringify(mergedChallenges));

    return mergedChallenges;
};

const initialChallenges = getInitialList();

const getCurrentUserChallenges = (challenges, userId) => {
    const joined = challenges.filter((challenge) =>
        challenge.participants?.some(
            (participant) =>
                participant.userId === userId && participant.clgJoin
        )
    );

    const ongoing = joined.filter((challenge) =>
        challenge.participants?.some(
            (participant) =>
                participant.userId === userId && participant.clgDoing
        )
    );

    return { joined, ongoing };
};

const loggedInUser = localStorage.getItem('loggedInUser');
const { joined, ongoing } = getCurrentUserChallenges(
    initialChallenges,
    loggedInUser
);

// 챌린지 기간 문자열을 일 단위 숫자로 변환
export const parseDurationToDays = (durationStr) => {
    if (durationStr.includes('개월')) {
        return parseInt(durationStr.replace('개월', ''), 10) * 30;
    } else if (durationStr.includes('일')) {
        return parseInt(durationStr.replace('일', ''), 10);
    } else {
        return 30;
    }
};

// 시작일과 오늘 사이의 경과 일수 계산
export const calcDays = (startDate, endDate = new Date()) => {
    return moment(endDate).diff(moment(startDate), 'days');
};

// 특정 사용자 기준으로 clgDoing/clgDone 상태 업데이트된 챌린지 배열 반환
export const updateParticipantStatus = (challenges, userId) => {
    return challenges.map((challenge) => {
        const durationInDays = parseDurationToDays(challenge.duration);

        const updatedParticipants = challenge.participants.map((p) => {
            if (p.userId !== userId) return p;

            const passedDays = calcDays(p.joinDate);
            const isDone = passedDays >= durationInDays;

            return {
                ...p,
                clgDoing: !isDone,
                clgDone: isDone,
            };
        });

        return {
            ...challenge,
            participants: updatedParticipants,
        };
    });
};

const userChallengeSlice = createSlice({
    name: 'userChallenge',
    initialState: {
        list: initialChallenges,
        userPosts: [],
        joinedChallenges: joined,
        ongoingChallenges: ongoing,
    },
    reducers: {
        // 작성한 챌린지 가져오는 액션
        getUserPosts: (state) => {
            const currentUserId = localStorage.getItem('loggedInUser');
            state.userPosts = state.list.filter(
                (post) => post.authorId === currentUserId
            );
        },

        // 참여 중인 챌린지 가져오는 액션
        getOngoingChallenge: (state) => {
            const currentUserId = localStorage.getItem('loggedInUser');
            const originalChallenges = getChallenges() || [];

            // 상태 갱신
            const updatedChallenges = updateParticipantStatus(
                originalChallenges,
                currentUserId
            );

            localStorage.setItem(
                'challenges',
                JSON.stringify(updatedChallenges)
            );

            // clgDoing이 true인 챌린지만 저장
            state.ongoingChallenges = updatedChallenges.filter((challenge) =>
                challenge.participants.some(
                    (participant) =>
                        participant.userId === currentUserId &&
                        participant.clgDoing
                )
            );
        },

        // 참여한 챌린지 가져오는 액션
        getJoinedChallenge: (state) => {
            const currentUserId = localStorage.getItem('loggedInUser');
            const originalChallenges = getChallenges() || [];

            // 상태 갱신
            const updatedChallenges = updateParticipantStatus(
                originalChallenges,
                currentUserId
            );

            localStorage.setItem(
                'challenges',
                JSON.stringify(updatedChallenges)
            );

            // clgJoin이 true인 챌린지만 저장
            state.joinedChallenges = updatedChallenges.filter((challenge) =>
                challenge.participants?.some(
                    (participant) =>
                        participant.userId === currentUserId &&
                        participant.clgJoin
                )
            );
        },

        // 참여한 챌린지 상태 변경 및 저장하는 액션
        toggleChallengeState: (state, action) => {
            const { id, type } = action.payload;
            const currentUserId = localStorage.getItem('loggedInUser');

            state.list = state.list.map((challenge) => {
                if (challenge.id !== id) return challenge;

                return {
                    ...challenge,
                    participants: challenge.participants?.map((participant) =>
                        participant.userId === currentUserId
                            ? {
                                  ...participant,
                                  clgDoing:
                                      type === 'doing'
                                          ? !participant.clgDoing
                                          : false,
                                  //   clgDone:
                                  //       type === 'done'
                                  //           ? !participant.clgDone
                                  //           : participant.clgDoing,
                              }
                            : participant
                    ),
                };
            });

            state.joinedChallenges = state.list.filter((challenge) =>
                challenge.participants?.some(
                    (participant) =>
                        participant.userId === currentUserId &&
                        participant.clgJoin
                )
            );

            state.ongoingChallenges = state.list.filter((challenge) =>
                challenge.participants?.some(
                    (participant) =>
                        participant.userId === currentUserId &&
                        participant.clgDoing
                )
            );

            saveChallengeToLocalStorage(state.list);
        },
    },
});

export const {
    getUserPosts,
    getOngoingChallenge,
    getJoinedChallenge,
    toggleChallengeState,
} = userChallengeSlice.actions;
export default userChallengeSlice.reducer;
