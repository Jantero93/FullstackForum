import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/** Components */
import AdminLogin from './components/pages/AdminLogin';
import NavBar from './components/layout/NavBar';
import Toast from './components/layout/Toast';

/** Pages */
import GenericBoardPage from './components/pages/GenericBoardPage';
import HomePage from './components/pages/HomePage';
import TopicPage from './components/pages/TopicPage';

/** Context */
import ToastProvider from './contexts/ToastContext';
import UserProvider from './contexts/UserContext';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <ToastProvider>
        <UserProvider>
          <NavBar />

          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/:boardName" element={<GenericBoardPage />} />
            <Route path="/:boardName/:topicId" element={<TopicPage />} />
          </Routes>

          <Toast />
        </UserProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
