import React from 'react';

function MessageCard({ text, position }) {
    return (
        <div
            className={`relative w-[70%] h-auto bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3 shadow-sm ${position === 'right' ? 'ml-auto' : ''}`}
        >
            <p className='sub-text text-center'>{text}</p>
        </div>
    );
}

export default MessageCard;
