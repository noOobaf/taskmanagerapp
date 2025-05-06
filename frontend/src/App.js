import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import TasksPage from './components/TasksPage';
import TaskForm from './components/TaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  // Only allow access if both token and user are present
  return token && user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer
          position="bottom-right"
          autoClose={1800}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TaskForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TasksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
