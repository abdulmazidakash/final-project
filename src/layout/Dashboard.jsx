import React from 'react';
import { FaAd, FaAngleDoubleLeft, FaCalendar, FaHome, FaShoppingCart } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
	return (
	<div className='flex'>

		{/* dashboard sidebar  */}
		<div className='w-64 min-h-screen bg-orange-400'>
			<ul className='menu p-4'>
				<li>
					<NavLink to='/dashboard/userHome'><FaHome/>User Home</NavLink>
				</li>
				<li>
					<NavLink to='/dashboard/reservation'><FaCalendar/> Reservation</NavLink>
				</li>
				<li>
					<NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart>My Cart</NavLink>
				</li>
				<li>
					<NavLink to='/dashboard/review'><FaAd/> Add a Review</NavLink>
				</li>
				<li>
					<NavLink to='/dashboard/bookings'><FaAngleDoubleLeft/> My Bookings</NavLink>
				</li>

			</ul>
		</div>
		{/* dashboard content  */}
		<div className='flex-1'>
			<Outlet></Outlet>
		</div>
	</div>
	);
};

export default Dashboard;