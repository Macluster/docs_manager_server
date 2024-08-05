'use client'

function AddFolderButton()
{
    const handleClick = async () => {

        var ele=document.getElementById('popup');
        ele!.style.display="flex";
      
      };
    return   <img onClick={handleClick}  className="h-[30px] w-[30px] ml-5" src="https://cdn-icons-png.flaticon.com/128/4202/4202583.png"/>
}


export default AddFolderButton;