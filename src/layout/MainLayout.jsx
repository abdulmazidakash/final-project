import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';

const MainLayout = () => {

	const location = useLocation();
	console.log(location);
	const noHeaderFooter = location?.pathname.includes('/login') || location?.pathname.includes('/signUp');
	return (
		<div>
		{noHeaderFooter || 	<Navbar></Navbar>}
			<Outlet></Outlet>
		{noHeaderFooter || 	<Footer></Footer>}
		</div>
	);
};

export default MainLayout;