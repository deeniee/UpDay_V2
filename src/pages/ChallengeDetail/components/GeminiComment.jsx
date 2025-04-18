import { useEffect, useState } from 'react';
import useGemini from '../hooks/useGemini';

const GeminiComment = ({ title, content }) => {
    const { generateRecommendation, loading, error } = useGemini();
    const [comment, setComment] = useState('');
    const [fetched, setFetched] = useState(false); // 중복 방지용 플래그

    useEffect(() => {
        const fetchComment = async () => {
            if (!fetched && title && content) {
                setFetched(true); // 다시 실행되지 않도록 설정
                const result = await generateRecommendation(title, content);
                if (result.success) {
                    setComment(result.message);
                }
            }
        };

        fetchComment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetched, title, content]); // generateRecommendation 제외

    if (loading) return <p className='sub-text text-neutral-300'>로딩 중...</p>;
    if (error) return <p className='sub-text text-red-400'>에러 발생</p>;
    if (!comment) return null;

    return (
        <div className='sub-text'>
            <span className='text-neutral-700'>AI 추천 멘트</span>
            <p>{comment}</p>;
        </div>
    );
};
export default GeminiComment;
