const BASE_URL = 'https://api.dicebear.com/7.x/pixel-art/svg?seed=';

export const dummyUsers = [
    {
        userId: 'healthylife@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/muscular-man-pulling-training-apparatus-while-exercising-gym_7502-10715.jpg?t=st=1739202650~exp=1739206250~hmac=31033052238f6bdb7bee1a3ad900c1cd372867a7eed5129d02a4dc7ca250e102&w=900',
        nickname: '짐브로',
        signupDate: '2024-11-19T12:00:00',
    },
    {
        userId: 'beawriter@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/census-information-town-composition_23-2148993118.jpg?t=st=1739202716~exp=1739206316~hmac=f796e92f98204fa64a14de7ec608484cc1ae0cf65ff3b080e3017758c7e39f65&w=900',
        nickname: '작가지망생',
        signupDate: '2024-11-20T00:00',
    },
    {
        userId: 'noyasik@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/front-view-smiley-man-with-sunglasses-city_23-2148682678.jpg?t=st=1739201514~exp=1739205114~hmac=c2197d8edea9268127367aca4c34215ba5dc718ca21124b0f949c798298498fb&w=1480',
        nickname: '야식러버',
        signupDate: '2024-11-20T00:00',
    },
    {
        userId: 'corecore@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/blonde-girl-standing-stretching-hands-lock-breezing_651396-2062.jpg?t=st=1739201906~exp=1739205506~hmac=74739058ebe6752c084c694333cd763c0858bb09ab5b5415d37616f490b52fcd&w=1480',
        nickname: '머슬코어',
        signupDate: '2024-12-01T00:00',
    },
    {
        userId: 'peacefulm2nd@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/man-posing-indoors-black-white-medium-shot_23-2149652002.jpg?t=st=1739201595~exp=1739205195~hmac=1ca3c994cf289903e8e5f4e17d404dbf649a66c2a6f14a1c194933b0044b9e97&w=900',
        nickname: '부지런2',
        signupDate: '2024-12-01T00:00',
    },
    {
        userId: 'ecoclass@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/happy-dog-having-fun-park_23-2147997356.jpg?t=st=1739204011~exp=1739207611~hmac=48fa62508a9e88e7eee585b5649c67509b4ccbd6a12ebe0d1f23ac6270e2aed7&w=1480',
        nickname: '이코노미야끼',
        signupDate: '2024-12-01T10:00:00',
    },
    {
        content:
            '1장, 2장, 3장, 기록하다 보면 어느새 30장! 1년 중 소중한 추억을 만들어봐요.',
        userId: 'sugarfr22@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/woman-with-notebook-pen-medium-shot_23-2148960417.jpg?t=st=1739201282~exp=1739204882~hmac=779dd4b986c90cfde72c7f3f8d1911bc6443fcd8f534c40c58f73cb8e8df338a&w=900',
        nickname: '슈가프리',
        signupDate: '2024-12-02T10:00:00',
    },
    {
        userId: 'luvplanet@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/middle-age-woman-smiling-having-good-time_23-2149218572.jpg?t=st=1739204125~exp=1739207725~hmac=9a4224bbd83418f763da7cf1740f4ef8fe63518e5bac3c6b43256fa2cb7c9e9b&w=1480',
        nickname: '러브플래닛',
        signupDate: '2024-12-07T09:00:00',
    },
    {
        userId: 'vloger@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/shiba-inu-dog-taking-walk_23-2149478698.jpg?t=st=1739203725~exp=1739207325~hmac=0683b09f8f576e2cc4b54c6fd33410cba37791de29c96ed94a47414d62e694c4&w=1480',
        nickname: '꾸준해꾸',
        signupDate: '2024-12-10T01:00:00',
    },
    {
        userId: '1mealathome@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/portrait-young-woman-by-sea_23-2148140860.jpg?t=st=1739203282~exp=1739206882~hmac=c0da64cf22c4a7f67bbe30c486f2e48c90beaf1832f92e15a59b5b040786624a&w=1480',
        nickname: '집밥박선생',
        signupDate: '2024-12-12T00:00:00',
    },
    {
        userId: 'detoxic@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/medium-shot-woman-drinking-kombucha_23-2150171564.jpg?t=st=1739201650~exp=1739205250~hmac=19e5a0bb5e8966b1c9f11530fd69090607d4e182c633d62f08197048f8ca4a66&w=900',
        nickname: '얼리어답터',
        signupDate: '2025-01-01T12:00:00',
    },
    {
        userId: '10page99@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/beautiful-lake-ritsa-caucasus-mountains-green-mountain-hills-blue-sky-with-clouds-spring-landscape_1217-1716.jpg?t=st=1739202882~exp=1739206482~hmac=16f2c746f2f3e5d90aa65ccf92e726a483b7c278c36929f8720a54c6fbf835d0&w=1480',
        nickname: '책벌레99',
        signupDate: '2025-01-02T10:00:00',
    },
    {
        userId: 'luluralra@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/young-woman-arranging-her-cake-shop_23-2149210420.jpg?t=st=1739201687~exp=1739205287~hmac=aa0ffed50c792f059dc7287bfc1b9113eb672f4a9c2e4b6cd1fd64d88771b183&w=1480',
        nickname: '룰루라이프',
        signupDate: '2025-01-05T10:00:00',
    },
    {
        userId: '5000won@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/big-trees-through-window_23-2147770340.jpg?t=st=1739204423~exp=1739208023~hmac=dccc98885f6bf6552dfc32233f07b64fe371e850bf652575848db4489ce5d761&w=1480',
        nickname: '오천원의행복',
        signupDate: '2025-01-02T10:00:00',
    },
    {
        userId: 'waterbank@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/koh-nangyuan-surat-thani-thailand-koh-nangyuan-is-one-most-beautiful-beaches-thailand_1258-728.jpg?t=st=1739204350~exp=1739207950~hmac=222207ea95c801a15db5f6b4b1073dccb23a4465833b8d1b64db42a99f677807&w=996',
        nickname: '물안먹는하마',
        signupDate: '2025-01-20T10:00:00',
    },
    {
        userId: 'english007@naver.com',
        userImg:
            'https://img.freepik.com/free-photo/owner-petting-adorable-cat_23-2148740483.jpg?t=st=1739203665~exp=1739207265~hmac=af0bc96c86dc97f7f4dbc390937ff93ce5d8795fff54d97539c55fa531dd9a14&w=1480',
        nickname: '아임파인땡큐',
        signupDate: '2025-01-24T10:00:00',
    },
    {
        userId: 'walking10000@gmail.com',
        userImg:
            'https://img.freepik.com/free-photo/young-beautiful-woman-walks-street-paris-background-triumphal-arch-concept-happy-travel-photo_1321-3474.jpg?t=st=1739202472~exp=1739206072~hmac=460438cb55078540932c06eaa525fc6faa48f05ee0337e8e3bfc4af543fb1d85&w=900',
        nickname: '만보르기니',
        signupDate: '2025-02-01T10:00:00',
    },
    {
        userId: 'trendsetter@kakao.com',
        userImg:
            'https://img.freepik.com/free-photo/back-view-brunette-girl-light-blue-dress_23-2148238245.jpg?t=st=1739203378~exp=1739206978~hmac=7d1163f4d39a9b68d135caee6fef5bae3941bf46cba16f965cc2937e648364a2&w=900',
        nickname: '트렌드세터',
        signupDate: '2025-02-01T10:00:00',
    },
    {
        userId: 'test02@naver.com',
        userNickname: 'morningstar',
        userImg:
            'https://img.freepik.com/free-photo/selfie-portrait-videocall_23-2149186161.jpg?t=st=1741681520~exp=1741685120~hmac=ba2973830572b894c2c0c632638ea829f83c3b2d81556fe0cf67f784ffce7e57&w=1480',
        userIntroduction: '긍정적인 마인드로! 작은 변화가 큰 성장을 만든다.',
        signupDate: '2025-01-02',
    },
    {
        userId: 'test03@gmail.com',
        userNickname: 'sunnyday',
        userImg:
            'https://img.freepik.com/free-photo/close-up-happy-couple-taking-selfie_23-2148824537.jpg?t=st=1741682021~exp=1741685621~hmac=c4f9f8ef8d375a8ccf9513592a70d192f47c039dfc512467f5153373619d80ef&w=1480',
        userIntroduction: '하루하루 성장하는 중!',
        signupDate: '2025-01-03',
    },
    {
        userId: 'test04@gmail.com',
        userNickname: 'xmsxms4',
        userImg:
            'https://img.freepik.com/free-photo/young-asian-teenager-standing-park_23-2148208932.jpg?t=st=1741681994~exp=1741685594~hmac=a12a0e23de960cac63e4389c50267912a008da3614f3bbc3c87f01f6e263f9f0&w=996',
        userIntroduction: '매일 더 나은 하루를 위해',
        signupDate: '2025-01-04',
    },
    {
        userId: 'test05@naver.com',
        userNickname: 'skyblue',
        userImg: '',
        userIntroduction: '운동하며 삶의 균형을 찾는 중',
        signupDate: '2025-01-05',
    },
    {
        userId: 'test06@daum.net',
        userNickname: 'greenforest',
        userImg: '',
        userIntroduction:
            '독서를 좋아하는 사람.한 달에 최소 3권은 읽으려고 노력해요.\n좋은 책 추천해주시면 감사해요!',
        signupDate: '2025-01-06',
    },
    {
        userId: 'test07@gmail.com',
        userNickname: 'happyfeet',
        userImg: '',
        userIntroduction:
            '매일 만보 걷기 챌린지 도전 중! 꾸준함이 최고의 무기다.',
        signupDate: '2025-01-07',
    },
    {
        userId: 'test08@naver.com',
        userNickname: 'caffeineaddict',
        userImg: '',
        userIntroduction: '커피 없이 못 사는 직장인',
        signupDate: '2025-01-08',
    },
    {
        userId: 'test09@daum.net',
        userNickname: 'bookworm',
        userImg: '',
        userIntroduction: '올해 100권 읽기 목표!',
        signupDate: '2025-01-09',
    },
    {
        userId: 'test10@gmail.com',
        userNickname: 'earlybird',
        userImg: '',
        userIntroduction: '새벽 기상 챌린지 도전 중',
        signupDate: '2025-01-10',
    },
    {
        userId: 'test11@naver.com',
        userNickname: 'codewizard',
        userImg: '',
        userIntroduction:
            '매일 한 줄씩 코딩하는 습관 어제보다 나은 개발자가 되는 중입니다.',
        signupDate: '2025-01-11',
    },
    {
        userId: 'test12@daum.net',
        userNickname: 'fitlife',
        userImg: '',
        userIntroduction:
            '홈트레이닝 챌린지 중!\n헬스장보다 집에서 운동하는 게 편하네요. 운동 루틴 추천받습니다!',
        signupDate: '2025-01-12',
    },
    {
        userId: 'test13@gmail.com',
        userNickname: 'traveler',
        userImg: '',
        userIntroduction: '세계 여행을 꿈꾸는 중',
        signupDate: '2025-01-13',
    },
    {
        userId: 'test14@naver.com',
        userNickname: 'meditation',
        userImg: '',
        userIntroduction: '마음의 평화를 찾고 싶어요',
        signupDate: '2025-01-14',
    },
    {
        userId: 'test15@daum.net',
        userNickname: 'veganpower',
        userImg: '',
        userIntroduction: '건강한 식습관을 위한 도전!',
        signupDate: '2025-01-15',
    },
    {
        userId: 'test16@gmail.com',
        userNickname: 'techgeek',
        userImg: '',
        userIntroduction:
            '새로운 기술 배우는 게 좋아요.요즘은 AI와 블록체인에 관심이 많아요.',
        signupDate: '2025-01-16',
    },
    {
        userId: 'test17@naver.com',
        userNickname: 'writinghabit',
        userImg: '',
        userIntroduction:
            '매일 글 쓰는 습관 만들기, 짧아도 괜찮아, 중요한 건 꾸준함!',
        signupDate: '2025-01-17',
    },
    {
        userId: 'test18@daum.net',
        userNickname: 'yogamaster',
        userImg: '',
        userIntroduction:
            '요가로 몸과 마음을 단련 중\n아침 요가 20분 실천하기!',
        signupDate: '2025-01-18',
    },
    {
        userId: 'test19@gmail.com',
        userNickname: 'musiclover',
        userImg: '',
        userIntroduction:
            '하루 한 곡 추천하는 블로거.음악이 삶을 풍요롭게 한다고 믿어요.',
        signupDate: '2025-01-19',
    },
    {
        userId: 'test20@naver.com',
        userNickname: 'mindful',
        userImg: '',
        userIntroduction: '매 순간을 소중히! 디지털 디톡스를 실천 중입니다.',
        signupDate: '2025-01-20',
    },
];

dummyUsers.forEach((user) => {
    if (user.userImg === '') {
        return `${BASE_URL}${user.userNickname}`;
    }
});
