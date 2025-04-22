import { userData } from '../assets/data/userData';
import { dummyUsers } from '../assets/data/dummyUsers';
import { dummyChallenges } from '../assets/data/dummyChallenges';

export const getAuthorData = (authorId) => {
    let authorData = dummyUsers.find((user) => user.userId === authorId);

    if (!authorData) {
        const usersData = userData || '[]';
        authorData = usersData.find((user) => user.userId === authorId);
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
