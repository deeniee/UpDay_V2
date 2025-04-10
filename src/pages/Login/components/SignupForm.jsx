import useSignup from '../hooks/useSignup';

const SignupForm = () => {
    const {
        userId,
        password,
        userIdError,
        pwError,
        passwordConfirm,
        pwConfirmError,
        error,
        setUserIdState,
        setPasswordState,
        setPasswordConfirmState,
        handleSubmit,
    } = useSignup();

    return (
        <div className='relative flex flex-col items-center w-full'>
            <form
                onSubmit={handleSubmit}
                className='relative flex flex-col items-center gap-6 main-text w-full '
            >
                <div className='relative flex flex-col gap-1 w-full max-w-[288px]'>
                    <label htmlFor='email'>아이디</label>
                    <input
                        type='email'
                        placeholder='이메일 형식으로 입력하세요'
                        value={userId}
                        onChange={(e) => setUserIdState(e.target.value)}
                        className='input-field w-full h-10'
                    />
                    {userIdError && (
                        <div className='sub-text w-full text-center text-red-400 absolute top-[68px] left-0'>
                            {userIdError}
                        </div>
                    )}
                    {error && (
                        <div className='main-text text-red-400'>{error}</div>
                    )}
                </div>
                <div className='relative flex flex-col gap-1 w-full max-w-[288px]'>
                    <label htmlFor='password'>비밀번호</label>
                    <input
                        type='password'
                        placeholder='영문, 숫자, 특수문자 포함 8자 이상'
                        value={password}
                        onChange={(e) => setPasswordState(e.target.value)}
                        className='input-field w-full h-10'
                    />
                    {pwError && (
                        <div className='sub-text w-full text-center text-red-400 absolute top-[68px] left-0'>
                            {pwError}
                        </div>
                    )}
                </div>

                <div className='relative flex flex-col gap-1 w-full max-w-[288px]'>
                    <label htmlFor='passwordConfirm'>비밀번호 확인</label>
                    <input
                        type='password'
                        placeholder='비밀번호를 한 번 더 입력하세요'
                        value={passwordConfirm}
                        onChange={(e) =>
                            setPasswordConfirmState(e.target.value)
                        }
                        className='input-field w-full h-10'
                    />
                    {pwConfirmError && (
                        <div className='sub-text w-full text-center text-red-400 absolute top-[68px] left-0'>
                            {pwConfirmError}
                        </div>
                    )}
                </div>
                <button
                    type='submit'
                    className='btn btn-neutral-1 w-full max-w-[288px] h-10 mt-[80px] md:mt-[70px]'
                >
                    다음
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
