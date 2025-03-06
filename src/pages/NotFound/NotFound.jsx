import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import illust404 from './upday_404.svg';

const NotFound = () => {
    return (
        <main className='defalut-size h-full md:min-h-[582px] md:max-h-[1139px] flex-col justify-center items-center gap-[10%]'>
            <Helmet>
                <title>404 - 페이지를 찾을 수 없습니다</title>
            </Helmet>

            <section className='flex flex-col justify-center items-center gap-6 md:gap-8'>
                <img
                    src={illust404}
                    alt='Not Found'
                    className='w-[320px] md:w-[400px] '
                />
                <div className='text-main-600 font-semibold text-xl md:text-2xl'>
                    페이지를 찾을 수 없습니다.
                </div>
                <div className='main-text'>
                    페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다 <br />
                    입력하신 주소가 정확한지 다시 한 번 확인해주세요.
                </div>
            </section>
            <Link to='/main' className='btn btn-primary px-16 md:px-20'>
                메인으로
            </Link>
        </main>
    );
};

export default NotFound;
