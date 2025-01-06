import React, { useContext, useEffect, useRef, useState } from 'react';
import {  loadCaptchaEnginge,  LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location?.state?.from?.pathname || '/';

    console.log('state in the location login page', location.state);

    useEffect(() => {
        loadCaptchaEnginge(6); // Load a captcha of 6 characters
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "User Login Successful",
                    icon: "success",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster"
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster"
                    }
                });
				navigate(from)
            })
            .catch(err => {
                console.error(err.message);
                Swal.fire({
                    title: "Login Failed",
                    text: "Please check your email and password.",
                    icon: "error"
                });
            });
    };

    const handleValidateCaptcha = e => {
        const userCaptchaValue = e.target.value;

        if (validateCaptcha(userCaptchaValue)) {
            setDisabled(false);
            Swal.fire("Captcha validated successfully!", "", "success");
        } else {
            setDisabled(false);
            Swal.fire("Captcha validation failed. Please try again.", "", "error");
        }
    };

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left md:w-1/2">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                                <label className="label">
                                    <Link to="/reset-password" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </Link>
                                </label>
                            </div>


                            {/*todo: apply disable for re Captcha */}
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
								onBlur={handleValidateCaptcha}
                                    type="text"
                                 
                                    placeholder="Type the text above"
                                    className="input input-bordered"
                            
                                />
                        
                            </div>
                            <div className="form-control mt-6">
                                {/* todo: apply disabled for re captcha  */}
                                <input
                                    type="submit"
                                    disabled={false}
                                    className={`btn btn-primary ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    value="Login"
                                />
                            </div>
                        </form>
                        <p className="text-center p-2">
                            New user?{" "}
                            <Link className="text-blue-700 font-semibold" to="/signUp">
                                Create an account
                            </Link>
                        </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
