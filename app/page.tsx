'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
const jwt =require('jsonwebtoken')

export default function Home() {

  var data=localStorage.getItem("token")
  
  const router=useRouter()
  if(data)
  {


    router.push("/Home/Photos")
 
    console.log("data=")
    console.log(data)
  }
  else
  {
    router.push("/Login")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello</h1>
    </main>
  );
}
