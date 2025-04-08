import React from 'react';

const RadioButton = ({ value, checked, onChange }) => {
    return (
        <div>
            <label>
                <input
                    type='radio'
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className='hidden'
                />

                <div className='flex items-center justify-center w-4 h-4 rounded-full border-[1.5px] border-neutral-400 dark:border-neutral-600'>
                    <div
                        className={`w-2.5 h-2.5 rounded-full ${checked ? 'bg-point-400' : ''}`}
                    ></div>
                </div>
            </label>
        </div>
    );
};

export default RadioButton;
