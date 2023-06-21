'use client'

import {
  ChatBubbleOvalLeftEllipsisIcon,
  EnvelopeIcon,
  HeartIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from '@/components/Loader'
// import { uuid } from 'uuidv4';
let loader = false;

export default function page() {
  const [UserName, SetUserName] = useState("");
  const [Email, SetEmail] = useState("");
  const [CrushName, SetCrushName] = useState("");
  const [Message, SetMessage] = useState("");
  


  const FetchUserData = async (e) =>{
    loader = true;
    e.preventDefault();
    try{
      const res = await fetch('/api/PostAndSearch',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:UserName.trim(''),
          email:Email,
          crushName:CrushName.trim(''),
          message:Message,
        })
      })

      const data = await res.json();
      if(!data.success) return toast.error(data.message,{
        position: toast.POSITION.TOP_CENTER,
        className:'toast',
      });
      toast.success(data.message,{
        position: toast.POSITION.TOP_CENTER,
      })
      SetUserName('');
      SetEmail('');
      SetCrushName('');
      SetMessage('');
      loader = false
    }catch(err) {
      console.log(err.message);
      loader = false
    }
  }


  return (
    <>
      <main className="flex min-h-screen background flex-col items-center justify p-5">
        <div className=" border  md:w-auto w-full">
          <div className="">
            {
              loader ? <Loader/> :null
            }
          </div>
          <h1 className="text-center flex  items-center justify-center text-[25px] md:text-[40px] font-bold text-gray-600 mb-1">
            Love Connector <HeartIcon   className="h-10 text-red-500" />
          </h1>
          <p className="text-center md:text-[16px] text-[14px] text-gray-500 mb-3">
            Find your Love here by putting your name
          </p>
          <div className="md:w-[650px] w-full   p-4 h-[500px] bg--200 rounded-md">
            <form onSubmit={FetchUserData} action="w-full">
              <div className="flex flex-col inputdiv  ">
                <label className="text-bold flex" htmlFor="Name">
                  <UserIcon className="h-6 mr-3 text-pink-600" /> Your Facebook
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Copy and paste your full facebook name"
                  onChange={(e) => SetUserName(e.target.value)}
                  value={UserName}
                />
              </div>

              <div className="flex flex-col inputdiv  ">
                <label className="text-bold flex" htmlFor="Name">
                  <EnvelopeIcon className="h-6 mr-3 text-pink-600" /> Email
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Email address for notification"
                  onChange={(e) => SetEmail(e.target.value)}
                  value={Email}
                />
              </div>

              <div className="flex flex-col inputdiv ">
                <label className="text-bold flex" htmlFor="Name">
                  <UsersIcon className="h-6 mr-3 text-pink-600" /> Your Crush
                  Facebook Name
                </label>
                <input
                  type="text"
                  placeholder="Copy and paste your full crush  facebook name"
                  onChange={(e) => SetCrushName(e.target.value)}
                  value={CrushName}
                />
              </div>

              <div className="flex flex-col inputdiv ">
                <label className="text-bold flex" htmlFor="Name">
                  <ChatBubbleOvalLeftEllipsisIcon className="h-6 mr-3 text-pink-600" />{" "}
                  Love message for your crush
                </label>
                <input
                  type="text"
                  placeholder="Eg. I love U ......."
                  onChange={(e) => SetMessage(e.target.value)}
                  value={Message}
                />
              </div>
              <div className="">
                <button
                  className="relative flex item-center justify-center mx-auto  hover:bg-pink-800 mt-5 rounded-full px-10 py-4 bg-pink-700 text-white"
                  type="submit"
                >
                     Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
