import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // ✅ Get user from Redux
  const user = useSelector((state) => state.user);

  // ✅ If not logged in — redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ If logged in — show the page
  return children;
};

export default ProtectedRoute;