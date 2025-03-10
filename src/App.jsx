import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import Intro from './pages/Intro/Intro';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import MyChallenges from './pages/MyChallenges/MyChallenges';
import UserChallengeModal from './pages/MyPage/components/UserChallengeModal';
import AllChallenges from './pages/AllChallenges/AllChallenges';
import PostDetailModal from './pages/Modal/PostDetailModal';
import Signup from './pages/Login/Signup';
import ProfileSetup from './pages/Login/ProfileSetup';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound'; // 404 NotFound 페이지 추가

function App() {
    return (
        <div className='min-w-[390px] min-h-screen flex flex-col md:justify-between scrollbar-none pt-12'>
            <Header />
            <Routes className='flex-grow'>
                <Route path='/' element={<Intro />} />
                <Route path='/main' element={<Main />} />
                <Route path='/challenges' element={<AllChallenges />}>
                    {/* 카테고리 라우트 */}
                    <Route path='category/:category' element={null} />

                    {/* 글 생성 */}
                    <Route path='create' element={<PostDetailModal />} />

                    {/* 글 읽기 */}
                    <Route path=':id' element={<PostDetailModal />} />

                    {/* 글 수정 */}
                    <Route path=':id/edit' element={<PostDetailModal />} />
                </Route>
                <Route path='/my-challenges' element={<MyChallenges />}>
                    <Route path=':id/edit' element={<UserChallengeModal />} />
                </Route>
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<ProfileSetup />} />
                <Route path='/login' element={<Login />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}
