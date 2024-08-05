import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
const path = require('path');
import multer from 'multer';
import { Console } from "console";
const jwt = require('jsonwebtoken')
const { MongoClient } = require('mongodb');

const uploadsDir = "/home/deepu/Coding/Nextjs/docs_manager/uploads/"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Directory to save files
  },
  filename: (req, file, cb) => {
  
    cb(null, file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage,limits: { fileSize: 100 * 1024 * 1024 } });

// Create an 'uploads' directory if it doesn't exist
const fs = require('fs');

console.log(uploadsDir)
try {


  if (!fs.existsSync(uploadsDir)) {
    console.log("dir not found")
    fs.mkdirSync(uploadsDir);
  }
  else {
    console.log("dir found")
  }
}
catch (e) {
  console.log(e)
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

async function Createfolders(path: String) {


  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db("docs_manager");
  const filesCollection = db.collection('files');
  const insertResult = await filesCollection.find({file_path:path});
  if(insertResult.length>0)
  {
      console.log("directory found")
  }
  else
  {
    var  folders=path.split("emulated")[1].split('/')
    folders=folders.filter(item=>item!="0")
    folders.pop()
    folders.shift()
    console.log(folders)
    var currFolder="0"
    for(var e of folders)
    {




      const folderCollection = db.collection('folders');

      var res=await folderCollection.find({folder_name:e},{projection:{_id:true}}).toArray()
      console.log(res)
      if(res.length>0)
      {
        console.log("folder found"+res[0]._id)
        currFolder=res[0]._id.toString();
      }
      else
      {
       
        const insertResult = await folderCollection.insertOne({folder_name:e,parent_id:currFolder,user_id:'66a467da753c887bc3f08d99',created_date:getCurrentDateTime()});
        currFolder=insertResult.insertedId.toString();
        console.log("Creating Folder"+e.toString()+`(${currFolder})`)
        console.log("done")

      }


    }
 
  

    return {parent_id:currFolder,path:folders.join('/')}
  }
}


async function  createfile(name:any,parent_id:any,path:any) {

  console.log("Creating File"+name)

  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db("docs_manager");
  const filesCollection = db.collection('files');
  
  const insertResult = await filesCollection.insertOne({file_name:name,parent_id:parent_id,file_path:path,file_ext:name,created_date:getCurrentDateTime(),file_url:`http://192.168.1.41:3000/api/showFile?file=${name}`,user_id:'66a467da753c887bc3f08d99'});
  console.log("done")
}












export default async function uploadFiles(req: NextApiRequest, res: NextApiResponse) {

  if (req.method == "POST") {

    console.log("-----------------------------------File ---------------------------------------")
    upload.fields([{ name: 'file' }, { name: 'path' }])(req as any, res as any,async (err: any) => {
      console.log(req.body.path)

     var data= await Createfolders(req.body.path)
      var temp=req.body.path.split("/")

      createfile(req.body.path.split("/")[temp.length-1],data['parent_id'],data['path'])



      if (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
      }

      // Success response
     
    });

    res.status(200).json({ message: 'File uploaded successfully' });


  }


}

export const config = {
  api: {
    bodyParser: false,
    timeout: 30000,
  },
}