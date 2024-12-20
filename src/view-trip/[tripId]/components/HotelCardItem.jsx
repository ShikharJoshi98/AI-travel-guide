import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../service/GlobalApi';

const HotelCardItem = ({ hotel }) => {
    const [Photo_url, setPhoto_url] = useState();
      useEffect(() => {
        hotel && GetPlacePhoto();
      }, [hotel])
      
      const GetPlacePhoto = async () => {
        const data = {
          textQuery:hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp => {
          console.log(resp.data.places[0].photos[1].name)
          const Photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name)
          setPhoto_url(Photo_url);
        })
      }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'>
    <div className='hover:scale-105 transition-all cursor-pointer border p-4 mt-4 mb-4'>
    <img src={Photo_url} alt="" className='rounded-xl h-[180px] w-full object-cover' />
        <div className='my-2 flex flex-col gap-2'>
            <h2 className='font-medium text-black'>{hotel?.hotelName}</h2>                          
            <h2 className='text-xs text-black'>{hotel?.hotelAddress}</h2>
            <h2 className='text-sm text-black'>{hotel?.price}</h2>
            <h2 className='text-sm text-black'>{hotel?.ratings}</h2>
            </div>
        </div>
        </Link>
  )
}

export default HotelCardItem