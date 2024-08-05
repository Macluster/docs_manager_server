'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
 


function LoginPage()
{


    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const router = useRouter()
    const login=async()=>{

        var res=await fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({user_email:email,user_password:password})
        })

        var user=await res.json()

        if(user.found)
        {
            //login
            console.log("Login successful")
          
            var token=user.token;
            localStorage.setItem("token",token)
            router.push('/Home/Photos', { scroll: false })

        }
        else
        {
            console.log(user)
        }
        

    }

    return (
        <div className="flex flex-col justify-center bg-[#EEEDEB] items-center w-[100vw] h-[100vh]">
               <img className="block lg:hidden h-[30%]" src="https://t4.ftcdn.net/jpg/07/37/91/25/360_F_737912577_NobJDeML15nhwSlbwkIp7waCYbnyDp8R.jpg"/>
                <div className="w-full lg:w-[60%] flex flex-row  shadow-lg h-[70%] bg-white rounded-xl">
                    <img className="w-[60%] h-full rounded-tl-xl rounded-bl-xl hidden lg:block  " src="https://t4.ftcdn.net/jpg/07/37/91/25/360_F_737912577_NobJDeML15nhwSlbwkIp7waCYbnyDp8R.jpg" />
                    <div className="h-full w-full lg:w-[40%] flex flex-col items-center  ">
                            <h1 className="text-3xl font-bold mt-20">Login</h1>
                            <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="User Name" className="w-[250px] h-[5s0px]  rounded-lg bg-[#EEEDEB] p-2 mt-10 "  />
                            <input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="w-[250px] h-[5s0px]  rounded-lg bg-[#EEEDEB] p-2 mt-4"  />
                            <button onClick={login} className="p-2 bg-black text-white rounded-lg w-[250px] mt-5">Login</button>
                            <h1 className="mt-10">Dont have an account? <span className="text-[blue]">Signup</span></h1>

                    </div>
                </div>
        </div>
    )

}

export default LoginPage;