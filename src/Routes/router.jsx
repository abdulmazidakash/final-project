import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/Dashboard/Cart";
import AllUsers from "../pages/Dashboard/AllUsers";
import AddItems from "../pages/Dashboard/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";

export  const router = createBrowserRouter([
	{
	  path: "/",
	  element: <MainLayout></MainLayout>,
	  children: [
		{
			path: '/',
			element: <Home></Home>,
		},
		{
			path: '/menu',
			element: <Menu></Menu>,
		},
		{
			path: '/order/:category',
			element: <Order></Order>,
		},
		{
			path: '/order',
			element: <Order></Order>,
		},
		{
			path: '/login',
			element: <Login></Login>,
		},
		{
			path: '/signUp',
			element: <SignUp></SignUp>,
		},
		{
			path: '/secret',
			element: <PrivateRoute><Secret></Secret></PrivateRoute>,
		},
	  ]
	},
	{
		path: '/dashboard',
		element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
		children: [
			//normal users routes
			{
				path: '/dashboard/cart',
				element: <Cart></Cart>,
			},

			//admin only routes
			{
				path: '/dashboard/addItems',
				// element: <AdminRoute><AddItems></AddItems></AdminRoute>,
				element: <AddItems></AddItems>,
			},
			{
				path: '/dashboard/manageItems',
				// element: <AdminRoute><ManageItems></ManageItems></AdminRoute>,
				element: <ManageItems></ManageItems>,
			},
			{
				path: '/dashboard/updateItems/:id',
				// element: <AdminRoute><ManageItems></ManageItems></AdminRoute>,
				element: <UpdateItem></UpdateItem>,
				loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
			},
			{
				path: '/dashboard/users',
				// element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
				element: <AllUsers></AllUsers>,
			},
		]
	},
  ]);