import React from 'react';
import featuredImg from '../../../assets/home/featured.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './Featured.css'

const Featured = () => {
	return (
		<>
		<div className=' featured-image pt-8 bg-fixed mb-8'>
		<div>
			<SectionTitle subHeading={'check it now'} heading={'Featured Item'}></SectionTitle>
		</div>
		<div className='md:flex bg-slate-500 bg-opacity-60 justify-center items-center pb-12 px-36 gap-8 text-white font-semibold'>
			<img className='w-96 rounded-lg' src={featuredImg} alt="" />
			<div className='space-y-2'>
				<p>Aug 20, 2029</p>
				<p className='uppercase'>Where can i get some</p>
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, quae quia. Minima ex, neque blanditiis qui dolorum itaque dolore velit nemo vitae cupiditate voluptatem maxime obcaecati aut earum omnis porro at similique ducimus officiis autem dolorem nulla. Possimus, laborum a quaerat ea ab facere. Magni eos deserunt eligendi dolorem non quod, doloribus in, enim cum placeat aut? Consequuntur, dignissimos in.</p>
				<button className='btn btn-outline border border-b-4 mt-4'>Order Now</button>
			</div>
		</div>
		</div>
		</>
	);
};

export default Featured;