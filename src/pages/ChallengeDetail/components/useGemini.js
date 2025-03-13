import { useState } from 'react';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

const useGemini = () => {
    const [loading, setLoading] = useState(false);

    const generateRecommendation = async (title, content) => {
        setLoading(true);
        let retryCount = 0;

        while (retryCount < MAX_RETRIES) {
            try {
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: 'user',
                                parts: [
                                    {
                                        text: `제목: ${title}\n내용: ${content}\n 을 바탕으로 50~100자의 챌린지 후기를 새로운 관점에서 일상적인 대화체로 작성해줘.
                                        텍스트 앞에 제목 같은 건 붙이지 말고, "이번 챌린지"라거나 주어진 단어 모두를 사용하는 것은 자제해줘. 다음 텍스트를 작성할 땐 이전의 텍스트와 다른 구조의 문장으로 작성해줘.`,
                                    },
                                ],
                            },
                        ],
                    }),
                });

                const data = await res.json();
                console.log('📌 API 응답 데이터:', data); // 디버깅용 로그 추가

                if (data?.candidates && data.candidates.length > 0) {
                    let responseText = data.candidates[0].content.parts[0].text;

                    setLoading(false);
                    return responseText;
                } else {
                    setLoading(false);
                    return '재밌는 챌린지였어요.';
                }
            } catch (error) {
                console.error('API 요청 실패:', error);
                if (error?.code === 429) {
                    retryCount++;
                    await new Promise((resolve) =>
                        setTimeout(resolve, RETRY_DELAY)
                    );
                } else {
                    setLoading(false);
                    return '오류 발생';
                }
            }
        }
    };

    return { loading, generateRecommendation };
};

export default useGemini;
