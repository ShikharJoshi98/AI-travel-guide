import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-11'>
        <h1 className='font-extrabold text-[50px] text-center mt-14 px-11 w-[1100px]  '>
            <span className='text-green-500 '>Discover Your Next Adventure with AI:</span> Personalized Itineraries at your Fingertips</h1>
            <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom Itineraries tailored to your interests and budget.</p>
            <Link to={'/create-trip'}>
            <Button>Get Started, It's Free </Button>
            </Link>
    </div>
  )
}

export default Hero