import { getRandomUserImg } from '../../utils/getRandomUserImg';

export const dummyUsers = [
    {
        userId: 'healthylife@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/muscular-man-pulling-training-apparatus-while-exercising-gym_7502-10715.jpg?t=st=1739202650~exp=1739206250~hmac=31033052238f6bdb7bee1a3ad900c1cd372867a7eed5129d02a4dc7ca250e102&w=900',
        nickname: '짐브로',
        signupDate: '2024-11-19T12:00:00',
        userIntroduction:
            '헬스 트레이너와 피트니스선수로 활동하고 있어요. 근육을 키우고 건강을 지키는 데 집중하고 있으니, 저와 함께 운동하며 성과를 나눠요!',
    },
    {
        userId: 'beawriter@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/census-information-town-composition_23-2148993118.jpg?t=st=1739202716~exp=1739206316~hmac=f796e92f98204fa64a14de7ec608484cc1ae0cf65ff3b080e3017758c7e39f65&w=900',
        nickname: '작가지망생',
        signupDate: '2024-11-20T00:00',
        userIntroduction:
            '글쓰기를 사랑하는 작가지망생입니다. 내일을 꿈꾸며 오늘도 글을 씁니다. 아이디어를 나누고 성장하고 싶어요.',
    },
    {
        userId: 'noyasik@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/front-view-smiley-man-with-sunglasses-city_23-2148682678.jpg?t=st=1739201514~exp=1739205114~hmac=c2197d8edea9268127367aca4c34215ba5dc718ca21124b0f949c798298498fb&w=1480',
        nickname: '야식러버',
        signupDate: '2024-11-20T00:00',
        userIntroduction:
            '요즘 들어 건강이 걱정되기 시작했어요. 식습관을 고치고, 건강을 되찾고 싶습니다. 함께 하실 분?',
    },
    {
        userId: 'corecore@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/blonde-girl-standing-stretching-hands-lock-breezing_651396-2062.jpg?t=st=1739201906~exp=1739205506~hmac=74739058ebe6752c084c694333cd763c0858bb09ab5b5415d37616f490b52fcd&w=1480',
        nickname: '머슬코어',
        signupDate: '2024-12-01T00:00',
        userIntroduction:
            '건강하고 강한 몸을 위해 끊임없이 노력하는 중입니다. 서로의 운동 루틴을 공유해요 :)',
    },
    {
        userId: 'peacefulm2nd@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/man-posing-indoors-black-white-medium-shot_23-2149652002.jpg?t=st=1739201595~exp=1739205195~hmac=1ca3c994cf289903e8e5f4e17d404dbf649a66c2a6f14a1c194933b0044b9e97&w=900',
        nickname: '부지런2',
        signupDate: '2024-12-01T00:00',
        userIntroduction:
            '매일 꾸준히, 부지런히 살아가는 부지런2입니다. 작은 목표들을 하나씩 이루어가며 더 나은 내가 되기 위해 노력 중입니다.',
    },
    {
        userId: 'ecoclass@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/happy-dog-having-fun-park_23-2147997356.jpg?t=st=1739204011~exp=1739207611~hmac=48fa62508a9e88e7eee585b5649c67509b4ccbd6a12ebe0d1f23ac6270e2aed7&w=1480',
        nickname: '이코노미야끼',
        signupDate: '2024-12-01T10:00:00',
        userIntroduction:
            '자연과 건강한 식습관을 사랑하는 이코노미야끼입니다. 합리적인 소비로 맛있고 건강한 요리를 통해 삶을 풍요롭게 만들어요.',
    },
    {
        userId: 'sugarfr22@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/woman-with-notebook-pen-medium-shot_23-2148960417.jpg?t=st=1739201282~exp=1739204882~hmac=779dd4b986c90cfde72c7f3f8d1911bc6443fcd8f534c40c58f73cb8e8df338a&w=900',
        nickname: '슈가프리',
        signupDate: '2024-12-02T10:00:00',
        userIntroduction:
            '일상을 기록하고 추억을 남기는 슈가프리입니다. 매일의 소중한 순간을 기록하며 행복을 찾아요. 현재 사진작가를 준비 중 입니다.',
    },
    {
        userId: 'luvplanet@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/middle-age-woman-smiling-having-good-time_23-2149218572.jpg?t=st=1739204125~exp=1739207725~hmac=9a4224bbd83418f763da7cf1740f4ef8fe63518e5bac3c6b43256fa2cb7c9e9b&w=1480',
        nickname: '러브플래닛',
        signupDate: '2024-12-07T09:00:00',
        userIntroduction:
            '세상을 사랑하고 긍정적인 에너지를 전하고 싶어요. 세상에 대한 사랑을 함께 나누며 살아가요!',
    },
    {
        userId: 'vloger@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/shiba-inu-dog-taking-walk_23-2149478698.jpg?t=st=1739203725~exp=1739207325~hmac=0683b09f8f576e2cc4b54c6fd33410cba37791de29c96ed94a47414d62e694c4&w=1480',
        nickname: '꾸준해꾸',
        signupDate: '2024-12-10T01:00:00',
        userIntroduction:
            '꾸준한 노력! 매일 조금씩 발전해 나가고 있어요. 함께 성장하는 친구들이 필요해요! 좋은 챌린지 함께해요.',
    },
    {
        userId: '1mealathome@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/portrait-young-woman-by-sea_23-2148140860.jpg?t=st=1739203282~exp=1739206882~hmac=c0da64cf22c4a7f67bbe30c486f2e48c90beaf1832f92e15a59b5b040786624a&w=1480',
        nickname: '집밥박선생',
        signupDate: '2024-12-12T00:00:00',
        userIntroduction:
            '집에서 간편하게 맛있는 식사를 준비하는 집밥박선생입니다. 맛있고 건강한 집밥 레시피를 공유하고 싶어요!',
    },
    {
        userId: 'detoxic@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/medium-shot-woman-drinking-kombucha_23-2150171564.jpg?t=st=1739201650~exp=1739205250~hmac=19e5a0bb5e8966b1c9f11530fd69090607d4e182c633d62f08197048f8ca4a66&w=900',
        nickname: '얼리어답터',
        signupDate: '2025-01-01T12:00:00',
        userIntroduction:
            '최신 트렌드와 기술에 관심이 많아요. 요즘은 AI에 관심이 많아요. 새로운 것에 도전하고, 발견하며 배워가는 재미가 최고죠.',
    },
    {
        userId: '10page99@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/beautiful-lake-ritsa-caucasus-mountains-green-mountain-hills-blue-sky-with-clouds-spring-landscape_1217-1716.jpg?t=st=1739202882~exp=1739206482~hmac=16f2c746f2f3e5d90aa65ccf92e726a483b7c278c36929f8720a54c6fbf835d0&w=1480',
        nickname: '책벌레99',
        signupDate: '2025-01-02T10:00:00',
        userIntroduction:
            '책을 사랑하는 사람입니다. 독서를 다시 시작한 지 얼마 안 되었지만, 독서의 장점을 매순간 느끼고 있어요. 다양한 책을 읽고, 새로운 지식과 경험을 쌓으며 성장하는 걸 좋아합니다.',
    },
    {
        userId: 'luluralra@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/young-woman-arranging-her-cake-shop_23-2149210420.jpg?t=st=1739201687~exp=1739205287~hmac=aa0ffed50c792f059dc7287bfc1b9113eb672f4a9c2e4b6cd1fd64d88771b183&w=1480',
        nickname: '룰루라이프',
        signupDate: '2025-01-05T10:00:00',
        userIntroduction:
            '케이크와 디저트를 사랑하는 룰루라이프입니다. 달콤한 인생을 살아가고 있어요.',
    },
    {
        userId: '5000won@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/big-trees-through-window_23-2147770340.jpg?t=st=1739204423~exp=1739208023~hmac=dccc98885f6bf6552dfc32233f07b64fe371e850bf652575848db4489ce5d761&w=1480',
        nickname: '오천원의행복',
        signupDate: '2025-01-02T10:00:00',
        userIntroduction:
            '작은 행복이 큰 행복을 만든다고 믿는 사람입니다. 요즘 고민은 절약! 아끼는 습관을 요즘 행복으로 생각하고 있어요. 이런저런 것에 도전하며 소소한 일상 속에서 진짜 행복을 찾아가고 있어요.',
    },
    {
        userId: 'waterbank@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/koh-nangyuan-surat-thani-thailand-koh-nangyuan-is-one-most-beautiful-beaches-thailand_1258-728.jpg?t=st=1739204350~exp=1739207950~hmac=222207ea95c801a15db5f6b4b1073dccb23a4465833b8d1b64db42a99f677807&w=996',
        nickname: '물안먹는하마',
        signupDate: '2025-01-20T10:00:00',
        userIntroduction:
            '물에서 노는 건 좋아하지만 물은 잘 안 마시는 물안먹는하마입니다.',
    },
    {
        userId: 'english007@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/owner-petting-adorable-cat_23-2148740483.jpg?t=st=1739203665~exp=1739207265~hmac=af0bc96c86dc97f7f4dbc390937ff93ce5d8795fff54d97539c55fa531dd9a14&w=1480',
        nickname: '아임파인땡큐',
        signupDate: '2025-01-24T10:00:00',
        userIntroduction:
            '긍정적인 마음을 가지고, 감사하는 마음으로 살아가고 있어요. 어려운 순간에도 긍정적인 에너지를 나누고 싶어요!',
    },
    {
        userId: 'walking10000@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/young-beautiful-woman-walks-street-paris-background-triumphal-arch-concept-happy-travel-photo_1321-3474.jpg?t=st=1739202472~exp=1739206072~hmac=460438cb55078540932c06eaa525fc6faa48f05ee0337e8e3bfc4af543fb1d85&w=900',
        nickname: '만보르기니',
        signupDate: '2025-02-01T10:00:00',
        userIntroduction:
            '건강 검진 후 충격받고 활동량을 늘리고 있어요! 좋은 운동 루틴 추천 해주실 분?',
    },
    {
        userId: 'trendsetter@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/back-view-brunette-girl-light-blue-dress_23-2148238245.jpg?t=st=1739203378~exp=1739206978~hmac=7d1163f4d39a9b68d135caee6fef5bae3941bf46cba16f965cc2937e648364a2&w=900',
        nickname: '트렌드세터',
        signupDate: '2025-02-01T10:00:00',
        userIntroduction:
            '늘 새로운 것을 시도하는 걸 즐깁니다. 패션과 문화, 기술 등 나만의 흥미를 찾아 나서고 있어요.',
    },
    {
        userId: 'test02@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/selfie-portrait-videocall_23-2149186161.jpg?t=st=1741681520~exp=1741685120~hmac=ba2973830572b894c2c0c632638ea829f83c3b2d81556fe0cf67f784ffce7e57&w=1480',
        nickname: 'morningstar',
        userIntroduction: '긍정적인 마인드로! 작은 변화가 큰 성장을 만든다.',
        signupDate: '2025-01-02',
    },
    {
        userId: 'test03@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/close-up-happy-couple-taking-selfie_23-2148824537.jpg?t=st=1741682021~exp=1741685621~hmac=c4f9f8ef8d375a8ccf9513592a70d192f47c039dfc512467f5153373619d80ef&w=1480',
        nickname: 'sunnyday',
        userIntroduction: '하루하루 성장하는 중!',
        signupDate: '2025-01-03',
    },
    {
        userId: 'test04@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/young-asian-teenager-standing-park_23-2148208932.jpg?t=st=1741681994~exp=1741685594~hmac=a12a0e23de960cac63e4389c50267912a008da3614f3bbc3c87f01f6e263f9f0&w=996',
        nickname: 'xmsxms4',
        userIntroduction: '매일 더 나은 하루를 위해',
        signupDate: '2025-01-04',
    },
    {
        userId: 'test05@naver.com',
        userImg: '',
        nickname: 'skyblue',
        userIntroduction: '운동하며 삶의 균형을 찾는 중',
        signupDate: '2025-01-05',
    },
    {
        userId: 'test06@daum.net',
        userImg: '',
        nickname: 'greenforest',
        userIntroduction:
            '독서를 좋아하는 사람.한 달에 최소 3권은 읽으려고 노력해요.\n좋은 책 추천해주시면 감사해요!',
        signupDate: '2025-01-06',
    },
    {
        userId: 'test07@gmail.com',
        userImg: '',
        nickname: 'happyfeet',
        userIntroduction:
            '매일 만보 걷기 챌린지 도전 중! 꾸준함이 최고의 무기다.',
        signupDate: '2025-01-07',
    },
    {
        userId: 'test08@naver.com',
        userImg: '',
        nickname: 'caffeineaddict',
        userIntroduction: '커피 없이 못 사는 직장인',
        signupDate: '2025-01-08',
    },
    {
        userId: 'test09@daum.net',
        userImg: '',
        nickname: 'bookworm',
        userIntroduction: '올해 100권 읽기 목표!',
        signupDate: '2025-01-09',
    },
    {
        userId: 'test10@gmail.com',
        userImg: '',
        nickname: 'earlybird',
        userIntroduction: '새벽 기상 챌린지 도전 중',
        signupDate: '2025-01-10',
    },
    {
        userId: 'test11@naver.com',
        userImg: '',
        nickname: 'codewizard',
        userIntroduction:
            '매일 한 줄씩 코딩하는 습관 어제보다 나은 개발자가 되는 중입니다.',
        signupDate: '2025-01-11',
    },
    {
        userId: 'test12@daum.net',
        userImg: '',
        nickname: 'fitlife',
        userIntroduction:
            '홈트레이닝 챌린지 중!\n헬스장보다 집에서 운동하는 게 편하네요. 운동 루틴 추천받습니다!',
        signupDate: '2025-01-12',
    },
    {
        userId: 'test13@gmail.com',
        userImg: '',
        nickname: 'traveler',
        userIntroduction: '세계 여행을 꿈꾸는 중',
        signupDate: '2025-01-13',
    },
    {
        userId: 'test14@naver.com',
        userImg: '',
        nickname: 'meditation',
        userIntroduction: '마음의 평화를 찾고 싶어요',
        signupDate: '2025-01-14',
    },
    {
        userId: 'test15@daum.net',
        userImg: '',
        nickname: 'veganpower',
        userIntroduction: '건강한 식습관을 위한 도전!',
        signupDate: '2025-01-15',
    },
];

export const updateUserImages = async (users) => {
    const updatedUsers = await Promise.all(
        users.map(async (user) => {
            if (user.userImg === '') {
                // 이미지가 비어있다면 랜덤 이미지를 가져옴
                const randomImg = await getRandomUserImg([user]); // 배열로 전달
                user.userImg = randomImg[0].userImg; // userImg에 이미지 URL을 할당
            }
            return user;
        })
    );

    return updatedUsers;
};
