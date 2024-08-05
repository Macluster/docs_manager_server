'use client'

import { useState } from "react";

function SignUpPage()
{

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const onsubmit=async()=>{

            var res=fetch("/api/register",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({user_name:name,user_email:email,user_password:password})

            })

    }
    return (
        <div className="flex flex-col justify-center bg-[#EEEDEB] items-center w-[100vw] h-[100vh]">
        <img className="block lg:hidden h-[30%]" src="https://t4.ftcdn.net/jpg/07/37/91/25/360_F_737912577_NobJDeML15nhwSlbwkIp7waCYbnyDp8R.jpg"/>
         <div className="w-full lg:w-[40%] flex flex-row  shadow-lg h-[70%] bg-white rounded-xl">
           
             <div className="h-full w-full lg:w-[100%] flex flex-col items-center  ">
                     <h1 className="text-3xl font-bold mt-20">SignUp</h1>
                     <input onChange={(e)=>{setName(e.target.value)}} placeholder="Name" className="w-[250px] h-[5s0px]  rounded-lg bg-[#EEEDEB] p-2 mt-10 "  />
                     <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" className="w-[250px] h-[5s0px]  rounded-lg bg-[#EEEDEB] p-2 mt-4 "  />
                     <input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="w-[250px] h-[5s0px]  rounded-lg bg-[#EEEDEB] p-2 mt-4"  />
                     <button onClick={onsubmit} className="p-2 bg-black text-white rounded-lg w-[250px] mt-5">Register</button>


             </div>
         </div>
 </div>
    )
}


export default SignUpPage;