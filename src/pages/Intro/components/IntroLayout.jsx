import React from 'react';
import { Helmet } from 'react-helmet';

import IntroSection1 from './IntroSection1';
import IntroSection2 from './IntroSection2';
import IntroSection3 from './IntroSection3';

const IntroLayout = () => {
    return (
        <>
            <Helmet>
                <title>서비스 소개 - UpDay</title>
            </Helmet>
            <main className='w-[90%] md:w-[80%] md:max-w-[1344px] mx-auto h-screen min-h-[720px] -mt-12 scrollbar-none snap-y snap-mandatory'>
                <IntroSection1 />
                <IntroSection2 />
                <IntroSection3 />
            </main>
        </>
    );
};

export default IntroLayout;
