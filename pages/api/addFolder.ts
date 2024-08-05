


import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
var mysql      = require('mysql');
const jwt=require('jsonwebtoken')
const { MongoClient } = require('mongodb');

interface PostData
{
    folder_name:string,
    parent_id:string,
    cdate:string,
    token:any
}
export default async function POST(req:NextApiRequest,res:NextApiResponse) {


    if(req.method==="POST")
    {
        const data :PostData =req.body;
        console.log(data)
      
        var user_id="";
        jwt.verify(data.token, 'docs', (err:any, decoded:any) => {
          if (err) {
            // Token verification failed
            return res.status(401).json({ message: 'Unauthorized' });
          }
      
          // Token is valid, proceed with handling the request
          // Example: accessing decoded information
          console.log(decoded.id); // Outputs: 1234567890
          user_id=decoded.id
       
        });
        console.log("userid="+user_id)
        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("docs_manager");
        const foldersCollection = db.collection('folders');
        const insertResult = await foldersCollection.insertOne({folder_name:data.folder_name,parent_id: data.parent_id,user_id:user_id,created_date:data.cdate });
        
        res.setHeader('Allow', ['POST']);
         res.status(200).json("folder created");
    }

    
}