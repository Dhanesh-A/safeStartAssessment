import { BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./../Pages/LoginPage"
import Register from "./../Pages/Register"
import ForgotPassword from "./../Pages/ForgotPassword"

const AppRoutes = ()=>{
    return (
        <Router>
            <Routes>
                <Route path='/' element={ <LoginPage/> }/>
                <Route path='/login' element={ <LoginPage/> }/>
                <Route path='/register' element= { <Register/> } />
                 <Route path='/forgot-password' element= { <ForgotPassword/> } />
            </Routes>
        </Router>
    )
}

export default AppRoutes