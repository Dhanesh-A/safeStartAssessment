import '../App.css';
import InputType from './../Components/InputType';
import ButtonComp from './../Components/ButtonComp';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm();

  // ✅ Separate function to check if new password is same as old password
  const checkSamePassword = async (newPassword) => {
    const emailOrUsername = watch('emailOrUsername');

    // Don't validate if email/username field is empty
    if (!emailOrUsername) return true;

    try {
      const resByEmail = await fetch(`http://localhost:3001/users?email=${emailOrUsername}`);
      const usersByEmail = await resByEmail.json();

      const resByName = await fetch(`http://localhost:3001/users?name=${emailOrUsername}`);
      const usersByName = await resByName.json();

      const users = [...usersByEmail, ...usersByName];

      if (users.length > 0 && users[0].password === newPassword) {
        return 'New password cannot be same as old password';
      }

      return true;

    } catch (error) {
      console.error('Password check failed:', error);
      return true;
    }
  };

  // ✅ Separate function to check confirm password matches
  const checkPasswordMatch = (confirmValue) => {
    return confirmValue === watch('password') || 'Passwords do not match';
  };

  const onSubmit = async (data) => {
    try {
      const resByEmail = await fetch(`http://localhost:3001/users?email=${data.emailOrUsername}`);
      const usersByEmail = await resByEmail.json();

      const resByName = await fetch(`http://localhost:3001/users?name=${data.emailOrUsername}`);
      const usersByName = await resByName.json();

      const users = [...usersByEmail, ...usersByName];

      if (users.length === 0) {
        setError('emailOrUsername', {
          type: 'manual',
          message: 'Email or Username not found. Please register first.'
        });
        return;
      }

      const user = users[0];
      const updateRes = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: data.password })
      });

      if (updateRes.ok) {
        alert('Password reset successful! Please login with new password.');
        navigate('/login');
      }

    } catch (error) {
      console.error('Error:', error);
      alert(`Something went wrong: ${error.message}`);
    }
  };

  const backtoLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="container">
        <div className="loginIn-Container">
          <div className="login-card">
            <div className='login-header'>Reset Password!!!</div>

            <form onSubmit={handleSubmit(onSubmit)}>

              <InputType
                type='text'
                label="Enter Email or Username"
                className="inputStyle"
                registration={register('emailOrUsername', {
                  required: 'Email or Username is required',
                  minLength: { value: 3, message: 'Must be at least 3 characters' }
                })}
                errors={errors.emailOrUsername}
              />

              <InputType
                type='password'
                label="Enter New Password"
                className="inputStyle"
                registration={register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  validate: checkSamePassword
                })}
                errors={errors.password}
              />

              <InputType
                type='password'
                label="Confirm New Password"
                className="inputStyle"
                registration={register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: checkPasswordMatch
                })}
                errors={errors.confirmPassword}
              />

              <ButtonComp className="loginBtnStyle" btnLable="Reset Password" type="submit" />
              <ButtonComp className="loginBtnStyle" btnLable="Back to Login" onClick={backtoLogin} />

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;