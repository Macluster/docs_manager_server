'use client'

import { useState } from "react";
import AddFileButton from "./Components/AddFileButton";
import AddFolderButton from "./Components/AddFolderButton";
import AddfodlerModaal from "./Components/AddFolderModaal";
import ContentDisplay from "./Components/ContentDisplay";


function PhotosPage() {

    const [currFolder,setCurfolder]=useState()
    const [folders,setFolders]=useState([])
    const [files,setfiles]=useState([])

    return (
        <div className="h-full w-full">
            <div style={{backgroundColor:'rgba(0, 0, 0, 0.8)'}}  className="h-[100vh] w-[100vw] hidden  fixed top-0 left-0 flex-col justify-center items-center " id="popup">
                 <AddfodlerModaal currFolder={currFolder}/>
            </div>
            <div className="h-full w-full p-10">

                <div className="flex flex-row">
                    <h1 className="text-3xl font-bold">PHOTOS</h1>
                    <AddFolderButton  />
                    <AddFileButton currFolder={currFolder} />
                </div>
                <div className="w-full h-full ">
                    <ContentDisplay files={files} setfiles={setfiles} folders={folders} setFolders={setFolders} currFolder={currFolder} setCurrFolder={setCurfolder}/>
                </div>

            </div>
        </div>

    )
}
export default PhotosPage;