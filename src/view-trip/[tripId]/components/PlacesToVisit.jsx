import React from 'react'
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
    
    const itineraryArray = trip?.tripData?.travelPlan?.itinerary 
        ? Object.entries(trip.tripData.travelPlan.itinerary) 
        : [];
    console.log(itineraryArray.reverse())
  return (
      <div>
          <h2 className='font-bold text-lg'>PlacesToVisit</h2>
          <div>
              {itineraryArray.map(([day, details], index) => (
                  
                      <div>
                      <h2 className='font-medium text-lg'>{day}</h2>
                      <div className='grid md:grid-cols-2 gap-5'>
                      {details?.places?.map((place, index) => (
                          <div className='my-3'>
                              
                              <PlaceCardItem place={place} />
                          </div>
                      ))
                          }
                          </div>
                     
                  </div>
              ))}
          </div>
    </div>
  )
}

export default PlacesToVisit