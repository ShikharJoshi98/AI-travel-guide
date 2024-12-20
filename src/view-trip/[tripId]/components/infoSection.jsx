import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../service/GlobalApi';

const InfoSection = ({ trip }) => {
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
      <div>
          <img src={Photo_url} alt="" className='h-[340px] w-full object-cover rounded-xl' />
          <div className='flex justify-between items-center'>
          <div className='my-5 flex flex-col gap-2'>
              <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
              <div className='flex gap-2'>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{ trip.userSelection?.noofDays} Day</h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{ trip.userSelection?.budget} Budget</h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>No. of Traveler : { trip.userSelection?.traveler} </h2>

              </div>
              </div>
              <Button><IoIosSend />
              </Button>
              </div>
    </div>
  )
}

export default InfoSection