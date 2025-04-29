import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ main, point, disc, button, onClick }) => {
    return ReactDOM.createPortal(
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/30 backdrop-blur-sm'>
            <div className='relative card flex flex-col justify-between items-center w-96 h-56 p-6 pt-9'>
                <div className='font-bold text-center'>
                    <span className='font-extrabold text-primary'>{point}</span>
                    {main}
                </div>
                <div className='text-sm text-center text-neutral-500 dark:text-neutral-300'>
                    {disc}
                </div>
                <button
                    onClick={onClick}
                    className='btn btn-point w-auto px-4 h-10'
                >
                    {button}
                </button>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
