import React from 'react';

const Modal = ({ main, point, disc, button, onClick }) => {
    return (
        <div className='fixed top-0 left-0 w-[100vw] h-[100vh] scroll-none flex items-center justify-center bg-neutral-900/30 backdrop-blur-sm z-50'>
            <div className='relative card flex flex-col justify-between items-center w-96 p-6 pt-9 h-56 md:p-6'>
                <div className='title font-bold mt-4'>
                    <span className='font-extrabold'>{point}</span>
                    {main}
                </div>
                <div className='main-text'>{disc}</div>
                <button
                    onClick={onClick}
                    className='btn btn-point w-auto mx-auto px-3 md:px-4 h-10'
                >
                    {button}
                </button>
            </div>
        </div>
    );
};

export default Modal;
