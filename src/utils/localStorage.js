export const getChallenges = () => {
    return JSON.parse(localStorage.getItem('clgList') || '[]');
};

export const setChallenges = (challenges) => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
};

export const getAllUsers = () => {
    const usersData = JSON.parse(localStorage.getItem('users'));
    return usersData;
};

export const getCurrentUserData = () => {
    const loggedInUserId = localStorage.getItem('loggedInUser');

    if (getAllUsers() && loggedInUserId) {
        const users = getAllUsers();
        return users.find((user) => user.userId === loggedInUserId) || null;
    }
    return null;
};
