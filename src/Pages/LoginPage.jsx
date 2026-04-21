import '../App.css';
import InputType from './../Components/InputType';
import ButtonComp from './../Components/ButtonComp';

const LoginPage = () => {
    const handleSubmit =()=>{
        
    }
    return (
        <>
            <div class="container">
                <div class="loginIn-Container">

                    <div class="login-card">
                        <div className='login-header'>Welcome to login !!!</div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <InputType type='text' label="Enter username or email" className="inputStyle" minLength={5} maxLength={20} size={20} />
                                <InputType type='password' label="Enter Your Password" className="inputStyle" />
                                <ButtonComp className="loginBtnStyle" btnLable="Click to Login" />
                            </div>
                        </form>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                            <a href="/forgot-password" style={{ textDecoration: 'none', color: '#2b77f4' }}>Forgot Password?</a>
                            <a href="/register" style={{ textDecoration: 'none', color: '#2b77f4' }}>Create new account</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;