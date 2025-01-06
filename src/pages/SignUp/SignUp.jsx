import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {

	const axiosPublic = useAxiosPublic();

	const {createUser, updateUserProfile} = useContext(AuthContext);
	const navigate = useNavigate();

	const {register,handleSubmit,	reset ,formState: { errors },  } = useForm();

	  const onSubmit = (data) =>{
		console.log(data);
		createUser(data.email, data.password)
			.then(result => {
			const loggedUser = result.user;
			console.log(loggedUser);
			updateUserProfile(data.name, data.photoURL)
			.then(()=>{
					console.log('user created successfully');
					// create user entry in the database
					const userInfo = {
						name: data.name,
						email: data.email,
					}
					axiosPublic.post('/users', userInfo)
					.then(res =>{
						if(res.data.insertedId){
							console.log('user added to the database');
							reset();
							Swal.fire({
								icon: 'success',
								title: 'user created successfully',
								showConfirmButton: false,
								timer: 1500,
							})
							navigate('/')
						}
					})
					
			})
		})
		.catch(error => console.log(error))

	  }

	return (
		<div>
			<Helmet>
				<title>Bistro boss || Sign Up</title>
			</Helmet>
				<div className="hero bg-base-200 min-h-screen">
							<div className="hero-content flex-col lg:flex-row-reverse">
								<div className="text-center lg:text-left md:w-1/2">
								<h1 className="text-5xl font-bold">Sign Up now!</h1>
								<p className="py-6">
									Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
									quasi. In deleniti eaque aut repudiandae et a id nisi.
								</p>
								</div>
								<div className="card bg-base-100 md:w-1/2 max-w-sm shrink-0 shadow-2xl">
								<form onSubmit={handleSubmit(onSubmit)} className="card-body">
									<div className="form-control">
									<label className="label">
										<span className="label-text">Name</span>
									</label>
									<input type="text" {...register("name", { required: true })} name='name' placeholder="name" className="input input-bordered"  />
									{errors.name && <span className='text-red-700'>Name is required</span>}
									</div>
									<div className="form-control">
									<label className="label">
										<span className="label-text">Photo</span>
									</label>
									<input type="text" {...register("photo", { required: true })}  placeholder="photo" className="input input-bordered"  />
									{errors.photo && <span className='text-red-700'>Photo is required</span>}
									</div>
									<div className="form-control">
									<label className="label">
										<span className="label-text">Email</span>
									</label>
									<input type="email" {...register("email", { required: true})} name='email' placeholder="email" className="input input-bordered"  />
									{errors.email && <span className='text-red-700'>Email is required</span>}
									</div>
									<div className="form-control">
									<label className="label">
										<span className="label-text">Password</span>
									</label>
									<input type="password" {...register("password", {
										required: true, 
										minLength: 6, 
										maxLength: 20,
										pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
										})} placeholder="password"  name='password' className="input input-bordered"  />
									{errors.password?.type === 'required' && <span className='text-red-700'>Password is required</span>}
									{errors.password?.type === 'minLength' && <span className='text-red-700'>Password must be 6 character</span>}
									{errors.password?.type === 'maxLength' && <span className='text-red-700'>Password less than 20 character</span>}
									{errors.password?.type === 'pattern' && <span className='text-red-700'>Password must have one uppercase one lowercase, one number and one special character</span>}
									<label className="label">
										<a href="#" className="label-text-alt link link-hover">Forgot password?</a>
										
									</label>
									</div>
		
									<div className="form-control mt-6">
									{/* <button className="btn btn-primary">Login</button> */}
									<input type="submit"  className="btn btn-primary" name="Login" placeholder='Login' value='Sign Up' id="" />
									</div>
								</form>
								<p className='text-center px-6'><small>Already have an account</small> <Link className='text-red-700' to='/login'>Login</Link></p>
								<SocialLogin></SocialLogin>
								</div>
							</div>
						</div>
		</div>
	);
};

export default SignUp;