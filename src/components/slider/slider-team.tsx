// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slider-team.css';

import persona1 from '../../../public/images/persona1.avif';
import persona2 from '../../../public/images/persona2.avif';

// import required modules
import { Pagination, Navigation, HashNavigation } from 'swiper/modules';

export default function SliderTeam() {
  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="mySwiper"
      >
        <SwiperSlide data-hash="slide1"><img src={persona1} alt='persona'/></SwiperSlide>
        <SwiperSlide data-hash="slide2"><img src={persona2} alt='persona'/></SwiperSlide>
        <SwiperSlide data-hash="slide3"><img src={persona1} alt='persona'/></SwiperSlide>
        <SwiperSlide data-hash="slide4"><img src={persona2} alt='persona'/></SwiperSlide>
        <SwiperSlide data-hash="slide5"><img src={persona1} alt='persona'/></SwiperSlide>
        <SwiperSlide data-hash="slide6"><img src={persona2} alt='persona'/></SwiperSlide>
      </Swiper>
    </>
  );
}
