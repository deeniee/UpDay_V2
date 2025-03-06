import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../../store/features/UserSlice';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
    const [email, setEmailState] = useState('');
    const [password, setPasswordState] = useState('');
    const [passwordConfirm, setPasswordConfirmState] = useState('');
    const [emailError, setEmailError] = useState('');
    const [pwError, setPwError] = useState('');
    const [pwConfirmError, setPwConfirmError] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clglist = useSelector((state) => state.challenge.list ?? []);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        password.length >= 8 &&
        /[a-z]/.test(password) && // 소문자 포함
        /[0-9]/.test(password) && // 숫자 포함
        /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자 포함

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError('');
        setPwError('');
        setPwConfirmError('');
        setError('');

        if (!validateEmail(email)) {
            setEmailError('올바른 이메일 형식으로 입력하세요.');
            return;
        }

        if (!validatePassword(password)) {
            setPwError(
                '소문자, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.'
            );
            return;
        }

        if (password !== passwordConfirm) {
            setPwConfirmError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some((user) => user.email === email)) {
            setError('이미 등록된 아이디입니다.');
            return;
        }

        if (clglist.some((challenge) => challenge.authorId === email)) {
            setError('이미 등록된 아이디입니다.');
            return;
        }

        // 모든 조건을 통과하면 회원가입 처리
        dispatch(setEmail(email));
        dispatch(setPassword(password));

        navigate('/profile');
    };

    return {
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
    };
};

export default useSignup;
