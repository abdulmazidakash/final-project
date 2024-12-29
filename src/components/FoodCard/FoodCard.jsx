import React from 'react';

const FoodCard = ({item}) => {

	const {name, image, price, recipe} = item;
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
					<button className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-b-orange-400">Add To Card</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoodCard;