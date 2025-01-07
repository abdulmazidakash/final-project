import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Category from '../Home/Category/Category';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY ;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {

	const { register, handleSubmit, reset } = useForm();
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
	const onSubmit = async (data) => {
		console.log(data);

		//image upload to imgbb and then get an url
		const imageFile = {image: data.image[0]};
		const res = await axiosPublic.post(image_hosting_api, imageFile, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		});
		// console.log(res.data);
		if(res.data.success){
			//now send the menu item data to the server with the image 
			const menuItem = {
				name: data.name,
				category: data.category,
				price: parseFloat(data.price),
				recipe: data.recipe,
				image: res.data.data.display_url,
			}
			//
			const menuRes = await axiosSecure.post('/menu', menuItem);
			console.log(menuRes.data);
			if(menuRes.data.insertedId){
				//show success popup
				reset();
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `${data.name} add to database`,
					showConfirmButton: false,
					timer: 1500
				  });
			}
		}
		console.log(res.data);
	};
  

	return (
		<div>
			<SectionTitle heading={'add an item'} subHeading={'whats new?'}></SectionTitle>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label className="form-control w-full my-6">
						<div className="label">
							<span className="label-text">Recipe Name*</span>
						</div>
						<input 
						type="text" 
						{...register("name", {required: true})}
						required
						
						placeholder="Recipe Name" 
						className="input input-bordered w-full" 
						/>
					</label>
					<div className='flex gap-6'>
						{/* category  */}
						<label className="form-control w-full my-6">
						<div className="label">
							<span className="label-text">category*</span>
						</div>
						<select
						defaultValue={'default'}
						{...register('category', {required: true})}
						className="select select-bordered w-full">
							<option disabled value={'default'}>Select a Category</option>
							<option value={'salad'}>Salad</option>
							<option value={'pizza'}>Pizza</option>
							<option value={'soup'}>Soup</option>
							<option value={'dessert'}>Dessert</option>
							<option value={'drinks'}>Drinks</option>
						</select>
					    </label>
						{/* price  */}
						<label className="form-control w-full my-6">
						<div className="label">
							<span className="label-text">Price*</span>
						</div>
						<input 
						{...register("price")}
						placeholder='price'
						type="number" 
						className="input input-bordered w-full" />
					    </label>
					</div>
					<div className='form-control'>
						<label className='label'>
							<span className='label-text'>Recipe Details</span>
						</label>
					<textarea {...register('recipe', {required: true})}  className="textarea textarea-bordered w-full h-24" placeholder="recipe details"></textarea>
					</div>
					<div className='form-control w-full my-6'>
						<input {...register('image', {required: true})} type="file" className="file-input w-full max-w-xs" />
					</div>
					<button className='btn mr-4 btn-info'>Add Item <FaUtensils/></button>
				</form>
			</div>
		</div>
	);
};

export default AddItems;