import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/** Components */
import AdminLogin from './components/pages/AdminLogin';
import NavBar from './components/layout/NavBar';
import Topic from './components/pages/Topic';
import Toast from './components/layout/Toast';

/** Pages */
import GenericBoard from './components/pages/GenericBoard';
import HomePage from './components/pages/HomePage';

/** Context */
import ToastProvider from './contexts/ToastContext';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <ToastProvider>
        <NavBar />

        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/:boardName" element={<GenericBoard />} />
          <Route path="/:boardName/:topicId" element={<Topic />} />
        </Routes>
        <Toast />
      </ToastProvider>
    </Router>
  );
};

export default App;
