import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../hooks/useCart';

const Navbar = () => {

	const {user, signOUtUser} = useContext(AuthContext);
	const [cart] = useCart();


	const handleLogOUtUser = () =>{
		signOUtUser()
			.then(()=>{
				console.log('user logout successful');
			})
			.catch(err =>{
				console.log(err.message);
			})
	}
	const navOptions = 
		<>
					<li><Link to='/'>Home</Link></li>

					<li><Link to='/menu'>Our Menu</Link></li>
					<li><Link to='/order'>Order Food</Link></li>
					<li><Link to='/secret'>Secret</Link></li>
					<li>
						<Link to='/dashboard/cart'>
						<button className="btn btn-sm">
							<FaShoppingCart></FaShoppingCart>
							<div className="badge badge-secondary">+ {cart.length}</div>
						</button>
					    </Link>
					</li>

		
					{
						user? <>
						{/* <span>{user?.displayName}</span> */}
						<button onClick={handleLogOUtUser} className='btn btn-sm btn-info'>Logout</button>
						</> : <>
						<li><Link to='/login'>Login</Link></li>
						</>
					}
					
					</>

	return (
		<div>
			<div className="navbar bg-opacity-30 fixed z-10 bg-black text-white max-w-screen-xl top-0 font-semibold h-10">
				<div className="navbar-start">
					<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu text-black menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
					{navOptions}
					</ul>
					</div>
					<Link to='/'><a className="btn btn-ghost text-xl">Bistro Boss</a></Link>
				</div>
				<div className="navbar-center hidden lg:flex justify-center items-center">
					<ul className="menu menu-horizontal px-1 items-center">
					{navOptions}
					</ul>
				</div>
				<div className="navbar-end">
					<a className="btn btn-outline text-white">Button</a>
				</div>
				</div>
		</div>
	);
};

export default Navbar;