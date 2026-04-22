import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";
import LoginPage from "./../Pages/LoginPage"
import Register from "./../Pages/Register"
import ForgotPassword from "./../Pages/ForgotPassword"
import ProductList from '../Pages/ProductList';
import ProfilePage from '../Pages/ProfilePage';
import Layout from '../Components/Layout';
import ProtectedRoute from '../Components/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />

                {/* ✅ Protected routes — redirect to login if not logged in */}
                <Route path="/products" element={
                    <ProtectedRoute>
                        <Layout>
                            <ProductList />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Layout>
                            <ProfilePage />
                        </Layout>
                    </ProtectedRoute>
                } />

                {/* ✅ Any unknown route → login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes