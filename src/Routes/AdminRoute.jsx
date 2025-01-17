import React from 'react';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
	const [user, loading] = useAuth();
	console.log(user);
	const [isAdmin, isAdminLoading] = useAdmin();
	const location = useLocation();

	if(loading || isAdminLoading){
		return <progress className='progress-info w-56'></progress>
	}


	if(user && isAdmin){
		return children;
	}
	// return <Navigate to={'/login'} state={location?.pathname}></Navigate>
	return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default AdminRoute;