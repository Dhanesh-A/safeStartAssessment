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


  const { register, handleSubmit, formState: { errors }, watch ,setError} = useForm();

  // ✅ Separate function to check duplicate email
  const checkEmailExists = async (email) => {
    const res = await fetch(`http://localhost:3001/users?email=${email}`);
    const users = await res.json();
    return users.length > 0;
  };

  // ✅ Separate function to check duplicate username
  const checkUsernameExists = async (name) => {
    const res = await fetch(`http://localhost:3001/users?name=${name}`);
    const users = await res.json();
    return users.length > 0;
  };

  const onSubmit = async (data) => {
    try {
      // Step 1 — Check duplicate email
      const emailExists = await checkEmailExists(data.email);
      if (emailExists) {
        setError('email', {
          type: 'manual',
          message: 'Email already registered! Please login.'
        });
        return;
      }

      // Step 2 — Check duplicate username
      const usernameExists = await checkUsernameExists(data.name);
      if (usernameExists) {
        setError('name', {
          type: 'manual',
          message: 'Username already taken! Please try a different name.'
        });
        return;
      }

      // Step 3 — Save new user to JSON server
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
      console.error('Error:', error);
      alert('Something went wrong. Is JSON server running on port 3001?');
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