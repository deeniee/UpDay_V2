import { useEffect, useState } from 'react';

const accessKey = 'CnQXEEIJxs7vakHJPHpu6zT_3OjeGDjDXwxYYjJbBcU';
const defaultImg = '../assets/images/icons/icon_etc.svg';

// 🔹 Unsplash API에서 랜덤 이미지 가져오기
const getUserImages = async (keyword, count = 15) => {
    try {
        const url = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${accessKey}&per_page=10`;
        const response = await fetch(url);
        const data = await response.json();

        return data.results.length > 0
            ? data.results.map((img) => img.urls.small) // 여러 개의 이미지 URL 배열 반환
            : Array(count).fill(defaultImg); // 결과가 없을 경우 기본 이미지 배열 반환
    } catch (error) {
        console.error('이미지 로딩 오류:', error);
        return Array(count).fill(defaultImg);
    }
};

// 🔹 이미지가 없는 유저들에게 랜덤 이미지 할당하는 훅
export const useUserImages = (users) => {
    const [updatedUsers, setUpdatedUsers] = useState(users);

    useEffect(() => {
        const updateImages = async () => {
            if (!users || users.length === 0) return;

            const randomImages = await getUserImages('person', users.length); // 필요한 개수만큼 이미지 요청

            const newUsers = users.map((user, index) => ({
                ...user,
                userImg:
                    user.userImg || randomImages[index % randomImages.length], // 각 유저에게 다른 이미지 배정
            }));

            setUpdatedUsers(newUsers);
        };

        updateImages();
    }, [users]);

    return updatedUsers;
};
