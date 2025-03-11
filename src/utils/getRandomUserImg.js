import { dummyUsers } from '../assets/data/dummyUsers';

export const setRandomUserImg = async (keyword) => {
    const accessKey = 'CnQXEEIJxs7vakHJPHpu6zT_3OjeGDjDXwxYYjJbBcU';
    const url = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const defalut = '../assets/images/icons/icon_etc.svg';

    if (data.results.length > 0) {
        // URL에 파라미터를 추가하여 해상도 조정 (width: 200px)
        return `${data.results[0].urls.small}&w=200`; // 이미지 너비를 200px로 조정
    } else {
        return defalut; // 이미지가 없을 경우 기본 이미지
    }
};

export const getRandomUserImg = async (participants) => {
    // participants가 배열인지 확인
    if (!Array.isArray(participants)) {
        console.error('participants는 배열이어야 합니다.');
        return []; // 또는 적절한 기본값을 반환할 수 있습니다.
    }

    const updatedParticipants = await Promise.all(
        participants.map(async (participant) => {
            if (participant.userImg === '') {
                const randomImg = await setRandomUserImg('일상 인물 사진');
                participant.userImg = randomImg; // 이미지를 업데이트
            }
            return participant;
        })
    );
    return updatedParticipants;
};
