export const getChallenges = () => {
    const challenges = JSON.parse(localStorage.getItem('clgList')) || [];
    return challenges;
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
