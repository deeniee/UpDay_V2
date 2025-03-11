export const getChallenges = () => {
    return JSON.parse(localStorage.getItem('clgList') || '[]');
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
