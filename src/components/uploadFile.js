import React,{ useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function UploadFile(){
    const inputURl = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();


    const successfile = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      fileUpload(files[0]); 
      console.log("Thanh cong")
    }
  };

  const fileUpload = (file) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    navigate('/Main', { state: { imageUrl: url } });
  };
    return (
        <>
        <div className="min-h-creen">
      
      <div className="flex flex-row justify-center items-center m-6 gap-[50px]">
          <div className="flex flex-col gap-y-[30px] w-1/2  block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
           <p className="flex justify-center">icon</p>
            <p>Chọn ảnh</p>
           
            <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
  
          <input id="dropzone-file" type="file" className="hidden" ref={inputURl} onChange={successfile} accept="image/*"/>
      </label>
  </div> 
          </div>
          <div className=" w-1/2 flex flex-col justify-center p-[20px] gap-y-[30px]">
            <h1 className="flex justify-center text-4xl">Chỉnh sửa ảnh nè bồ</h1>
          <div className="flex flex-row justify-center">
            <svg className="w-[20px] h-[20px] text-gray-800 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
  </svg>
  
  <svg className="w-[20px] h-[20px] text-gray-800 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
  </svg>
  
  <svg className="w-[20px] h-[20px] text-gray-800 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
  </svg>
  
  <svg className="w-[20px] h-[20px] text-gray-800 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
  </svg>
  
  <svg className="w-[20px] h-[20px] text-gray-800 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
  </svg>
  
  </div>
     <p>Chào mừng bạn đến với trình chỉnh sửa ảnh miễn phí hại điện của Edit photo. Bắt đầu chỉnh sửa bằng cách kéo thả vào ô drap and drop, choose file, crtl + V hoặc chọn những ảnh có sẵn cực kì đẹp do chúng tôi chuẩn bị cho bạn để sử dụng ứng dụng.</p>
          </div>
      </div>
      </div>
        </>
    );
}