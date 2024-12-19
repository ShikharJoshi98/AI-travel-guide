import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '../service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { db } from '../service/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';






function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
   
    setFormData({
      ...formData,
      [name]: value
    })
  }
  useEffect(() => {
    console.log(formData)
  }, [formData])
  
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db , "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id:docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId)
  }

  const onGenerateTrip = async () => {
    
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noofDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all Details")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noofDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noofDays)
      
   
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text());
  }
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
    headers: {
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept: 'Applicaton/json'
    }
  }).then((resp) => {
    console.log(resp);
    localStorage.setItem('user', JSON.stringify(resp.data))
    setOpenDialog(false);
    onGenerateTrip();
  })
}

  return (

    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
       <h2 className='font-bold text-3xl  leading-relaxed '>Tell us your travel preferences</h2>
       <p className='mt-3 text-gray-500 text-xl   '>Just provide some basic information, and our trip planner will generate a customized itenary based on your preferences.</p>
       <div className=' flex flex-col gap-10'>
        <div className='mt-10  '>
          <h2 className='text-xl  font-medium   '>What is destination of choice?</h2>
          <div className=' mt-5'>
          <GooglePlacesAutocomplete
             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY }
             
             selectProps={{
               place,
               onChange:(v)=>{setPlace(v); handleInputChange('location',v)}
              }}
              />
              </div>
       </div>
       <div >
       <h2 className='text-xl my-3 font-medium   '>How many days are you planning your trip?</h2>
       <div className='   mt-5   '>
        <Input placeholder={'ex. 3'} type="number"
        onChange = {(e)=>handleInputChange('noofDays',e.target.value)}  />
       </div>
       </div>
       <div >
       <h2 className='text-xl my-3 font-medium   '>What is Your Budget?</h2>
       <div className=' grid grid-cols-3 gap-5 mt-6   '>
        {SelectBudgetOptions.map((item,index)=>(
          <div key={index}

          onClick = {(e)=>handleInputChange('budget',item.title)} 
          className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget==item.title&&'shadow-lg border-black'}`}>
            <h2 className='text-3xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
        ))}
       </div>
       </div>
       <div >
       <h2 className='text-xl my-3 font-medium   '>Who do you plan on traveling with on your next adventure?</h2>
       <div className=' grid grid-cols-3 gap-5 mt-6   '>
        {SelectTravelList.map((item,index)=>(
          <div key={index}
          onClick = {(e)=>handleInputChange('traveler',item.people)} 
          className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler==item.people&&'shadow-lg border-black'}`}>
            <h2 className='text-3xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
        ))}
       </div>
       </div>
       <div className='my-3 flex justify-center '>
          <Button
            disabled = {loading}
            onClick={onGenerateTrip} >
            {loading ?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'Generate Trip'

            }
            </Button>
        </div>
        <Dialog open={openDialog}
           onOpenChange={(isOpen) => setOpenDialog(isOpen)}
        >
  
  <DialogContent>
    <DialogHeader>
       
              <DialogDescription>
                <div className='flex items-center gap-2'>
                <img src='public/logo.svg' height={44} width={44} className='justify-center' />
                  <h2 className='text-[24px]  font-sans font-bold  text-green-700'>TravelGuide.AI</h2>
                  </div>
                <h2 className='font-bold text-lg mt-4'>Sign in with Google</h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button className='w-full mt-5 flex items-center '                  
                  onClick={login}
                >                  
                      <FcGoogle />
                      Sign In With Google                   
                  </Button>                    
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

        

    </div>
    </div>
  )
}

export default CreateTrip