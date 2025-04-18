import { useState } from 'react';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const useGemini = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateRecommendation = async (title, content) => {
        setLoading(true);
        setError(null);

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
                                    text: `제목: ${title}\n내용: ${content}\n 을 바탕으로 해당 챌린지를 추천하는 20~30자의 멘트를 일상적인 말투로 하나 작성해줘. 
                                "이번 챌린지" 같은 직접적인 언급은 피하고, 내용을 파악하여 해당 챌린지의 장점이 부각될 수 있는 문장으로 구성해줘.`,
                                },
                            ],
                        },
                    ],
                }),
            });

            if (!res.ok) {
                if (res.status === 429) {
                    console.warn(`요청이 너무 많아 429 오류 발생`);
                    throw new Error(
                        '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.'
                    );
                }
                throw new Error(`HTTP 오류: ${res.status}`);
            }

            const data = await res.json();
            const message = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            return {
                success: true,
                message: message || '이 챌린지 정말 흥미로운데요?',
            };
        } catch (err) {
            console.error('API 요청 실패:', err);
            setError(err.message);
            return {
                success: false,
                message: '후기 생성 중 오류가 발생했어요.',
            };
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, generateRecommendation };
};

export default useGemini;
