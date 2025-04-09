import React, { useState } from 'react';

const ToggleButton = ({ checked, onChange }) => {
    const [isOff, setIsOff] = useState(true);
    const handleToggle = () => {
        setIsOff(!isOff);
    };
    return (
        <div className='flex items-center gap-2'>
            <input
                type='checkbox'
                className='hidden'
                checked={checked}
                onChange={onChange}
            />
            <button
                className={`relative w-11 h-5 rounded-full transition ease-in-out ${isOff ? 'bg-neutral-400 dark:bg-neutral-600' : 'bg-point-400'}`}
                onClick={handleToggle}
            >
                <div
                    className={`m-1 w-3 h-3 bg-neutral-100 rounded-full transition ease-in-out duration-500 ${isOff ? '' : 'translate-x-6'}`}
                ></div>
                <span
                    className={`absolute top-1 left-2 md:top-0.5 md:left-1.5 sub-text font-normal text-neutral-100 transition ease-in-out duration-500 ${isOff ? 'translate-x-3' : ''}`}
                >
                    {isOff ? 'OFF' : 'ON'}
                </span>
            </button>
        </div>
    );
};

export default ToggleButton;
