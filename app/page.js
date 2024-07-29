"use client"

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Radio from './components/Radio';
import Grid from './components/Grid';
export default function Home() {
  return (

    <div className="w-full h-full flex flex-col space-y-10">
      <div className="flex justify-between items-center px-6">
        <div className="flex space-x-5 items-center">
          <img src="/arrow.svg" className="w-[50px]" />
          <p className="text-[35px] font-bold border-b-2 border-black w-[400px]">Rules creation</p>
        </div>
        <div>
          <button className="bg-green-500 text-white text-[20px] p-3 rounded-lg border-2 border-green-500">Publish Feed</button>
        </div>
      </div>
      <div className="bg-gray-50 px-6 w-full rounded-2xl my-4">

        <Grid />
      </div>
      <div className="pb-[100px]">
        <div className="flex space-x-10 items-center py-6">
          <p className="text-3xl font-bold">Use different design for remaining SKU's</p>
          <Radio />
        </div>
        <div className="flex w-full h-[300px] gap-[5%]">
          <div className="basis-[50%] bg-gray-50 flex justify-center items-center rounded-md">
            <p className="text-2xl text-gray-500">N/A</p>
          </div>
          <div className="basis-[25%] h-full flex items-center justify-center bg-gray-50 pl-[20px] rounded-md">
            <img src="/image-11.jpeg" className="h-[250px] w-[250px] object-cover bg-white p-4 rounded-md" />
          </div>
          <div className="basis-[20%] h-full flex items-center justify-center bg-gray-50 pl-[20px] rounded-md">
            <img src="/image-1.jpeg" className="h-[250px] w-[250px] object-cover bg-white p-4 rounded-md" />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
