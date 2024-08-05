'use client'
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react";


function SideBar()
{

    const [currentItem,setCurrentItem]=useState(0)
    return (
        <div className="h-100 w-[20%] bg-black flex flex-col">
        <h1 className="text-white font-bold text-3xl p-5">MyDocs</h1>
        <MenuItem id={0} bg={currentItem==0?'white':'transparent'} setItem={setCurrentItem} title={"Photos"} image={"https://cdn-icons-png.flaticon.com/128/15643/15643158.png"} />
        <MenuItem id={1} bg={currentItem==1?'white':'transparent'} setItem={setCurrentItem} title={"Videos"} image={"https://cdn-icons-png.flaticon.com/128/15980/15980278.png"} />
        <MenuItem id={2} bg={currentItem==2?'white':'transparent'} setItem={setCurrentItem} title={"Documents"} image={"https://cdn-icons-png.flaticon.com/128/15643/15643158.png"} />

    </div>
    )
}


function MenuItem({ id,bg,setItem,image, title }: { id:number,bg:string,setItem:Dispatch<SetStateAction<number>>,image: string, title: string }) {
    return (
        <Link href={"./" + title}>

            <div onClick={()=>{setItem(id)}} className={"flex flex-row items-center  hover:bg-orange-400 p-5 pt-3 pb-3 bg-"+bg}>
                <img className="h-[30px] w-[30px] mr-5" src={image} />
                <h1 className="text-gray-600 font-bold">{title}</h1>
            </div>
        </Link>
    )
}

export default SideBar;