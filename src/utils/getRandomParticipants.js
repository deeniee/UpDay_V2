export const getRandomParticipants = (users, count) => {
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    return shuffled.slice(1, count);
};
