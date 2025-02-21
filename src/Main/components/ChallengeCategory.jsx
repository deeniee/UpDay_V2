import React from 'react';
import { Link } from 'react-router-dom';
import ButtonIcon from '../images/button.svg';
import SpoonIcon from '../../assets/images/spoon.svg';
import DustIcon from '../../assets/images/dust.svg';
import LampIcon from '../../assets/images/Lamp.svg';
import HeartIcon from '../../assets/images/heart.svg';
import ChallengeIcon from '../images/challenge-2.svg';

export default function ChallengeCategory() {
    const categories = [
        {
            name: '습관',
            color: 'bg-pink-200',
            icon: HeartIcon,
            path: '/challengelist/category/습관',
        },
        {
            name: '운동',
            color: 'bg-purple-200',
            icon: DustIcon,
            path: '/challengelist/category/운동',
        },
        {
            name: '학습',
            color: 'bg-yellow-200',
            icon: LampIcon,
            path: '/challengelist/category/학습',
        },
        {
            name: '식단',
            color: 'bg-mint-200',
            icon: SpoonIcon,
            path: '/challengelist/category/식단',
        },
    ];
    return (
        <div className='relative w-full md:w-[48%] flex flex-col space-y-2'>
            <div className='relative'>
                <img
                    src={ChallengeIcon}
                    alt='챌린지 아이콘'
                    className='w-[120px] md:w-[140px]'
                />
                <h2 className='absolute top-1.5 left-4 md:left-5 z-20 title text-neutral-100'>
                    카테고리별 챌린지
                </h2>
            </div>
            <div className='grid grid-cols-4 md:grid-cols-2 gap-2 md:gap-4'>
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={category.path}
                        className={`relative h-32 md:h-24 p-4 flex justify-between items-center card ${category.color}`}
                    >
                        <div className='h-full flex flex-col justify-between items-between`'>
                            <span className='main-text font-semibold whitespace-nowrap'>
                                {category.name}
                            </span>
                            <img
                                src={ButtonIcon}
                                alt='Button'
                                className='w-[20px] h-[20px] md:w-6 md:h-6'
                            />
                        </div>
                        <div className='absolute h-full right-0 object-contain flex items-center'>
                            <img
                                src={category.icon}
                                alt={`${category.name} icon`}
                                className='mr-4 h-[45%] md:h-[80%]'
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
