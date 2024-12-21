import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../popover'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })
  const user = JSON.parse(localStorage.getItem('user'));
  
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
    window.location.reload()
  })
}

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <div className='flex items-center gap-2'>
        <img src="/logo.svg" alt="" className='h-14 w-12'/>
        <h2 className="text-[24px]  font-sans font-bold tracking-wide text-green-700">TravelGuide.AI</h2>
        </div>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">My Trips</Button>
              </a>
            <Popover>
  <PopoverTrigger><img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/></PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
  </PopoverContent>
</Popover>

         </div>  :
      
            <Button onClick={()=>setOpenDialog(true)}>Sign in</Button>
          }
      </div>
      <Dialog open={openDialog}
           onOpenChange={(isOpen) => setOpenDialog(isOpen)}
        >
  
  <DialogContent>
    <DialogHeader>
       
              <DialogDescription>
                <div className='flex items-center gap-2'>
                <img src='/logo.svg' height={44} width={44} className='justify-center' />
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
  )
}

export default Header