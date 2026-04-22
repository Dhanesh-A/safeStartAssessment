import '../App.css';
import InputType from './../Components/InputType';
import ButtonComp from './../Components/ButtonComp';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';


const Register = () => {


  const navigate = useNavigate();

  const backtoLogin = () => {
    navigate('/login');
  }


  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const onSubmit = async (data) => {
    try {
      // Check if user already exists
      const checkRes = await fetch(`http://localhost:3001/users?email=${data.email}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        alert('Email already registered! Please login.');
        return;
      }

      // Save new user to JSON server
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      if (response.ok) {
        alert('Registered Successfully!');
        navigate('/login');
      }
    } catch (error) {
      alert('Server not running! Start JSON server first.');
    }
  };
  
  return (
    <>
      <div className="container">
        <div className="loginIn-Container">
          <div className="login-card">
            <div className='login-header'>Welcome to Register !!!</div>

            {/* ✅ handleSubmit(onSubmit) — correct usage */}
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Name Field */}
              <InputType
                type='text'
                label="Enter Your Name"
                className="inputStyle"
                registration={register('name', {
                  required: 'Name is required',
                  minLength: { value: 3, message: 'Min 3 characters required' },
                  maxLength: { value: 20, message: 'Max 20 characters allowed' }
                })}
                errors={errors.name}
              />

              {/* Email Field */}
              <InputType
                type='email'
                label="Enter Your Email"
                className="inputStyle"
                registration={register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email'
                  }
                })}
                errors={errors.email}
              />

              {/* Password Field */}
              <InputType
                type='password'
                label="Enter Password"
                className="inputStyle"
                registration={register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Min 6 characters required' }
                })}
                errors={errors.password}
              />

              {/* Confirm Password Field */}
              <InputType
                type='password'
                label="Confirm Password"
                className="inputStyle"
                registration={register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match'
                })}
                errors={errors.confirmPassword}
              />

              <ButtonComp className="loginBtnStyle" btnLable="Register" type="submit" />
              <ButtonComp className="loginBtnStyle" btnLable="Back to Login" onClick={backtoLogin} />
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;