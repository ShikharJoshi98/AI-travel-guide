import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { db } from '../../service/firebaseConfig';
import InfoSection from './components/infoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';



const ViewTrip = () => {
  const { tripId } = useParams();
  
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    tripId&&GetTripData();  
  }, [tripId])
  const GetTripData = async() => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
      console.log(trip);
    }
    else {
      console.log("No such Document");
      toast("No trip found!")
    }
  }
  return (
    
    <div className='p-6 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection trip={ trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
      
     </div>
  )
}

export default ViewTrip