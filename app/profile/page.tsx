"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    

      {/* ///////////////////////////////////////////// */}

      <div>
        <header className="bg-blue-500 text-white p-4 grid place-content-center mt-10">
          <h1 className="text-2xl">My Static Web App</h1>
        </header>
      </div>

      {/* //////////////////////////////////////////////////// */}
      <div>
        <main className="py-8">
          <div className="container mx-auto flex flex-wrap">
            {/* First section */}
            <div className="w-full md:w-1/2 p-4">
              <Image
                src="/images/image1.jpg"
                width={500}
                height={500}
                alt="Left Image"
                className="w-half h-auto rounded-lg"
               


              />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <p className="text-xl font-bold">Left Side Text</p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                ac justo eu urna vulputate dignissim.
              </p>
            </div>

            {/* Second section */}
            <div className="w-full md:w-1/2 p-4 order-last md:order-first">
              <p className="text-xl font-bold">Right Side Text</p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                ac justo eu urna vulputate dignissim.
              </p>
            </div>

            <div className="w-half md:w-1/2 p-4 order-first md:order-last">
              <Image
                src=" /images/image1.jpg"
                alt="Right Image"
                className="w-half h-auto rounded-lg"
              />
            </div>
          </div>
        </main>
      </div>

      {/* ////////////////////////////// */}

      <div>
        <footer className="bg-gray-200 text-gray-600 p-4 grid place-content-center font-bold">
          <p>&copy; {new Date().getFullYear()} My Static Web App</p>
        </footer>
      </div>


      {/* <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr /> */}
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout 
      </button>

      {/* <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button> */}


    </div>
  );
}
