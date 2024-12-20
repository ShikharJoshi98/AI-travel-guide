import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../service/GlobalApi';



const PlaceCardItem = ({ place }) => {
  const [Photo_url, setPhoto_url] = useState();
        useEffect(() => {
          place && GetPlacePhoto();
        }, [place])
        
        const GetPlacePhoto = async () => {
          const data = {
            textQuery:place.placeName
          }
          const result = await GetPlaceDetails(data).then(resp => {
            
            const Photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name)
            setPhoto_url(Photo_url);
          })
        }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
      <div className='border rounded-xl  text-black flex p-3 mt-2 gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
          <img src={Photo_url} className='w-[140px] h-[140px] rounded-xl object-cover' />
          <div>
              <h2 className='font-bold text-base'>{place.placeName}</h2>
              <p className='text-sm text-gray-500'>{place.placeDetails}</p>
              <p className='mt-2 text-xs text-gray-400'>{place.timeTravel}</p>
              <Button><FaLocationDot /></Button>
          </div>
      </div>
      </Link>
  )
}

export default PlaceCardItem