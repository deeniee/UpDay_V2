import PicHabit from '../../assets/images/icons/pic_habit.svg';
import PicHealth from '../../assets/images/icons/pic_health.svg';
import PicStudy from '../../assets/images/icons/pic_study.svg';
import PicEtc from '../../assets/images/icons/pic_etc.svg';

import { getRandomParticipants } from '../../utils/getRandomParticipants';
import { dummyUsers } from './dummyUsers';
import { userData } from './userData';

export const CATEGORY_IMAGES = {
    습관: PicHabit,
    건강: PicHealth,
    학습: PicStudy,
    기타: PicEtc,
    default: '',
};

const allChallenges = [
    {
        id: 1,
        category: '건강',
        duration: '3개월',
        title: '아침 굶지 않기',
        content:
            '잠을 더 자겠다는 핑계로 아침을 굶어온 당신! 한 끼 식사가 아니어도 됩니다. 사과 반 쪽, 두유, 계란 등 움직일 에너지를 줄 아침을 챙겨먹어봐요. 일정한 식사 시간을 유지하고, 영양분을 골고루 섭취한다면 하루 동안 더 활기차고 집중력 있는 자신을 발견할 수 있을 거예요! 작은 변화가 몸과 마음에 긍정적인 영향을 줄 거예요. 아침 챙겨 먹기, 오늘부터 시작해볼까요?',
        authorId: 'healthylife@kakao.com',
        postDate: '2024-11-20T12:00:00',
        postClicked: 275,
        scrapCount: 12,
        likesCount: 27,
        participants: getRandomParticipants(dummyUsers, 7),
    },
    {
        id: 2,
        category: '습관',
        duration: '1개월',
        title: '커피 대신 따뜻한 차 마시기',
        content:
            '만성 피로에 매일 마셔댄 아아 때문에 위에 무리가 왔어요ㅠ 저와 함께 커피 대신 차를 마시며 몸을 챙겨봐요!',
        authorId: 'daymaker@naver.com',
        postDate: '2024-11-30T12:00:00',
        postClicked: 264,
        scrapCount: 50,
        likesCount: 82,
        participants: [
            ...getRandomParticipants(dummyUsers, 15),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2024-11-30T12:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: true,
            },
        ],
    },
    {
        id: 3,
        category: '기타',
        duration: '1개월',
        title: '매일 한 문장 글쓰기',
        content:
            '하루 한 문장씩 글을 쓰며 표현력을 길러보세요. 한 문장이 한 문단이 되고, 한 문단이 한 권의 책이 될지도 몰라요 :)',
        authorId: 'beawriter@gmail.com',
        postDate: '2024-11-30T19:00:00',
        postClicked: 75,
        scrapCount: 48,
        likesCount: 62,
        participants: getRandomParticipants(dummyUsers, 22),
    },
    {
        id: 4,
        category: '습관',
        duration: '3개월',
        title: '매일 10분 청소하기',
        content:
            '집이나 사무실 책상을 정리하여 깔끔한 환경을 유지해보세요! 알아요 쉽지 않다는 거... 하지만 하루 딱 10분! 10분만 투자해보세요. 주변환경을 깨끗이하면 집중력도 오를 거예요.',
        authorId: 'noyasik@kakao.com',
        postDate: '2024-12-01T02:00:00',
        postClicked: 158,
        scrapCount: 94,
        likesCount: 36,
        participants: getRandomParticipants(dummyUsers, 25),
    },
    {
        id: 5,
        category: '건강',
        duration: '6개월',
        title: '하루 30초 플랭크 챌린지',
        content:
            '처음에는 30초부터 시작해서 익숙해지면 점점 시간을 늘려봅시다! 코어 근육 강화 뿐만 아니라 전신 근력 향상과 바른 자세를 유지에도 도움이 됩니다. 자신을 위해 딱 30초만 투자하세요 :)',
        authorId: 'corecore@gmail.com',
        postDate: '2024-12-01T09:00:00',
        postClicked: 194,
        scrapCount: 32,
        likesCount: 45,
        participants: getRandomParticipants(dummyUsers, 10),
    },
    {
        id: 6,
        category: '기타',
        duration: '3개월',
        title: '매일 아침 5분간 명상하기',
        content:
            '오늘의 나를 정비하는 시간, 매일 아침 명상을 통해 이너피스를 찾아봅시다 :)',
        authorId: 'peacefulm2nd@gmail.com',
        postDate: '2024-12-01T13:00:00',
        postClicked: 140,
        scrapCount: 58,
        likesCount: 27,
        participants: [
            ...getRandomParticipants(dummyUsers, 11),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-01-02T22:00:00',
                clgJoin: true,
                clgDoing: true,
                clgDone: false,
            },
        ],
    },
    {
        id: 7,
        category: '학습',
        duration: '3개월',
        title: '경제 뉴스 한 줄 요약하기',
        content:
            '경제 흐름을 이해하는 가장 쉬운 방법! 하루 한 개의 경제 뉴스를 읽고 한 줄로 요약해보세요.',
        authorId: 'ecoclass@gmail.com',
        postDate: '2024-12-01T19:00:00',
        postClicked: 125,
        scrapCount: 30,
        likesCount: 20,
        participants: [
            ...getRandomParticipants(dummyUsers, 7),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-01-05T20:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: false,
            },
        ],
    },
    {
        id: 8,
        category: '기타',
        duration: '1개월',
        title: '사진으로 하루 기록하기',
        content:
            '1장, 2장, 3장, 기록하다 보면 어느새 30장! 1년 중 소중한 추억을 만들어봐요.',
        authorId: 'sugarfr22@kakao.com',
        postDate: '2024-12-02T21:00:00',
        postClicked: 252,
        scrapCount: 105,
        likesCount: 53,
        participants: getRandomParticipants(dummyUsers, 14),
    },
    {
        id: 9,
        category: '기타',
        duration: '3개월',
        title: '플라스틱 줄이기 실천',
        content:
            '일회용품 사용을 줄이고, 텀블러나 에코백을 활용해보세요! 일상 속에서 환경보호를 위해 조금씩 노력해봐요, 의외로 실천할 수 있는 게 많답니다.',
        authorId: 'luvplanet@kakao.com',
        postDate: '2024-12-07T11:00:00',
        postClicked: 208,
        scrapCount: 121,
        likesCount: 42,
        participants: getRandomParticipants(dummyUsers, 16),
    },
    {
        id: 10,
        category: '기타',
        duration: '3개월',
        title: '블로그 글 쓰기',
        content:
            '초등학교 때 방학 일기 밀려쓰던 사람? 그 사람이 바로 저예요. 작은 일이라도 블로그에 글로 쓰며 일상을 남겨봐요! 쌓이는 글을 보면 뿌듯해진답니다 :)',
        authorId: 'vloger@naver.com',
        postDate: '2024-12-10T11:00:00',
        postClicked: 211,
        scrapCount: 95,
        likesCount: 42,
        participants: getRandomParticipants(dummyUsers, 25),
    },
    {
        id: 11,
        category: '습관',
        duration: '1개월',
        title: '하루 한 끼 집밥 해먹기',
        content:
            '처음엔 귀찮을 수 있지만, 내 손으로 만드는 소중한 한 끼의 가치를 알게 되면 일상의 소소한 행복을 느낄 수 있어요. 1개월이면 자연스럽게 습관이 되어 장을 보러 가는게 일상이 되고, 어쩌면 하루 세 끼를 모두 집밥을 해먹는 날이 올 거랍니다 :)',
        authorId: '1mealathome@kakao.com',
        postDate: '2024-12-13T10:00:00',
        postClicked: 52,
        scrapCount: 78,
        likesCount: 54,
        participants: [
            ...getRandomParticipants(dummyUsers, 8),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-01-12T01:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: true,
            },
        ],
    },
    {
        id: 12,
        category: '건강',
        duration: '1개월',
        title: '점심 먹고 30분 이상 산책 하기',
        content:
            '식사 후 산책은 혈당조절에도 도움이 되고, 소화를 돕는다고 합니다. 추워도 굴하지 않고 걸어요!!',
        authorId: 'daymaker@naver.com',
        postDate: '2025-01-01T08:00:00',
        postClicked: 411,
        scrapCount: 37,
        likesCount: 120,
        participants: [
            ...getRandomParticipants(dummyUsers, 12),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-01-02T01:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: true,
            },
        ],
    },
    {
        id: 13,
        category: '기타',
        duration: '1개월',
        title: '주말마다 디지털 디톡스하기',
        content:
            '소중한 주말! 유튜브, 릴스, 틱톡에 시간을 허비하고 있지 않으신가요? 디지털에서 벗어나 온전한 휴식을 취하면, 수면의 질 향상과 집중력 회복 효과를 기대할 수 있답니다. 디지털 디톡스로 사랑하는 사람들과 더욱 의미있는 주말을 만들어가요!',
        authorId: 'detoxic@kakao.com',
        postDate: '2025-01-01T18:00:00',
        postClicked: 203,
        scrapCount: 194,
        likesCount: 132,
        participants: [
            ...getRandomParticipants(dummyUsers, 24),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-01-01T18:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: true,
            },
        ],
    },
    {
        id: 14,
        category: '학습',
        duration: '3개월',
        title: '하루 10쪽 독서하기',
        content:
            '하루에 딱 10쪽만 읽어도 한 달이면 한 권을 완독! 작은 습관이 큰 변화를 만든다! 짧은 시간 투자로 지식을 쌓고, 사고의 깊이를 키울 수 있어요. 독서는 집중력을 높이고, 창의적인 사고를 자극하는 최고의 방법입니다. 오늘부터 가볍게 시작해보고, 어느새 독서가 일상이 되는 변화를 경험해보세요.',
        authorId: '10page99@gmail.com',
        postDate: '2025-01-04T10:00:00',
        postClicked: 199,
        scrapCount: 60,
        likesCount: 94,
        participants: getRandomParticipants(dummyUsers, 15),
    },
    {
        id: 15,
        category: '건강',
        duration: '3개월',
        title: '설탕 없는 하루 보내기',
        content:
            '가공된 설탕이 들어간 음식 대신 자연식으로 하루를 보내보세요. 더 건강한 식습관을 만들어 봅시다!',
        authorId: 'sugarfr22@kakao.com',
        postDate: '2025-01-05T13:00:00',
        postClicked: 104,
        scrapCount: 12,
        likesCount: 27,
        participants: [
            ...getRandomParticipants(dummyUsers, 7),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-01-15T13:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: false,
            },
        ],
    },
    {
        id: 16,
        category: '건강',
        duration: '6개월',
        title: '매일 10분 스트레칭',
        content:
            '하루 10분만 투자해서 전신을 스트레칭해 보세요. 유연성과 혈액순환을 개선할 수 있어요. 긴장된 근육을 풀어주고, 하루 종일 쌓인 피로를 해소하는 데도 도움이 됩니다. 특히 앉아 있는 시간이 많은 분들에게 필수! 스트레칭으로 몸을 가볍게 만들어 활력 있는 하루를 시작해보세요.',
        authorId: 'luluralra@naver.com',
        postDate: '2025-01-07T07:00:00',
        postClicked: 224,
        scrapCount: 29,
        likesCount: 32,
        participants: getRandomParticipants(dummyUsers, 30),
    },
    {
        id: 17,
        category: '기타',
        duration: '1개월',
        title: '한 달 동안 불필요한 소비 줄이기 챌린지',
        content:
            '덮어놓고 쓰다보면 거지꼴을 못 면한다...! 이번 챌린지를 통해 본인의 소비 패턴을 파악하고, 절약하는 한 달을 보내봐요.',
        authorId: '5000won@naver.com',
        postDate: '2025-01-11T12:00:00',
        postClicked: 501,
        scrapCount: 130,
        likesCount: 215,
        participants: [
            ...getRandomParticipants(dummyUsers, 23),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-01-17T23:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: true,
            },
        ],
    },

    {
        id: 18,
        category: '학습',
        duration: '3개월',
        title: '2주에 책 1권씩 읽기',
        content:
            '숏폼에 빠져 책을 멀리하게 된 제 자신이 참... 근데 여러분도 그렇죠? 일단 얇은 책 부터 시작해서 책 읽는 재미를 들이고, 다음 책을 읽을 설렘이 생길 수 있도록 도전해봐요!',
        authorId: 'daymaker@naver.com',
        postDate: '2025-01-14T22:00:00',
        postClicked: 135,
        scrapCount: 63,
        likesCount: 42,
        participants: [
            ...getRandomParticipants(dummyUsers, 16),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-01-16T22:00:00',
                clgJoin: true,
                clgDoing: true,
                clgDone: false,
            },
        ],
    },
    {
        id: 19,
        category: '습관',
        duration: '6개월',
        title: '하루 물 2L 마시기',
        content:
            '건강을 위한 물 2L 마시기를 함께 해요! 물을 충분히 마시면 혈액 순환이 잘 되고, 피부가 촉촉하고 건강해 보일 수 있어요. 또 집중력과 기억력 향상에도 도움이 된다고 해요! 이번 챌린지를 통해 제대로 된 습관을 만들어봐요 :)',
        authorId: 'waterbank@naver.com',
        postDate: '2025-01-26T11:00:00',
        postClicked: 405,
        scrapCount: 199,
        likesCount: 164,
        participants: [
            ...getRandomParticipants(dummyUsers, 26),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-01-26T13:00:00',
                clgJoin: true,
                clgDoing: true,
                clgDone: false,
            },
        ],
    },
    {
        id: 20,
        category: '습관',
        duration: '3개월',
        title: '일찍 자기 챌린지',
        content:
            '수면 습관을 개선하기 위해 정해진 시간 전에 잠들어 보세요. 늦잠 자면 하루가 아쉬워 늦게 자게 되고, 그럼 또 늦잠을 자고... 무한 굴레... 저만 그런 거 아니죠? 이 굴레를 끊고 알찬 하루를 보내봐요 :)',
        authorId: 'peacefulm2nd@gmail.com',
        postDate: '2025-02-06T13:00:00',
        postClicked: 126,
        scrapCount: 107,
        likesCount: 65,
        participants: getRandomParticipants(dummyUsers, 29),
    },
    {
        id: 21,
        category: '기타',
        duration: '3개월',
        title: '매일 새로운 음악 듣기',
        content:
            '한 곡씩 새로운 음악을 찾아 듣고 느낌을 기록해보세요. 우연히 내 취향을 찾을 수 있을지 몰라요 :)',
        authorId: 'daymaker@naver.com',
        postDate: '2025-02-16T12:00:00',
        postClicked: 25,
        scrapCount: 45,
        likesCount: 96,
        participants: [
            ...getRandomParticipants(dummyUsers, 28),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-02-16T12:00:00',
                clgJoin: true,
                clgDoing: true,
                clgDone: false,
            },
        ],
    },
    {
        id: 22,
        category: '학습',
        duration: '3개월',
        title: '매일 1시간씩 영어 공부 챌린지',
        content:
            '매년 다짐만 하는 영어공부, 제대로 습관을 들이자!!! 단어 외우기? 문법? 이런 거 신경쓰지 말고 미드/영드 자막 없이 보기, 영어권 팟캐스트 듣기 등 자유롭게 공부해봐요!',
        authorId: 'english007@naver.com',
        postDate: '2025-02-18T13:00:00',
        postClicked: 372,
        scrapCount: 152,
        likesCount: 85,
        participants: [
            ...getRandomParticipants(dummyUsers, 22),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-03-11T13:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: true,
            },
        ],
    },

    {
        id: 23,
        category: '건강',
        duration: '6개월',
        title: '엘레베이터 대신 계단 챌린지',
        content:
            '일상 속에서 운동량을 늘리는 가장 쉬운 방법! 계단 오르기를 하면 하체 근력 강화, 심폐 지구력 증가, 칼로리 소모 효과까지 있어요. 작은 습관이 쌓여 건강한 라이프스타일을 만들어봅시다!',
        authorId: 'vloger@naver.com',
        postDate: '2025-02-21T07:00:00',
        postClicked: 64,
        scrapCount: 40,
        likesCount: 20,
        participants: getRandomParticipants(dummyUsers, 17),
    },
    {
        id: 24,
        category: '습관',
        duration: '1개월',
        title: '일주일에 하루 5천원으로 생활하기',
        content:
            '과소비는 그만! 5천원으로 살아보며 돈의 소중함을 다시 한 번 느낄 수 있어요.',
        authorId: '5000won@naver.com',
        postDate: '2025-02-28T12:00:00',
        postClicked: 248,
        scrapCount: 95,
        likesCount: 123,
        participants: getRandomParticipants(dummyUsers, 19),
    },
    {
        id: 25,
        category: '건강',
        duration: '2개월',
        title: '하루 10,000보 걷기',
        content:
            '가까운 거리는 걷기! 에스컬레이터 보단 계단! 10,000보를 채우는 재미를 느끼실 거예요.',
        authorId: 'walking10000@gmail.com',
        postDate: '2025-02-11T16:00:00',
        postClicked: 97,
        scrapCount: 34,
        likesCount: 40,
        joinDate: '2025-03-02T10:00:00',
        participants: [
            ...getRandomParticipants(dummyUsers, 12),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2024-11-30T12:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: true,
            },
        ],
    },
    {
        id: 26,
        category: '학습',
        duration: '3개월',
        title: '뉴스 기사 읽기',
        content:
            '최신 트렌드를 파악하기 위해 하루 한 개의 뉴스 기사를 읽어보세요. 여러 주제를 읽다보면 견문도 넓어질 거예요.',
        authorId: 'trendsetter@kakao.com',
        postDate: '2025-03-02T20:00:00',
        postClicked: 92,
        scrapCount: 30,
        likesCount: 8,
        participants: getRandomParticipants(dummyUsers, 10),
    },
    {
        id: 27,
        category: '기타',
        duration: '3개월',
        title: '일주일에 한 번 친구에게 연락하기',
        content:
            '무소식이 희소식이다 하고 살다보니 어느새 멀어진 것만 같은 친구들, 바쁜데 괜히 귀찮아할까 걱정하지 마세요. 분명 기뻐할 거예요. 사랑은 나누는 거랍니다 :)',
        authorId: 'daymaker@naver.com',
        postDate: '2025-03-03T19:00:00',
        postClicked: 159,
        scrapCount: 65,
        likesCount: 105,
        participants: [
            ...getRandomParticipants(dummyUsers, 17),
            {
                userId: 'daymaker@naver.com',
                joinDate: '2025-03-03T19:00:00',
                clgJoin: true,
                clgDoing: false,
                clgDone: true,
            },
        ],
    },
    {
        id: 28,
        category: '학습',
        duration: '1개월',
        title: 'AI & 기술 트렌드 배우기',
        content:
            'AI, 블록체인, 클라우드, IoT 등 최신 IT 기술의 흐름을 따라가 보세요. 매일 하나의 기술 개념이나 업계 동향을 배우고, 이를 일상이나 업무에 어떻게 활용할 수 있을지 고민해보세요. 기술은 빠르게 발전해나가니, 꾸준한 학습으로 경쟁력을 높여봅시다.',
        authorId: 'detoxic@kakao.com',
        postDate: '2025-03-08T10:00:00',
        postClicked: 93,
        scrapCount: 12,
        likesCount: 5,
        participants: getRandomParticipants(dummyUsers, 4),
    },
];

export const dummyChallenges = allChallenges.map((challenge, index) => {
    const updatedParticipants = challenge.participants.map((participant) =>
        participant.userId !== userData.userId
            ? {
                  ...participant,
                  joinDate: challenge.postDate,
                  clgJoin: true,
                  clgDoing: true,
                  clgDone: false,
              }
            : participant
    );

    return {
        ...challenge,
        participants: updatedParticipants,
    };
});
