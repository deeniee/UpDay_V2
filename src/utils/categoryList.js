import IconAll from '../assets/images/backgrounds/pic_3.svg';
import IconHabit from '../assets/images/icons/icon_habit.svg';
import IconHealth from '../assets/images/icons/icon_health.svg';
import IconStudy from '../assets/images/icons/icon_study.svg';
import IconEtc from '../assets/images/icons/icon_etc.svg';
import PicHabit from '../assets/images/icons/pic_habit.svg';
import PicHealth from '../assets/images/icons/pic_health.svg';
import PicStudy from '../assets/images/icons/pic_study.svg';
import PicEtc from '../assets/images/icons/pic_etc.svg';

// 챌린지 카테고리별 아이콘 매핑
export const categoryList = [
    {
        title: '전체',
        icon: IconAll,
        illust: '',
        path: '/challenges',
    },
    {
        title: '습관',
        icon: IconHabit,
        illust: PicHabit,
        path: '/challenges/category/habit',
    },
    {
        title: '건강',
        icon: IconHealth,
        illust: PicHealth,
        path: '/challenges/category/health',
    },
    {
        title: '학습',
        icon: IconStudy,
        illust: PicStudy,
        path: '/challenges/category/study',
    },
    {
        title: '기타',
        icon: IconEtc,
        illust: PicEtc,
        path: '/challenges/category/etc',
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

// 카테고리에 맞는 path 반환 함수
export const getCategoryPath = (category) => {
    const item = categoryList.find((item) => item.title === category);
    return item ? item.path : '';
};
