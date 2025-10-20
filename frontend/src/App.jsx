
import { Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/auth/login/LoginPage.jsx';
import SignupPage from './pages/auth/signup/SignUpPage.jsx';
import { Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar.jsx';
import RightPanel from './components/common/RightPanel.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
import { Navigate } from 'react-router-dom';
import NotificationsPage from './pages/notification/NotificationPage.jsx';



function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
      queryFn: async () => {
      try { 
        const response = await fetch('/api/auth/user', { credentials: 'include' });
        const data = await response.json();
        if (!response.ok) return null;
        if (data.error) return null;
        console.log(data ,"auth user data");
        return data;
        
      } catch (error) {
        console.error('Error fetching auth user:', error);
        return null;
      }
    }
  });
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LoadingSpinner size='lg' />
    </div>;
  }

  
 
  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        {authUser && <Sidebar />}
        <Routes>
          <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to="/login" />} />
          <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
        {authUser && <RightPanel />}
        <Toaster />
      </div>
          
    </>
  )
}

export default App;