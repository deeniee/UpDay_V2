import react, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import MainLayout from './components/Layout/MainLayout';
import Intro from './pages/Intro/Intro';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import MyChallenges from './pages/MyChallenges/MyChallenges';
import AllChallenges from './pages/AllChallenges/AllChallenges';
import ChallengeDetail from './pages/ChallengeDetail/ChallengeDetail';
import Signup from './pages/Login/Signup';
import ProfileSetup from './pages/Login/ProfileSetup';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import { useThemeManager } from './hooks/useThemeManager';

function App() {
    useThemeManager();

    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='/about-upday' element={<Intro />} />
                <Route path='/main' element={<Main />} />
                <Route path='/challenges' element={<AllChallenges />}>
                    <Route path='category/:category' element={null} />
                </Route>
                <Route
                    path='/challenges/create'
                    element={<ChallengeDetail />}
                />
                <Route path='/challenges/:id' element={<ChallengeDetail />} />
                <Route path='/my-challenges' element={<MyChallenges />}>
                    <Route path='category/:category' element={null} />
                </Route>
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<ProfileSetup />} />
                <Route path='/login' element={<Login />} />
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
