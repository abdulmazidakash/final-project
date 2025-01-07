import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
	
	return (
		<div className='md:w-4/12 mx-auto text-center my-8'>
			<h2 className='text-center text-yellow-500 font-semibold italic mb-2'>---{subHeading}---</h2>
			<p className='text-3xl font-bold text-center mb-4 border-y-4 py-2 uppercase'>{heading}</p>
		</div>
	);
};

export default SectionTitle;