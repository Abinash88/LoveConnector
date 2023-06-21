'use client'

import {
  ChatBubbleOvalLeftEllipsisIcon,
  EnvelopeIcon,
  HeartIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from '@/components/Loader'
import { uuid } from 'uuidv4';
let loader = false;

export default function page() {
  const [UserName, SetUserName] = useState("");
  const [Email, SetEmail] = useState("");
  const [CrushName, SetCrushName] = useState("");
  const [Message, SetMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const userId = localStorage.getItem('userId')

  const FetchUserData = async (e) => {
    e.preventDefault();
    if (userId) {
      return toast.error('You have already use this features!')
    }
    loader = true;
    try {
      const res = await fetch('/api/PostAndSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: UserName.trim(''),
          email: Email,
          crushName: CrushName.trim(''),
          message: Message,
        })
      })

      const data = await res.json();
      loader = false
      if (!data.success) return toast.error(data.message, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast',
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      SetUserName('');
      SetEmail('');
      SetCrushName('');
      SetMessage('');
      const userId = uuid();
      localStorage.setItem('userId', userId);
    } catch (err) {
      console.log(err.message);
      loader = false
    }
  }

  useEffect(() => {
    alert(`Keep in mind that you can only provide your details once in the following fields. Please make sure to write your name exactly as it appears on Facebook.`)
  }, []);

  return (
    <>
      <main className="flex min-h-screen background flex-col items-center justify p-5">
        <button onClick={() => setShowDetails(!showDetails)} className='text-white p-2 font-semibold underline cursor-pointer'>More Info </button>
        <div className={`absolute ${!showDetails ? 'h-[0px] overflow-hidden' : 'h-[400px]'} md:w-[500px] w-[90%]  rounded-md top-[55px] m-auto bg-gray-100 z-10 `}>
          <h2 className='p-2 text-gray-600 text-[22px] text-center underline'>About App</h2>
          <p className='p-3 text-gray-500 '>Hi, this is creator of this app. I have created this app to help you find the perfect couple for yourself. Please copy-paste or enter your and your loved one's Facebook 'Name' exactly as it appears on Facebook (including case sensitivity) in the form provided. Once you have filled in the form with both names, please share the app link with other people so they can help you reach your loved one.

            If both of you enter each other's names correctly, you will receive a notification via email, which you have provided. Please note that you can only fill out the form once, so make sure to provide the following credentials accurately.</p>
        </div>
        <div className=" border rounded-lg pb-5 mybox  md:w-auto w-full">
          <div className="">
            {
              loader ? <Loader /> : null
            }
          </div>
          <h1 className="text-center rounded-lg   bg-gray-700 flex  items-center justify-center text-[25px] md:text-[40px] font-bold text-gray-100 mb-2">
            <span>Love Connector</span> <HeartIcon className="md:h-10 h-8 pt-1 text-pink-600" />
          </h1>
          <p className="text-center md:text-[16px] text-[15px] text-gray-100 mb-3">
            Fill the following details as written in below with Case sensetive
          </p>
          <div className="md:w-[650px] w-full   p-4 h-[500px] bg--200 rounded-md">
            <form onSubmit={FetchUserData} className="w-full">
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
                  <HeartIcon className=" h-6 text-gray-100" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
