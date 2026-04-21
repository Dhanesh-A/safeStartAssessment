import '../App.css';
import InputType from './../Components/InputType';
import ButtonComp from './../Components/ButtonComp';
import { useNavigate } from "react-router-dom";

const Register = () => {

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
            <div className='login-header'>Welcome to Register !!!</div>
            <form onSubmit={handleSubmit}>
              <InputType type='text' label="Enter Your Name" className="inputStyle" minLength={5} maxLength={20} size={20} />
              <InputType type='email' label="Enter  Your Email" className="inputStyle" />
              <InputType type='password' label="Enter Password" className="inputStyle" />
              <InputType type='password' label="Confirm Password" className="inputStyle" />
              <ButtonComp className="loginBtnStyle" btnLable="Register" type="submit"/>
              <ButtonComp className="loginBtnStyle" btnLable="Back to Login" onClick={backtoLogin} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;