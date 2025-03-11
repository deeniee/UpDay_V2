import { userData } from '../assets/data/userData';
import { dummyUsers } from '../assets/data/dummyUsers';
import { dummyChallenges } from '../assets/data/dummyChallenges';

export const getAuthorData = (authorId) => {
    let authorData = dummyUsers.find((user) => user.userId === authorId);

    if (!authorData) {
        // userData가 없다면 dummyUsers에서 다시 가져와 반환
        authorData = userData.find((user) => user.userId === authorId);
    }

    return authorData;
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
