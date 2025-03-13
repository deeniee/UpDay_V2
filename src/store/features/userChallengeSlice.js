import { createSlice } from '@reduxjs/toolkit';
import { dummyChallenges } from '../../assets/data/dummyChallenges';
import { getChallenges } from '../../utils/localStorage';

// 챌린지 데이터를 localStorage에 저장
const saveChallengeToLocalStorage = (challenges) => {
    localStorage.setItem('clgList', JSON.stringify(challenges));
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
            const updatedChallenges = getChallenges() || []; // localStorage에서 최신 데이터 가져오기
            state.ongoingChallenges = updatedChallenges.filter((challenge) =>
                challenge.participants?.some(
                    (participant) =>
                        participant.userId === currentUserId &&
                        participant.clgDoing
                )
            );
        },
        // 참여한 챌린지 가져오는 액션
        getJoinedChallenge: (state) => {
            const currentUserId = localStorage.getItem('loggedInUser');
            const updatedChallenges = getChallenges() || []; // localStorage에서 최신 데이터 가져오기

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
                                  clgDone:
                                      type === 'done'
                                          ? !participant.clgDone
                                          : participant.clgDoing,
                              }
                            : participant
                    ),
                };
            });

            console.log('🔄 업데이트된 챌린지:', state.list);

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
