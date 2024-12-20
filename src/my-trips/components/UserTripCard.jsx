import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import { Link } from 'react-router-dom';

const UserTripCard = ({ trip }) => {
    const [Photo_url, setPhoto_url] = useState();
          useEffect(() => {
            trip && GetPlacePhoto();
          }, [trip])
          
          const GetPlacePhoto = async () => {
            const data = {
              textQuery:trip?.userSelection?.location?.label
            }
            const result = await GetPlaceDetails(data).then(resp => {
              
              const Photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name)
              setPhoto_url(Photo_url);
            })
          }
    return (
      <Link to={'/view-trip/'+trip?.id}>
      <div className='hover:scale-105 transition-all '>
          
          <img src={Photo_url} className='rounded-xl object-cover h-[220px]' />
          <div>
              <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
              <h2 className='text-sm text-gray-500'>{ trip?.userSelection?.noofDays} Days trip with {trip?.userSelection?.budget} budget </h2>
          </div>
            </div>
            </Link>
  )
}

export default UserTripCard