import React from 'react';

/** Components */
import NavBar from './components/layout/NavBar';
import Topic from './components/forumitems/Topic';

/** Pages */
import CatPage from './components/pages/CatPage';
import CPage from './components/pages/CPage';
import HomePage from './components/pages/HomePage';
import JavaPage from './components/pages/JavaPage';
import MiscPage from './components/pages/MiscPage';
import TypeScriptPage from './components/pages/TypeScriptPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/cats" element={<CatPage />} />
        <Route path="/c" element={<CPage />} />
        <Route path="/java" element={<JavaPage />} />
        <Route path="/java/:id" element={<Topic />} />
        <Route path="/misc" element={<MiscPage />} />
        <Route path="/typescript" element={<TypeScriptPage />} />
      </Routes>
    </Router>
  );
};

export default App;
