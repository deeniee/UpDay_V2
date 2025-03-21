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
            <div
                className={`relative w-10 h-5 rounded-full transition ease-in-out ${isOff ? 'bg-neutral-400' : 'bg-main-400'}`}
            >
                <button
                    className={`m-1 w-3 h-3 bg-neutral-100 rounded-full transition ease-in-out duration-500 ${isOff ? '' : 'translate-x-5'}`}
                    onClick={handleToggle}
                ></button>
                <span
                    className={`absolute top-0.5 left-1 sub-text text-neutral-100 transition ease-in-out duration-500 ${isOff ? 'translate-x-[13px]' : ''}`}
                >
                    {isOff ? 'OFF' : 'ON'}
                </span>
            </div>
        </div>
    );
};

export default ToggleButton;
