const MenuItem = ({item}) => {

	const {name, image, price, recipe} = item;
	return (
		<div className="flex space-x-4">
			<img className='w-24 rounded-tr-full rounded-br-full rounded-bl-full' src={image} alt="" />
			<div>
				<h3 className="font-bold uppercase">{name}------</h3>
				<p className="">{recipe}</p>
			</div>
			<p className="text-yellow-500">${price}</p>
		</div>
	);
};

export default MenuItem;