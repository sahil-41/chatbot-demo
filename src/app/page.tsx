import Image from "next/image";
'use client'

import usersGlobalStore from "@/store/user-store";
import SideBar from "./_components/sidebar";
import ChatArea from "./_components/chatarea";




export default function Home() {
  // const {loggedInUserData}:any = usersGlobalStore();
  // const user = loggedInUserData
  // const name = user?.name
  // const email = user?.email
  // //const clerrkUserid = user?.id
  // console.log(user)

  return (
    <div className="flex h-screen">
    {/* // <div className="p-5 flex-col gap-5"> */}
    {/* // <h1 className="text text-lg text-blue-400">Hello world</h1>
    // <h1 className="text text-lg text-blue-400">Name: {name}</h1>
    // <h1 className="text text-lg text-blue-400">Email: {email}</h1>
    // <h1 className="text text-lg text-blue-400">Mongo_id: {user?._id}</h1> */}
    <div className="hidden lg:flex">
    <SideBar />
    </div>
    <div className="flex-1 h-full">
    <ChatArea /></div>
    </div>

  );
}
