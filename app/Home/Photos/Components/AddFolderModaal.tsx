'use client'

import { useState } from "react";

function AddfodlerModaal(props:any) {

    const [foldername,setfolderName]=useState("")
    const onpoupclosed = () => {
        var ele = document.getElementById('popup');
        ele!.style.display = "none";
    }
    const getCurrentDateTime = () => {
        const now = new Date();

        // Format date and time
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Construct formatted date and time
        const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return dateTimeString;
    };
    const onsubmit = async () => {

        const token=localStorage.getItem('token')
        try {
            const response = await fetch('/api/addFolder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ folder_name: foldername, parent_id: props.currFolder==null?0:props.currFolder, cdate: getCurrentDateTime(),token:token }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData: any = await response.json();
            console.log('Data saved successfully:', responseData.message);
        } catch (error) {
            console.error('Error saving data:', error);
            // Handle error
        }
    }

    return (
        <div className="w-[30%] h-[30%] flex flex-col items-center p-5 bg-white rounded-xl">
            <div className="flex flex-row justify-between w-[100%]">
                <h1 className="font-bold">Add folder Name</h1>
                <h1 onClick={onpoupclosed} className="font-bold">X</h1>
            </div>

            <input onChange={(e)=>{setfolderName(e.target.value)}} placeholder="Folder name" className=" p-2 w-[80%] h-[40px] bg-slate-300 rounded-lg mt-10" />
            <button onClick={onsubmit} className="rounded-lg bg-black p-2 text-white w-[80%] mt-2">Submit</button>
        </div>
    )
}

export default AddfodlerModaal