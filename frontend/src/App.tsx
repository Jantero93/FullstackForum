import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/** Components */
import AdminLogin from './components/pages/AdminLogin';
import NavBar from './components/layout/NavBar';
import Topic from './components/pages/Topic';

/** Pages */
import GenericBoard from './components/pages/GenericBoard';
import HomePage from './components/pages/HomePage';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/:boardName" element={<GenericBoard />} />
        <Route path="/:boardName/:topicId" element={<Topic />} />
      </Routes>
    </Router>
  );
};

export default App;
