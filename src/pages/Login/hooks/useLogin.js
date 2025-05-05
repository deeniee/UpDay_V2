import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setUser } from '../../../store/features/userSlice';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const defaultUserId = 'daymaker@naver.com';
    const defaultPassword = 'test123!';

    const [userId, setUserId] = useState(
        location.state?.userId || defaultUserId
    );
    const [password, setPassword] = useState(
        location.state?.password || defaultPassword
    );
    const [error, setError] = useState('');

    // 이메일 형식 정규식
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // 자동 로그인 처리
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            navigate('/main');
        }
    }, [navigate]);

    const handleBeforeInput = (e) => {
        // 한글 범위에 해당하는 문자가 입력될 때, 이를 방지
        const isHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.data);

        if (isHangul) {
            e.preventDefault(); // 한글 입력이 되지 않도록 방지
        }
    };

    const handleUserIdChange = (e) => {
        setUserId(e.target.value); // 정상적인 입력 처리
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(userId)) {
            setError('올바른 이메일 형식을 입력해주세요.');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = storedUsers.find(
            (user) => user.userId === userId && user.password === password
        );

        if (existingUser) {
            setError('');
            dispatch(setUser(existingUser));
            localStorage.setItem('loggedInUser', existingUser.userId);
            navigate('/main');
        } else {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return {
        userId,
        handleUserIdChange,
        handleBeforeInput,
        password,
        setPassword,
        error,
        handleSubmit,
    };
};

export default useLogin;
