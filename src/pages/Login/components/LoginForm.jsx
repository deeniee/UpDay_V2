import { Link } from 'react-router-dom';
import useLogin from '../hooks/UseLogin';
import pic3 from '../img/kakao_login_large_wide 1.svg';
import pic4 from '../img/kakao_login_large_wide 2.svg';

const LoginForm = () => {
    const { email, setEmail, password, setPassword, error, handleSubmit } =
        useLogin();

    return (
        <div className=' flex flex-col items-center text-center gap-8'>
            <form
                onSubmit={handleSubmit}
                className=' w-full max-w-[288px] flex flex-col items-center gap-6 pt-6'
            >
                <input
                    type='email'
                    placeholder='이메일'
                    className='input-field main-text w-full h-10'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='비밀번호'
                    className='input-field main-text w-full h-10'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className='main-text text-red-400'>{error}</div>}
                <button type='submit' className='btn btn-primary w-full h-10'>
                    로그인
                </button>
                <button className='btn bg-yellow-300 border-yellow-300 w-full max-w-[288px] h-10'>
                    카카오 로그인
                </button>
            </form>

            <div className='w-full max-w-[288px] flex items-center justify-center main-text'>
                <span className='flex-1 border-b border-neutral-400'></span>
                <span className='mx-6 leading-none'>또는</span>
                <span className='flex-1 border-b border-neutral-400'></span>
            </div>
            <button
                type='submit'
                className='btn btn-neutral-1 w-full max-w-[288px] h-10'
            >
                <Link to='/signup'>회원가입하기</Link>
            </button>
        </div>
    );
};

export default LoginForm;
