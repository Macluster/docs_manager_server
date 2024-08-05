'use client'

import { useEffect, useState } from "react"


export default function ContentDisplay(props:any) {


    

    useEffect(() => {

            getdata("0")

    }, [])


    const onfolderClick=(id:any)=>{
        console.log("currid="+id)
        getdata(id)
        props.setCurrFolder(id)
    }



    async function getdata(id:string) {
        const response = await fetch('/api/getFolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({folder_id:id}),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData: any = await response.json();
        props.setFolders(responseData)
        console.log("folder response")
        console.log(responseData)

        const response2 = await fetch('/api/getFiles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({folder_id:id}),
        });

        if (!response2.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData2: any = await response2.json();
      // console.log(responseData2)
        props.setfiles(responseData2)
       
    }


    return (
        <div className="w-full h-full flex flex-row flex-wrap mt-5 ">
            {props.folders.map((e:any) => (<FolderCard onclick={onfolderClick} data={e} />))}
            {props.files.map((e:any) => (<FileCard onclick={onfolderClick} data={e} />))}
        </div>
    )
}

function FolderCard(props: any) {
    return (
        <div onClick={()=>{props.onclick(props.data._id)}} className="mr-5 flex flex-col items-center hover:scale-110">
            <img src="https://cdn-icons-png.flaticon.com/128/3735/3735057.png" className="w-[50px] h-[50px]" />
            <h1 className="text-black text-xs">{props.data.folder_name}</h1>
        </div>
    )
}

function FileCard(props: any) {
    return (
        <div  className="mr-5 flex flex-col items-center hover:scale-110">
            <img src={props.data.file_url} className="w-[50px] h-[50px]" />
            
            <h1 className="text-black text-xs ">{props.data.file_name.slice(0,10)}</h1>
         
          
        </div>
    )
}