import React from 'react';
import { Link } from 'react-router-dom';
import ButtonIcon from '../images/button.svg';
import {
    categoryList,
    getCategoryIllust,
    getCategoryPath,
} from '../../../utils/categoryList';

export default function ChallengeCategory() {
    return (
        <div className='relative w-full flex flex-col space-y-2 pb-4 md:pb-0'>
            <h2 className='title pl-3 md:pl-0'>카테고리별 챌린지</h2>
            <div className='h-full grid grid-cols-4 md:grid-cols-2 gap-4'>
                {categoryList
                    .filter((category) => category.title !== '전체') // '전체' 제외
                    .map((category, index) => (
                        <Link
                            key={index}
                            to={getCategoryPath(category.title)}
                            className={`relative w-full h-32 md:h-full md:min-h-[101.5px] flex justify-between items-center card drop-shadow-sm`}
                        >
                            <div className=' w-full h-full p-3 md:p-4 flex justify-between items-between`'>
                                <span className='main-text font-semibold whitespace-nowrap'>
                                    {category.title}
                                </span>
                                <img
                                    src={ButtonIcon}
                                    alt='Button'
                                    className='w-4 h-4 md:w-5 md:h-5'
                                />
                            </div>
                            <div className='absolute w-full h-full flex justify-center items-end pb-3 md:pb-4'>
                                <img
                                    src={getCategoryIllust(category.title)}
                                    alt={category.title}
                                    className='object-contain h-[68%]'
                                />
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
