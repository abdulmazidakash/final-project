import React, { useContext, useEffect, useRef, useState } from 'react';
import { 
	loadCaptchaEnginge, 
	LoadCanvasTemplate, 
	validateCaptcha } 
from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const Login = () => {
	
	const {signInUser} = useContext(AuthContext);
	const captchaRef = useRef(null);
	const [disabled, setDisabled] = useState(true);

	useEffect(()=>{
		loadCaptchaEnginge(6);
	}, [])

	const handleSubmit = event =>{
		event.preventDefault();

		// const formData = new FormData(event.target);
		// const initialData = Object.fromEntries(formData.entries());
		// console.log(initialData);

		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);

		signInUser(email, password)
			.then(result =>{
				console.log(result.user);
			})
			.then(err =>{
				console.log(err.message);
			})


	}

	const handleValidateCaptcha = () =>{

		const user_captcha_value = captchaRef.current.value;
		console.log(user_captcha_value);

		if(validateCaptcha(user_captcha_value)){
			setDisabled(false);
		}
		else{
			setDisabled(true);
		}

	}
	return (
		<div>
						<Helmet>
							<title>Bistro boss || Login</title>
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
						<input type="email" name='email' placeholder="email" className="input input-bordered" required />
						</div>
						<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input type="password" placeholder="password"  name='password' className="input input-bordered" required />
						<label className="label">
							<a href="#" className="label-text-alt link link-hover">Forgot password?</a>
						</label>
						</div>

						{/* captcha  */}
						<div className="form-control">
						<label className="label">
						<LoadCanvasTemplate />
						</label>
						<input type="password" ref={captchaRef} placeholder="type the text above"  name='password' className="input input-bordered" required />
							<button onClick={handleValidateCaptcha} className='btn btn-xs mt-2'>Validate</button>
						</div>
						<div className="form-control mt-6">
						{/* <button className="btn btn-primary">Login</button> */}
						<input type="submit" disabled={disabled}  className="btn btn-primary" name="Login" placeholder='Login' id="" />
						</div>
					</form>
					<p>New user <Link to='/signUp'>create an account</Link></p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;