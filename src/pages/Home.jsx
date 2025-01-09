import React from 'react';
import Navbar from '../components/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import SwiperCard from '../components/SwiperCard';
import image1 from '../assets/images/image1.jpg'
import image2 from '../assets/images/image2.png'
import image3 from '../assets/images/image3.jpg'
import EventCard from '../components/EventCard';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="w-9/12 mx-auto p-4 ">
        <div>
          <Swiper
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar]}
            className="mySwiper shadow-xl border-b border-b-teal-500"
          >
            <SwiperSlide><SwiperCard name="1" image={image1} /></SwiperSlide>
            <SwiperSlide><SwiperCard name="1"image={image2}/></SwiperSlide>
            <SwiperSlide><SwiperCard name="1"image={image3}/></SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col w-full ">
            <div className="flex py-1 w-full` border-b border-b-teal-500">
                <h1 className='text-3xl py-3 text-teal-500 font-bold'>Recommended Events</h1>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 my-2">
                <EventCard name="Event 001 - Ragga" image={image1}/>
                <EventCard name="Event 002 - House" image={image2}/>
                <EventCard name="Event 003 - Metal" image={image3}/>
                <EventCard name="Event 004 - Techno" image={image1}/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;