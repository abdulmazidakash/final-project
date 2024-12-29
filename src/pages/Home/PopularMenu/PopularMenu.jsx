import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../../shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {

	const [menu] = useMenu();
	const popular = menu.filter(item => item.category === 'popular')

	// const [menu, setMenu] = useState([]);

	// useEffect(()=> {
	// 	fetch('menu.json')
	// 		.then(res => res.json())
	// 		.then(data =>{
	// 			const popularItems = data.filter(item => item.category === 'popular');
	// 			setMenu(popularItems)
	// 		})
	// }, [])
	return (
		<div>
			<SectionTitle subHeading={'From Our Menu'} heading={'Popular Items'}></SectionTitle>

			<div className='grid grid-cols-2 gap-10 mb-8'>
				{
					popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
				}
			</div>
		</div>
	);
};

export default PopularMenu;