import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import ViewTrip from './view-trip/[tripId]/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MyTrips from './my-trips/index.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
     path: '/create-trip',
     element: <CreateTrip/>
  }, {
    path: '/view-trip/:tripId',
    element: <ViewTrip/>
  }
  , {
    path: '/my-trips',
    element: <MyTrips/>
  }
])

createRoot(document.getElementById('root')).render(
  
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster />
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  
)
