'use client'
import { saveCurrentUser } from '@/actions/users'
import usersGlobalStore from '@/store/user-store'
import { message, Spin } from 'antd'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from "react"

function CustomLayout({children}: {children: React.ReactNode}){
    const pathname = usePathname()
    
    if(pathname.includes('/sign-in') || pathname.includes('/sign-up')){
        return <>{children}</>
    }
    const {setLoggedInUserData, loggedInUserData}:any = usersGlobalStore();
    const [loading, setLoading] = useState(false)
    const getLoggedInUser = async() =>{
        try{
            setLoading(true)
            const response:any = await saveCurrentUser()
            if(response.sucess){
                setLoggedInUserData(response.data);
            }else{
                message.error(response.message)
            }
        }catch(error){
            message.error("Something went wrong!")
        }finally{
            setLoading(false)
        }
    };
    useEffect(() => {
        // Load some data
        getLoggedInUser();
      }, []);
    if(loading){
        return (
        <div className='flex h-screen justify-center items-center global-spinner'>
            <Spin />
        </div>)
    }
    if (!loggedInUserData) return null;

  return <div>{children}</div>
  
}

export default CustomLayout
