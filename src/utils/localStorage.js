export const getChallenges = () => {
    return JSON.parse(localStorage.getItem('clgList') || '[]');
};
