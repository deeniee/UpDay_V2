export const getChallenges = () => {
    const challenges = JSON.parse(localStorage.getItem('clgList')) || [];
    return challenges;
};

export const getCurrentUserData = () => {
    const usersData = localStorage.getItem('users');
    const loggedInUserID = localStorage.getItem('loggedInUser');

    if (usersData && loggedInUserID) {
        const users = JSON.parse(usersData);
        return users.find((user) => user.userId === loggedInUserID) || null;
    }
    return null;
};
