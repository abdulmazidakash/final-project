import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FoodCard = ({item}) => {

	const {user } = useAuth();
	const {name, image, price, recipe} = item;
	const navigate = useNavigate();

	const handleAddToCart = food =>{
		console.log(food);
		if(user && user.email){
			
		}
		else{
			Swal.fire({
				title: "You are not logged in?",
				text: "Please login to add to cart?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, Login!"
			  })
			  .then((result) => {
				if (result.isConfirmed) {
					//send the user
				 navigate('/login')
				}

			})
		}
	}
	return (
		<div>
			<div className="card card-compact bg-base-100 w-96 shadow-xl">
				<figure>
					<img
					src={image}
					alt="Shoes" />
				</figure>
				<p className='absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white'>${price}</p>
				<div className="card-body flex flex-col items-center text-center">
					<h2 className="card-title">{name}</h2>
					<p>{recipe}</p>
					<div className="card-actions justify-end">
					<button onClick={()=> handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-b-orange-400">Add To Card</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoodCard;