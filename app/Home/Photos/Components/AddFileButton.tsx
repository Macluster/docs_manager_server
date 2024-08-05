'use client'

import { useRef } from "react";

function AddFileButton(props:any)
{
 
    const ref=useRef<any>(null)
      
    const handleClick = async () => {

         await ref!.current!.click();
         

       
        

      
      };


    const handleFileChange=async()=>{
      var image:File=ref!.current.files[0];
 
      var data=await fileToBase64(image)
      console.log(data)
      onsubmit(data,image.name)
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
    const fileToBase64 = async (file: File): Promise<string> => {
      const url = URL.createObjectURL(file);
  
      try {
          const response = await fetch(url);
          const blob = await response.blob();
  
          return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                  const base64String = reader.result?.toString().split(',')[1] || '';
                  resolve(base64String);
              };
              reader.onerror = (error) => {
                  URL.revokeObjectURL(url);
                  reject(error);
              };
              reader.readAsDataURL(blob);
          });
      } finally {
          URL.revokeObjectURL(url);
      }
  };
  
  const onsubmit = async (image:any,file_name:string) => {

    var token=localStorage.getItem('token')
    console.log("folder_id="+props.currFolder)
        try {
            const response = await fetch('/api/addFile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image:image,file_name:file_name ,parent_id: props.currFolder==null?0:props.currFolder, cdate: getCurrentDateTime(),file_ext:file_name.split('.')[1],token:token }),
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
    return <div>
             <input onChange={handleFileChange} name="image" ref={ref} type="file" style={{display:'none'}}></input>
             <img  onClick={handleClick} className="h-[30px] w-[30px] ml-2  absolute" src="https://cdn-icons-png.flaticon.com/128/4212/4212157.png"/>
          </div>  
    
   
      
     

}

export default AddFileButton;