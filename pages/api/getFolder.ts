





import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
var mysql      = require('mysql');
const { MongoClient } = require('mongodb');

interface PostData
{
    folder_id:string,
    folder_name:string,
    parent_id:string,
    cdate:string
}
export default async function POST(req:NextApiRequest,res:NextApiResponse) {
console.log("safasff")

    if(req.method==="POST")
    {
        const data :PostData =req.body;
        console.log(data)
     

        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("docs_manager");
        const folderCollection = db.collection('folders');
        
        var result =await folderCollection.find({parent_id:data.folder_id}).toArray()





           
         
            console.log(result)
            res.setHeader('Allow', ['POST']);
            res.status(200).json(result);
            
         //   console.log('The solution is: ', results[0].solution);
  
     
     
       
    }

    
}