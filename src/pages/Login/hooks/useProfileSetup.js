import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserNickname, setUserImg } from '../../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';
import img1 from '../../../assets/images/icons/icon_habit.svg';
import img2 from '../../../assets/images/icons/icon_etc.svg';
import img3 from '../../../assets/images/icons/icon_health.svg';
import img4 from '../../../assets/images/icons/icon_study.svg';

const useProfileSetup = () => {
    const [nickname, setNicknameState] = useState('');
    const [userImg, setUserImgState] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector((state) => state.user.userId);
    const password = useSelector((state) => state.user.password);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImgState(reader.result);
                dispatch(setUserImgState(reader.result));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nickname.length > 6 || nickname.length === 0) {
            setError('닉네임은 6글자 이내여야 합니다.');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some((user) => user.nickname === nickname)) {
            setError('이 닉네임은 이미 사용 중입니다.');
            return;
        }

        const defaultImages = [img1, img2, img3, img4];
        const randomImage =
            defaultImages[Math.floor(Math.random() * defaultImages.length)];

        // Redux 상태 업데이트
        dispatch(setUserImg(randomImage));
        dispatch(setUserNickname(nickname));

        const newUser = {
            userId,
            password,
            nickname,
            userImg: userImg || randomImage,
            signupDate: new Date().toISOString().slice(0, 19),
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    };

    const openModal = () => {
        setIsModalOpen(true); // 모달창 열기
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/login', { state: { userId, password } }); // 로그인 페이지로 이동 userId를 넘겨줌.
    };

    return {
        nickname,
        userImg,
        error,
        isModalOpen,
        setNicknameState,
        handleImageUpload,
        handleSubmit,
        openModal,
        closeModal,
    };
};

export default useProfileSetup;
