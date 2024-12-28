import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Category = () => {
	return (
		<div>

			<SectionTitle subHeading={'11 from 12'} heading={'Our Recipe'}></SectionTitle>
			 <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24"
      >
        <SwiperSlide>
			<img className='rounded-lg' src={slide1} alt="" />
			<h3 className='text-center text-2xl font-bold uppercase -mt-24'>Salads</h3>
		</SwiperSlide>
        <SwiperSlide>
			<img className='rounded-lg' src={slide2} alt="" />
			<h3 className='text-center text-2xl font-bold uppercase -mt-24'>Salads</h3>
		</SwiperSlide>
        <SwiperSlide>
			<img className='rounded-lg' src={slide3} alt="" />
			<h3 className='text-center text-2xl font-bold uppercase -mt-24'>Salads</h3>
		</SwiperSlide>
        <SwiperSlide>
			<img className='rounded-lg' src={slide4} alt="" />
			<h3 className='text-center text-2xl font-bold uppercase -mt-24'>Salads</h3>
		</SwiperSlide>
        <SwiperSlide>
			<img className='rounded-lg' src={slide5} alt="" />
			<h3 className='text-center text-2xl font-bold uppercase -mt-24'>Salads</h3>
		</SwiperSlide>

      </Swiper>
		</div>
	);
};

export default Category;