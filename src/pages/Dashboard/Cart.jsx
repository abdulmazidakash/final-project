import React from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Cart = () => {

	const [cart, refetch] = useCart();
	const axiosSecure = useAxiosSecure();

	const totalPrice = cart.reduce((total, item) => total + item.price, 0);

	const handleDelete = id =>{
		console.log(id);

		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		  }).then((result) => {
			if (result.isConfirmed) {
		

			axiosSecure.delete(`/carts/${id}`)
				.then(res =>{
					console.log(res.data);
					if(res.data.deletedCount > 0){
						refetch()
					  Swal.fire({
								title: "Deleted!",
								text: `has been deleted`,
								icon: "success"
							  });
					}
				})

			}
		  });
	}

	return (
		<div>
			<div className='flex justify-evenly mb-8'>
				<h2 className='text-4xl font-semibold'>Item: {cart.length}</h2>
				<h2 className='text-4xl font-semibold'>Total Price: {totalPrice}</h2>
				<button className="btn btn-info">Pay</button>
			</div>
			{/* table  */}
			<div className="overflow-x-auto">
				<table className="table w-full">
					{/* head */}
					<thead className='bg-slate-800 text-white font-semibold'>
					<tr>
						<th>
						#
						</th>
						<th>Image</th>
						<th>Name</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
					</thead>
					<tbody>
					{/* row 1 */}
					{cart.map((item, index)=> <tr key={item._id}>
						<th>
						{index + 1}
						</th>
						<td>
						<div className="flex items-center gap-3">
							<div className="avatar">
							<div className="mask mask-squircle h-12 w-12">
								<img
								src={item.image}
								alt="Avatar Tailwind CSS Component" />
							</div>
							</div>
							<div>
							<div className="font-bold">{item.name}</div>
							<div className="text-sm opacity-50">United States</div>
							</div>
						</div>
						</td>
						<td>
						{item.name}
						</td>
						<td>{item.price}</td>
						<th>
						<button onClick={()=> handleDelete(item._id)} className="btn btn-ghost btn-sm text-error "><FaTrashAlt/> </button>
						</th>
					</tr>)}

					</tbody>
				</table>
				</div>
		</div>
	);
};

export default Cart;