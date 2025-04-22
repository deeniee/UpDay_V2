import React from 'react';
import { Link } from 'react-router-dom';

const MyChallengeCard = ({ title, subtitles, imgSrc, imgAlt, path }) => {
    return (
        <div className='flex md:flex-col md:gap-4 w-full h-full md:min-h-[312px] md:max-h-[592px]'>
            <div className='flex flex-col gap-3 md:gap-4 w-56 md:w-full'>
                <h2 className='title'> {title}</h2>
                <div className='flex flex-col md:flex-row gap-2.5 md:gap-1'>
                    {subtitles.map((text, idx) => (
                        <span key={idx} className='sub-text -mt-2 md:-mt-3'>
                            {text}
                        </span>
                    ))}
                </div>
            </div>
            <Link
                to={path}
                className='card w-full h-full flex justify-center items-center p-6'
            >
                <img src={imgSrc} alt={imgAlt} className='h-32 md:h-40' />
            </Link>
        </div>
    );
};
export default MyChallengeCard;
