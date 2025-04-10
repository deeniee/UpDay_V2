import useProfileSetup from '../hooks/useProfileSetup';

const ProfileForm = () => {
    const {
        nickname,
        userImg,
        error,
        isModalOpen,
        setNicknameState,
        handleImageUpload,
        handleSubmit,
        closeModal,
    } = useProfileSetup();

    return (
        <div className='flex flex-col items-center main-text'>
            <form
                onSubmit={handleSubmit}
                className='relative flex flex-col w-full max-w-[288px] gap-6 mb-3'
            >
                <div className='flex flex-col gap-1 w-full h-full'>
                    <label htmlFor='file-upload'>프로필 사진</label>
                    <label
                        htmlFor='file-upload'
                        className='flex items-center justify-center cursor-pointer rounded-full border border-neutral-400 overflow-hidden bg-neutral-300 w-[124px] h-[124px] md:w-32 md:h-32 dark:bg-neutral-200'
                    >
                        {userImg ? (
                            <img
                                src={userImg}
                                alt='프로필 미리보기'
                                className=' w-[124px] h-[124px] md:w-32 md:h-32 object-cover'
                            />
                        ) : (
                            <span className='text-neutral-500'>
                                이미지 업로드
                            </span>
                        )}
                    </label>

                    <input
                        id='file-upload'
                        type='file'
                        accept='image/*'
                        onChange={handleImageUpload}
                        className='hidden'
                    />
                </div>

                <div className='relative flex flex-col gap-1 w-full h-full'>
                    <label htmlFor='nickname'>닉네임</label>
                    <input
                        type='nickname'
                        placeholder='6자 이내'
                        value={nickname}
                        onChange={(e) => setNicknameState(e.target.value)}
                        className='input-field w-full h-10'
                    />
                    {error && (
                        <div className='sub-text w-full text-center text-red-400 absolute top-[68px] left-0'>
                            {error}
                        </div>
                    )}
                </div>

                <button
                    type='submit'
                    className='btn btn-neutral-1 w-full max-w-[288px] h-10 mt-[80px] md:mt-[70px]'
                >
                    회원가입 완료
                </button>
            </form>
            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-neutral-900/30 backdrop-blur-sm'>
                    <div className='relative card flex flex-col justify-between items-center w-96 p-6 pt-9 h-56 md:p-6'>
                        <div className='title font-bold mt-4'>
                            회원 가입이 완료되었습니다
                        </div>
                        <div className='main-text'>
                            업데이와 함께 원하던 목표를 이뤄봐요!
                            <br />
                        </div>
                        <button
                            onClick={closeModal}
                            className='btn btn-point w-auto mx-auto px-3 md:px-4 h-10'
                        >
                            로그인 하러가기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileForm;
