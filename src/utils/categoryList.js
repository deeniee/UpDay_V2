import IconAll from '../assets/images/pic_3.svg';
import IconHabit from '../assets/images/icon_habit.svg';
import IconHealth from '../assets/images/icon_health.svg';
import IconStudy from '../assets/images/icon_study.svg';
import IconEtc from '../assets/images/icon_etc.svg';
import PicHabit from '../assets/images/pic_habit.svg';
import PicHealth from '../assets/images/pic_health.svg';
import PicStudy from '../assets/images/pic_study.svg';
import PicEtc from '../assets/images/pic_etc.svg';

// 챌린지 카테고리별 아이콘 매핑
export const categoryList = [
    {
        title: '전체',
        icon: IconAll,
        illust: '',
        path: '/challengelist',
    },
    {
        title: '습관',
        icon: IconHabit,
        illust: PicHabit,
        path: '/challengelist/category/습관',
    },
    {
        title: '건강',
        icon: IconHealth,
        illust: PicHealth,
        path: '/challengelist/category/건강',
    },
    {
        title: '학습',
        icon: IconStudy,
        illust: PicStudy,
        path: '/challengelist/category/학습',
    },
    {
        title: '기타',
        icon: IconEtc,
        illust: PicEtc,
        path: '/challengelist/category/기타',
    },
];

// 카테고리에 맞는 아이콘 반환 함수
export const getCategoryIcon = (category) => {
    const icon = categoryList.find((item) => item.title === category);
    return icon ? icon.icon : '';
};

// 카테고리에 맞는 일러스트 반환 함수
export const getCategoryIllust = (category) => {
    const item = categoryList.find((item) => item.title === category);
    return item ? item.illust : '';
};
// 카테고리에 맞는 일러스트 반환 함수
export const getCategoryPath = (category) => {
    const item = categoryList.find((item) => item.title === category);
    return item ? item.path : '';
};
