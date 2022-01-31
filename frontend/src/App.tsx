import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/** Components */
import NavBar from './components/layout/NavBar';
import Topic from './components/forumitems/Topic';

/** Pages */
import GenericBoard from './components/pages/GenericBoard';
import HomePage from './components/pages/HomePage';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/:forumPage" element={<GenericBoard />} />
        <Route path="/:forumPage/:id" element={<Topic />} />
      </Routes>
    </Router>
  );
};

export default App;
