import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MemberList from './pages/MemberList';
import MemberForm from './components/MemberForm';
import Overdue from './pages/Overdue';
import AdminHome from './pages/AdminHome';
import './App.css';

// Reusable protected route component
const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AdminHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/members"
          element={
            <PrivateRoute>
              <MemberList />
            </PrivateRoute>
          }
        />
        <Route
          path="/members/add"
          element={
            <PrivateRoute>
              <MemberForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/members/edit/:id"
          element={
            <PrivateRoute>
              <MemberForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/members/overdue"
          element={
            <PrivateRoute>
              <Overdue />
            </PrivateRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
