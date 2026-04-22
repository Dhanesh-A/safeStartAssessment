import '../App.css';
import InputType from './../Components/InputType';
import ButtonComp from './../Components/ButtonComp';
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './../Redux/Actions/LoginAction';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);


    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();

    if (user) {
        return <Navigate to="/products" />;
    }

    const onSubmit = async (data) => {
        try {
            const inputValue = data.email.trim();

            // ✅ Search by email first, then username
            const res = await fetch(`http://localhost:3001/users?email=${inputValue}`);
            const usersByEmail = await res.json();

            const res2 = await fetch(`http://localhost:3001/users?name=${inputValue}`);
            const usersByName = await res2.json();

            // ✅ Merge both results and pick first match
            const users = [...usersByEmail, ...usersByName];

            if (users.length === 0) {
                setError('email', {
                    type: 'manual',
                    message: 'Email or Username not registered. Please create an account.'
                });
                return;
            }

            const user = users[0];
            if (user.password !== data.password) {
                setError('password', {
                    type: 'manual',
                    message: 'Incorrect password. Please try again.'
                });
                return;
            }

            dispatch(loginAction(user));
            navigate('/products');

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
                        <div className='login-header'>Welcome to Login !!!</div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>

                                {/* Email Field */}
                                <InputType
                                    type='text'
                                    label="Enter Your Email or Username"
                                    className="inputStyle"
                                    registration={register('email', {
                                        required: 'Email or Username is required',
                                        validate: (value) => {
                                            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                                            const isUsername = value.trim().length >= 3;
                                            return isEmail || isUsername || 'Enter a valid email or username (min 3 characters)';
                                        }
                                    })}
                                    errors={errors.email}
                                />

                                {/* Password Field */}
                                <InputType
                                    type='password'
                                    label="Enter Your Password"
                                    className="inputStyle"
                                    registration={register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                    errors={errors.password}
                                />

                                <ButtonComp className="loginBtnStyle" btnLable="Click to Login" type="submit" />
                            </div>
                        </form>

                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
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