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
            '만성 피로에 매일 마셔댄 아아 때문에 위에 무리가 왔어요ㅠ 저와 함께 커피 대신 차를 마시며 몸을 챙겨봐요! 커피 대신 따뜻한 차 한 잔으로 하루를 시작하거나 마무리해보세요. 커피는 과도한 카페인 섭취로 인해 위에 부담을 줄 수 있지만, 녹차나 허브차 같은 차 종류는 몸을 따뜻하게 해주고, 스트레스를 완화하며, 심지어 항산화 효과도 기대할 수 있습니다. 차의 향과 따뜻함은 마음을 안정시켜주는 효과도 있으니, 커피를 잠시 내려놓고 몸과 마음에 편안함을 선사하는 차를 마시는 습관을 만들어 봅시다.',
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
        category: '습관',
        duration: '3개월',
        title: '매일 10분 청소하기',
        content:
            '집이나 사무실 책상을 정리하여 깔끔한 환경을 유지해보세요! 알아요 쉽지 않다는 거... 하지만 정리되지 않은 공간은 생각보다 우리의 집중력과 기분에 많은 영향을 줍니다. 어지러진 책상에서 일하거나 정리되지 않은 방에서 쉬면 스트레스가 높아질 수 있어요. 단 10분만 투자해 작은 정리를 시작해보세요! 작은 공간부터 차근차근 정리하다 보면 어느새 쾌적한 환경을 만들 수 있습니다. 오늘은 책상 위를 정리하고, 내일은 서랍 속을 정리하는 식으로 진행해보는 건 어떨까요? 깔끔한 공간에서 생활하는 습관은 여러분의 생산성을 높여줄 거예요.',
        authorId: 'noyasik@kakao.com',
        postDate: '2024-12-01T02:00:00',
        postClicked: 158,
        scrapCount: 94,
        likesCount: 36,
        participants: getRandomParticipants(dummyUsers, 25),
    },

    {
        id: 4,
        category: '기타',
        duration: '3개월',
        title: '매일 아침 5분간 명상하기',
        content:
            '하루를 시작하기 전, 오늘의 나를 정비하는 시간을 가져봐요 :) 단 5분간 자신을 위한 시간을 가져보세요. 명상은 스트레스를 줄이고 집중력을 높이는 데 큰 도움이 됩니다. 조용한 공간에서 눈을 감고 호흡에 집중해 보세요. 처음에는 잡념이 많을 수 있지만, 꾸준히 연습하면 점점 마음이 차분해지는 것을 느낄 수 있습니다. 바쁜 일상 속에서도 마음의 여유를 찾고 싶은 분들에게 강력 추천하는 습관이에요.',
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
        id: 5,
        category: '학습',
        duration: '3개월',
        title: '경제 뉴스 한 줄 요약하기',
        content:
            '경제 뉴스는 어렵게 느껴질 수 있지만, 핵심 내용을 한 줄로 정리하는 습관을 들이면 흐름을 쉽게 파악할 수 있어요.매일 뉴스 기사를 하나 선정하고, 중요한 내용을 요약해보세요. 예를 들어 "한국은행 기준금리 0.25% 인상, 대출금리 부담 증가 예상"처럼 짧고 명확하게 정리하는 것이 중요합니다. 이 습관을 꾸준히 실천하면 경제를 이해하는 힘이 길러지고, 금융 감각도 자연스럽게 향상될 거예요!',
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
        id: 6,
        category: '기타',
        duration: '3개월',
        title: '플라스틱 줄이기 실천',
        content:
            '지구 환경을 지키는 작은 실천, 오늘부터 시작해보세요! 💚🌎 플라스틱 컵 대신 텀블러를 사용하고, 장 볼 때는 비닐봉투 대신 에코백을 챙겨보세요. 음식을 포장할 때도 일회용 용기 대신 다회용 용기를 가져가는 습관을 들이면 환경 보호에 큰 도움이 됩니다. 우리가 쓰는 플라스틱은 결국 우리의 생활 환경으로 돌아온다는 사실을 기억하며, 작은 습관부터 실천해볼까요? 의외로 실천할 수 있는 게 많답니다.',
        authorId: 'luvplanet@kakao.com',
        postDate: '2024-12-07T11:00:00',
        postClicked: 208,
        scrapCount: 121,
        likesCount: 42,
        participants: getRandomParticipants(dummyUsers, 16),
    },
    {
        id: 7,
        category: '건강',
        duration: '1개월',
        title: '점심 먹고 30분 이상 산책 하기',
        content:
            '식사 후 산책은 혈당조절에도 도움이 되고, 소화를 돕는다고 합니다. 추워도 굴하지 않고 걸어요!!',
        authorId: 'walking10000@gmail.com',
        postDate: '2025-01-01T08:00:00',
        postClicked: 411,
        scrapCount: 37,
        likesCount: 120,
        participants: [...getRandomParticipants(dummyUsers, 12)],
    },
    {
        id: 8,
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
        participants: [...getRandomParticipants(dummyUsers, 24)],
    },
    {
        id: 9,
        category: '학습',
        duration: '3개월',
        title: '하루 10쪽 독서하기',
        content:
            '하루에 딱 10쪽만 읽어도 한 달이면 한 권을 완독!📚 작은 습관이 큰 변화를 만든다! 짧은 시간 투자로 지식을 쌓고, 사고의 깊이를 키울 수 있어요. 독서는 집중력을 높이고, 창의적인 사고를 자극하는 최고의 방법입니다. 오늘부터 가볍게 시작해보고, 어느새 독서가 일상이 되는 변화를 경험해보세요.',
        authorId: '10page99@gmail.com',
        postDate: '2025-01-04T10:00:00',
        postClicked: 199,
        scrapCount: 60,
        likesCount: 94,
        participants: getRandomParticipants(dummyUsers, 15),
    },
    {
        id: 10,
        category: '건강',
        duration: '3개월',
        title: '설탕 없는 하루 보내기',
        content:
            '가공된 설탕이 들어간 음식 대신 자연식으로 하루를 보내보세요. 정제탄수화물도 줄이면 더더욱 좋아요! 더 건강한 식습관을 만들어 봅시다!',
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
        id: 11,
        category: '기타',
        duration: '1개월',
        title: '한 달 동안 불필요한 소비 줄이기 챌린지',
        content:
            '덮어놓고 쓰다보면 거지꼴을 못 면한다...! 충동 구매, 필요하지 않은 구독 서비스, 사용하지 않는 멤버십 등... 우리는 종종 불필요한 소비를 하면서도 인식하지 못하는 경우가 많아요. 이번 기회에 매일 소비 내역을 기록하고, 꼭 필요한 지출만 유지하는 습관을 길러보는 거예요. 절약은 단순히 돈을 아끼는 것이 아니라, 소비에 대한 가치관을 정립하는 과정이기도 해요. 한 달 후, 보다 현명한 소비 습관을 갖게 된 자신을 기대해보세요! 💰💡 ',
        authorId: '5000won@naver.com',
        postDate: '2025-01-11T12:00:00',
        postClicked: 501,
        scrapCount: 130,
        likesCount: 215,
        participants: [...getRandomParticipants(dummyUsers, 23)],
    },

    {
        id: 12,
        category: '학습',
        duration: '3개월',
        title: '2주에 책 1권씩 읽기',
        content:
            '숏폼에 빠져 책을 멀리하게 된 제 자신이 참... 근데 여러분도 그렇죠? 일단 얇은 책 부터 시작해서 책 읽는 재미를 들이고, 다음 책을 읽을 설렘이 생길 수 있도록 도전해봐요!',
        authorId: 'vloger@naver.com',
        postDate: '2025-01-14T22:00:00',
        postClicked: 135,
        scrapCount: 63,
        likesCount: 42,
        participants: [...getRandomParticipants(dummyUsers, 16)],
    },
    {
        id: 13,
        category: '습관',
        duration: '6개월',
        title: '하루 물 2L 마시기',
        content:
            '건강을 위한 물 2L 마시기를 함께 해요. 우리 몸의 60%는 물로 이루어져 있고, 충분한 수분 섭취는 건강 관리의 기본이에요. 하루 2L의 물을 마시면 피부가 촉촉해지고, 피로가 줄어들며, 집중력도 향상될 수 있어요. 하지만 한 번에 많이 마시는 것보다 조금씩 나누어 마시는 것이 중요합니다. 물병을 옆에 두고 틈틈이 수분을 섭취하는 습관을 들여보세요. 처음에는 어렵지만, 꾸준히 실천하면 몸도 점점 가벼워지고 활력이 생길 거예요! 이번 챌린지를 통해 제대로 된 습관을 만들어봐요 :)',
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
        id: 14,
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
        id: 15,
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
        id: 16,
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
        id: 17,
        category: '건강',
        duration: '6개월',
        title: '엘레베이터 대신 계단 챌린지',
        content:
            '계단 오르기는 일상 속에서 운동량을 늘리는 가장 쉬운 방법! 운동할 시간이 부족하다면, 일상 속에서 자연스럽게 움직일 수 있는 방법을 찾아보세요. 계단을 이용하는 것은 심폐 지구력을 키우고, 하체 근력을 강화하는 좋은 습관이에요. 처음에는 한 층만 계단으로 오르고, 점점 단계를 늘려가도 좋아요. 작은 변화가 쌓이면 건강한 습관이 됩니다. 오늘도 한 걸음 더 움직여봅시다!',
        authorId: 'vloger@naver.com',
        postDate: '2025-02-21T07:00:00',
        postClicked: 64,
        scrapCount: 40,
        likesCount: 20,
        participants: getRandomParticipants(dummyUsers, 17),
    },
    {
        id: 18,
        category: '습관',
        duration: '1개월',
        title: '일주일에 하루 5천원으로 생활하기',
        content:
            '과소비는 그만! 5천원으로 살아보며 돈의 소중함을 다시 한 번 느낄 수 있어요. 하루 5천 원으로 생활하려면 자연스럽게 지출을 줄이고 창의적으로 돈을 사용하는 방법을 고민하게 돼요. 도시락을 싸거나, 무료 문화생활을 찾아보거나, 대중교통 대신 걸어 다니는 등 다양한 절약 방법을 시도할 수 있어요. 이런 습관이 쌓이면 단순한 절약을 넘어서, 돈의 가치와 소비에 대한 새로운 인식을 가질 수 있습니다. 오늘은 5천 원으로 어떻게 알차게 보낼 수 있을까요? 댓글로 알려주세요.',
        authorId: '5000won@naver.com',
        postDate: '2025-02-28T12:00:00',
        postClicked: 248,
        scrapCount: 95,
        likesCount: 123,
        participants: getRandomParticipants(dummyUsers, 19),
    },
    {
        id: 19,
        category: '건강',
        duration: '2개월',
        title: '하루 10,000보 걷기',
        content:
            '가까운 거리는 걸어가고, 엘리베이터 대신 계단을 이용하며, 점심시간에 가벼운 산책을 하는 것만으로도 목표를 채울 수 있어요. 걷는 동안 좋아하는 음악을 듣거나, 오디오북을 들으면 더욱 즐거운 시간이 될 거예요:) ',
        authorId: 'walking10000@gmail.com',
        postDate: '2025-02-11T16:00:00',
        postClicked: 97,
        scrapCount: 34,
        likesCount: 40,
        joinDate: '2025-03-02T10:00:00',
        participants: [...getRandomParticipants(dummyUsers, 12)],
    },
    {
        id: 20,
        category: '학습',
        duration: '3개월',
        title: '뉴스 기사 읽기',
        content:
            '오늘은 어떤 뉴스가 우리 삶에 영향을 줄까요? 빠르게 변화하는 세상 속에서 최신 정보를 습득하는 것은 매우 중요해요. 하루 한 개의 뉴스 기사를 읽는 습관을 통해 정치, 경제, 과학, 문화 등 다양한 분야에 대한 시야를 넓힐 수 있어요. 단순히 읽는 것뿐만 아니라, 핵심 내용을 요약하거나, 자신의 의견을 정리해보는 것도 좋은 방법이에요. 신뢰할 수 있는 다양한 매체를 참고하고, 균형 잡힌 시각을 가지는 연습도 함께 해보세요.',
        authorId: 'trendsetter@kakao.com',
        postDate: '2025-03-02T20:00:00',
        postClicked: 92,
        scrapCount: 30,
        likesCount: 8,
        participants: getRandomParticipants(dummyUsers, 10),
    },
    {
        id: 21,
        category: '기타',
        duration: '3개월',
        title: '일주일에 한 번 친구에게 연락하기',
        content:
            '무소식이 희소식이다 하고 살다보니 어느새 멀어진 것만 같은 친구들, 바쁜데 괜히 귀찮아할까 걱정하지 마세요. 분명 기뻐할 거예요. 사랑은 나누는 거랍니다 :) 바쁜 일상 속에서 친구들과 연락하는 것이 점점 줄어들지만, 가끔이라도 먼저 연락하면 관계를 유지하는 데 큰 도움이 돼요. 꼭 특별한 일이 없어도 "잘 지내?"라는 한마디만으로도 충분해요. 전화 한 통, 짧은 메시지, 혹은 함께한 추억을 떠올리며 안부를 전해보세요. ',
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
];

export const dummyChallenges = allChallenges.map((challenge, index) => {
    const loggedInUser = userData[0]?.userId.trim(); // 현재 로그인한 사용자 ID

    const updatedParticipants = challenge.participants.map((participant) =>
        String(participant.userId).trim() === String(loggedInUser).trim()
            ? participant // 로그인한 사용자의 데이터는 그대로 둠
            : {
                  ...participant,
                  joinDate: challenge.postDate,
                  clgJoin: true,
                  clgDoing: true,
                  clgDone: false,
              }
    );

    return {
        ...challenge,
        participants: updatedParticipants,
    };
});
