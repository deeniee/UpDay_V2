import react, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import MainLayout from './components/Layout/MainLayout';
import Intro from './pages/Intro/Intro';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import MyChallenges from './pages/MyChallenges/MyChallenges';
import Challenges from './pages/Challenges/Challenges';
import ChallengeDetail from './pages/ChallengeDetail/ChallengeDetail';
import Signup from './pages/Login/Signup';
import ProfileSetup from './pages/Login/ProfileSetup';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import { useThemeManager } from './hooks/useThemeManager';
import AllMyChallenges from './pages/AllMyChallenges/AllMyChallenges';
import NoteMyChallenges from './pages/NoteMyChallenges/NoteMyChallenges';
import SavedMyChallenges from './pages/SavedMyChallenges/SavedMyChallenges';

function App() {
    useThemeManager();

    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route index element={<Intro />} />
                <Route path='about-upday' element={<Intro />} />
                <Route path='main' element={<Main />} />
                <Route path='challenges' element={<Challenges />}>
                    <Route path='category/:slug' element={null} />
                </Route>
                <Route path='challenges/create' element={<ChallengeDetail />} />
                <Route path='challenges/:id' element={<ChallengeDetail />} />
                <Route path='my-challenges' element={<MyChallenges />} />
                <Route
                    path='my-challenges/note'
                    element={<NoteMyChallenges />}
                />
                <Route path='my-challenges/all' element={<AllMyChallenges />}>
                    <Route path=':slug' element={null} />
                </Route>
                <Route
                    path='my-challenges/saved'
                    element={<SavedMyChallenges />}
                >
                    <Route path='category/:slug' element={null} />
                </Route>
                <Route path='mypage' element={<MyPage />} />
                <Route path='signup' element={<Signup />} />
                <Route path='profile' element={<ProfileSetup />} />
                <Route path='login' element={<Login />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default function AppWrapper() {
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
}
