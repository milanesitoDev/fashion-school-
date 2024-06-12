import { Swiper, SwiperSlide } from "swiper/react";
import gallery from '../../../public/images/gallery.jpg'
// Import Swiper styles
import "swiper/css";
import'./slider.css'

import { Navigation } from "swiper/modules";


const Slider: React.FC = () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} 
      className="mySwiper"
      spaceBetween={30}
      slidesPerView={3}
      >
    
      <SwiperSlide className="img__container">
      <img src={gallery} alt="" className="img__container"/>
      </SwiperSlide>

      <SwiperSlide className="img__container">
      <img src={gallery} alt="" className="img__container"/>
      </SwiperSlide>

      <SwiperSlide className="img__container">
      <img src={gallery} alt="" className="img__container"/>
      </SwiperSlide>

      <SwiperSlide className="img__container">
      <img src={gallery} alt="" className="img__container"/>
      </SwiperSlide>
    </Swiper>
    </>
  );
}
export default Slider