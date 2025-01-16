import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import SwiperCard from '../components/SwiperCard';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/eventService'; // Adjust the import path as necessary
import image from '../assets/images/image.png';

function Home() {
  const [events, setEvents] = useState([]);
  const [sliderEvents, setSliderEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getEvents();
        setEvents(allEvents);

        // Select 4 random events for the slider
        const shuffledEvents = allEvents.sort(() => 0.5 - Math.random());
        setSliderEvents(shuffledEvents.slice(0, 4));

        // Select 4 more random events for the recommended section
        setRecommendedEvents(shuffledEvents.slice(4, 8));
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-9/12 mx-auto p-4">
        <div>
          <Swiper
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar]}
            className="mySwiper shadow-xl border-b border-b-teal-500"
          >
            {sliderEvents.map(event => (
              <SwiperSlide key={event.id}>
                <SwiperCard id={event.id} name={event.name} image={image} price={event.price} description={event.description} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col w-full mt-8">
          <div className="flex py-1 w-full border-b border-b-teal-500">
            <h1 className="text-3xl py-3 text-teal-500 font-bold">Recommended Events</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 p-2">
            {recommendedEvents.map(event => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                image={image}
                description={event.description}
                price={event.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;