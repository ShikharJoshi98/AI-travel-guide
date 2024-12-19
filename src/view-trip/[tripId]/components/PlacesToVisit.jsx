import React from 'react'

const PlacesToVisit = ({trip}) => {
  return (
      <div>
          <h2 className='font-bold text-lg'>PlacesToVisit</h2>
          <div>
              {trip?.tripData?.itinerary?.map((item, index) => (
                  <div>
                      <h2 className='font-medium text-lg'>{item.day}</h2>
                      {item.plan.map((place, index) => (
                          <div>
                              <h2>{ place.placeName}</h2>
                          </div>
                      ))
                      }
                  </div>
              ))}
          </div>
    </div>
  )
}

export default PlacesToVisit