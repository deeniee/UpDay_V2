import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setPassword } from '../../../store/features/UserSlice';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
    const [userId, setUserIdState] = useState('');
    const [password, setPasswordState] = useState('');
    const [passwordConfirm, setPasswordConfirmState] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [pwError, setPwError] = useState('');
    const [pwConfirmError, setPwConfirmError] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clgList = useSelector((state) => state.challenge.list ?? []);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        password.length >= 8 &&
        /[a-z]/.test(password) && // 소문자 포함
        /[0-9]/.test(password) && // 숫자 포함
        /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자 포함

    const handleSubmit = (e) => {
        e.preventDefault();

        setUserIdError('');
        setPwError('');
        setPwConfirmError('');
        setError('');

        if (!validateEmail(userId)) {
            setUserIdError('올바른 이메일 형식으로 입력하세요.');
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
        if (users.some((user) => user.userId === userId)) {
            setError('이미 등록된 아이디입니다.');
            return;
        }

        if (clgList.some((challenge) => challenge.authorId === userId)) {
            setError('이미 등록된 아이디입니다.');
            return;
        }

        // 모든 조건을 통과하면 회원가입 처리
        dispatch(setUser({ userId, password, userNickname: '', userImg: '' }));
        dispatch(setPassword(password));

        navigate('/profile');
    };

    return {
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
    };
};

export default useSignup;
