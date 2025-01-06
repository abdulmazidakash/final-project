import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUser } from 'react-icons/fa';

const AllUsers = () => {

	const axiosSecure = useAxiosSecure();
	const {data: users = []} = useQuery({
		queryKey: ['users'],
		queryFn: async() =>{
			const res = await axiosSecure.get('/users');
			return res.data;
		}
	})

	const handleDeleteUser = user =>{

	}
	return (
		<div>
			<div className='flex justify-evenly '>
			<h2>All users</h2>
			<h2>Total users: {users.length} </h2>
			</div>
			<div className="overflow-x-auto">
			<table className="table table-zebra">
				{/* head */}
				<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Email</th>
					<th>Role</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
				{/* row 1 */}
					{
						users.map((user, index) => <tr key={user._id}>
							<th>{index + 1} </th>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>
								<button onClick={()=> handleDeleteUser(user._id)} className="btn  btn-sm text-error bg-orange-500 "><FaUser className='text-white text-2xl'/> </button>
							</td>
							<td>
								<button onClick={()=> handleDeleteUser(user._id)} className="btn  btn-sm "><FaTrashAlt/> </button>
							</td>
						</tr>)
					}
				</tbody>
			</table>
			</div>
		</div>

	);
};

export default AllUsers;