import React from 'react';

const ModalForShare = ({ closeModal, isFadingOut }) => {
    return (
        <div
            className={`absolute z-50 bottom-10 right-0 card bg-point-600 dark:bg-point-400 text-neutral-100 dark:text-neutral-900
                transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-95'}
                flex justify-center items-center w-56 h-12 md:w-60 md:h-12`}
            onClick={closeModal}
        >
            <div className='main-text'>챌린지 링크가 복사 되었습니다.</div>
        </div>
    );
};

export default ModalForShare;
