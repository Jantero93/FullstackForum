import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/** Components */
import AdminLogin from './components/admin/AdminLogin';
import NavBar from './components/layout/NavBar';
import Toast from './components/layout/Toast';

/** Pages */
import GenericBoardPage from './components/pages/GenericBoardPage';
import HomePage from './components/pages/HomePage';
import TopicPage from './components/pages/TopicPage';

/** Context */
import ToastProvider from './contexts/ToastContext';
import AdminLoginProvider from './contexts/AdminLoginContext';

/** User hook */
import { useUpdateUser } from './contexts/UserContext';

/** Utils */
import { getItemFromLocalStorage } from './utils/localStorage';

const App: React.FC = (): JSX.Element => {
  const [isRendered, setIsRendered] = React.useState<boolean>(false);

  const updateUser = useUpdateUser();

  React.useEffect(() => {
    const user = getItemFromLocalStorage('user');

    user &&
      updateUser({
        username: user.username,
        loggedIn: true,
        id: user.id,
        role: user.role
      });
    setIsRendered(true);
  }, []);

  return (
    <Router>
      <ToastProvider>
        {isRendered && (
          <>
            <AdminLoginProvider>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/:boardName" element={<GenericBoardPage />} />
                <Route path="/:boardName/:topicId" element={<TopicPage />} />
              </Routes>
            </AdminLoginProvider>

            <Toast />
          </>
        )}
      </ToastProvider>
    </Router>
  );
};

export default App;
