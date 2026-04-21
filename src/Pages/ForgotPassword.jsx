import '../App.css';
import InputType from './../Components/InputType';
import ButtonComp from './../Components/ButtonComp';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const backtoLogin = () => {
        navigate('/login');
    }

      const handleSubmit =()=>{
            
        }
    return (
        <>
            <div class="container">
                <div class="loginIn-Container">
                    <div class="login-card">
                        <div className='login-header'>Reset Password!!!</div>
                        <form onSubmit={handleSubmit}>
                            <InputType type='text' label="username or email" className="inputStyle" minLength={5} maxLength={20} size={20} />
                            <InputType type='password' label="Enter Password" className="inputStyle" />
                            <InputType type='password' label="Confirm Password" className="inputStyle" />
                            <ButtonComp className="loginBtnStyle" btnLable="Reset Password" />
                            <ButtonComp className="loginBtnStyle" btnLable="Back to Login" onClick={backtoLogin} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;