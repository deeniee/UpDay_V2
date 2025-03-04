import useSignup from '../hooks/UseSignup';

const SignupForm = () => {
    const {
        email,
        password,
        emailError,
        pwError,
        passwordConfirm,
        pwConfirmError,
        error,
        setEmailState,
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
                    <label htmlFor='email'>이메일</label>
                    <input
                        type='email'
                        placeholder='example@email.com'
                        value={email}
                        onChange={(e) => setEmailState(e.target.value)}
                        className='input-field w-full h-10'
                    />
                    {emailError && (
                        <div className='sub-text w-full text-center text-red-400 absolute top-[68px] left-0'>
                            {emailError}
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
