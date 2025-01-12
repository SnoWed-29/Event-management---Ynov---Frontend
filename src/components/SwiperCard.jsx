import React from 'react'
function SwiperCard({name, image, id, description, price}) {
  return (
    <div className='h-96 w-full flex'>
        <div className="flex w-3/5">
            <img src={image} alt="" srcset="" className='object-fit w-full h-full'/>
        </div>
        <div className="flex flex-col justify-between px-4 py-3 w-2/5">
            <div className="flex w-full border-b border-b-teal-400">
                <h1 className='text-2xl text-teal-500 font-bold'>{name}</h1>
            </div>
            <div className="flex text-lg">
                <p>
                    {description}
                </p>
            </div>
            <div className="flex">
                <span className='border-b border-b-teal-500'>Ticket Price : <span className='font-bold text-teal-500'>{price}Dh</span></span>
            </div>
            <div className="flex">
                <a href={`/events/${id}`} className='text-white bg-teal-500 shadow-xl font-bold px-4 py-2 w-full text-center'>View Event</a>
            </div>
        </div>
    </div>
  )
}

export default SwiperCard