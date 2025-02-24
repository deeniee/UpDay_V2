import React from 'react';

function SpeechBubble({ text, position }) {
    return (
        <div
            className={`relative w-[70%] h-auto bg-neutral-100 rounded-2xl p-3 shadow-sm ${position === 'right' ? 'ml-auto' : ''}`}
        >
            <p className='text-sm md:text-base text-center'>{text}</p>
        </div>
    );
}

export default SpeechBubble;
