import React from 'react'
import { Button } from '../../../components/ui/button'
import { IoIosSend } from "react-icons/io";


const InfoSection = (trip) => {
  return (
      <div>
          <img src="" alt="" className='h-[340px] w-full object-cover rounded-xl' />
          <div className='flex justify-between items-center'>
          <div className='my-5 flex flex-col gap-2'>
              <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
              <div className='flex gap-2'>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{ trip.userSelection?.noofDays} Day</h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>No. of Traveler:{ trip.userSelection?.budget} Budget</h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>No. of Traveler:{ trip.userSelection?.traveler} </h2>

              </div>
              </div>
              <Button><IoIosSend />
              </Button>
              </div>
    </div>
  )
}

export default InfoSection