import React from 'react';
import { Link } from 'react-router-dom';
import ButtonIcon from '../images/button.svg';
import PicHabit from '../../assets/images/pic_habit.svg';
import PicHealth from '../../assets/images/pic_health.svg';
import PicStudy from '../../assets/images/pic_study.svg';
import PicEtc from '../../assets/images/pic_etc.svg';

export default function ChallengeCategory() {
    const categories = [
        {
            name: '습관',
            icon: PicHabit,
            path: '/challengelist/category/습관',
        },
        {
            name: '건강',
            icon: PicHealth,
            path: '/challengelist/category/운동',
        },
        {
            name: '학습',
            icon: PicStudy,
            path: '/challengelist/category/학습',
        },
        {
            name: '기타',
            icon: PicEtc,
            path: '/challengelist/category/식단',
        },
    ];
    return (
        <div className='relative w-full md:w-[48vw] flex flex-col space-y-2 pb-4 md:pb-0'>
            <h2 className='title pl-4 md:pl-0'>카테고리별 챌린지</h2>
            <div className='grid grid-cols-4 md:grid-cols-2 gap-2'>
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={category.path}
                        className={`relative w-full h-32 md:h-[14.1vh] md:min-h-[101.5px] flex justify-between items-center card ${category.color}`}
                    >
                        <div className=' w-full h-full p-3 md:p-4 flex justify-between items-between`'>
                            <span className='main-text font-semibold whitespace-nowrap'>
                                {category.name}
                            </span>
                            <img
                                src={ButtonIcon}
                                alt='Button'
                                className='w-4 h-4 md:w-5 md:h-5'
                            />
                        </div>
                        <div className='absolute w-full h-full flex justify-center items-end pb-3 md:pb-4'>
                            <img
                                src={category.icon}
                                alt={`${category.name} icon`}
                                className='object-contain h-[68%] '
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
