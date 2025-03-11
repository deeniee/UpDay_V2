import { format } from 'date-fns';
import { getCurrentUserData } from './localStorage';

export const calcActiveDays = () => {
    const user = getCurrentUserData();
    const signUpDate = new Date(user.signupDate);
    const today = new Date();
    const diffDays =
        Math.floor((today - signUpDate) / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
};

export const calcPassedDays = (joinDate) => {
    const start = new Date(joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const calcDate = (postDate) => {
    const start = new Date(postDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const formattedDate = format(start, 'yyyy.MM.dd');
    const formattedStartHour = Math.abs(format(start, 'hh'));
    const formattedNowHour = Math.abs(format(now, 'hh'));
    const diffSecond = formattedStartHour - formattedNowHour;

    // console.log(formattedStartHour);
    // console.log(formattedNowHour);
    // console.log(diffSecond);
    // if (diffSecond < 24 && diffDays <= 1) {
    //     return `${diffSecond}시간 전`;
    // }

    if (diffDays <= 1) return '오늘';
    if (diffDays < 8) return `${diffDays}일 전`;
    if (diffDays < 14) return '2주 전';
    if (diffDays < 21) return '3주 전';
    if (diffDays < 28) return '4주 전';
    if (diffDays < 60) return '1개월 전';
    if (diffDays < 90) return '2개월 전';
    if (diffDays < 120) return '3개월 전';
    if (diffDays < 150) return '4개월 전';
    if (diffDays < 180) return '5개월 전';
    if (diffDays < 210) return '6개월 전';
    if (diffDays < 240) return '7개월 전';
    if (diffDays < 270) return '8개월 전';
    if (diffDays < 300) return '9개월 전';
    if (diffDays < 330) return '10개월 전';
    if (diffDays < 365) return '11개월 전';
    if (diffDays < 730) return '1년 전';
    if (diffDays < 1095) return '2년 전';
    if (diffDays < 1460) return '3년 전';
    return '4년 이상 전';
};
