import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ useLocation 추가
import { setUser } from '../../../store/features/UserSlice';
import { userData } from '../../../assets/data/userData';

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

    useEffect(() => {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(userData));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        const existingUser = storedUsers.find(
            (user) => user.userId === userId && user.password === password
        );

        if (existingUser) {
            setError('');

            localStorage.setItem('loggedInUser', existingUser.userId);
            dispatch(setUser({ userId: existingUser.userId }));

            navigate('/main');
            window.location.reload();
        } else {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return {
        userId,
        setUserId,
        password,
        setPassword,
        error,
        handleSubmit,
    };
};

export default useLogin;
