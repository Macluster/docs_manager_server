





import { Console, error } from "console";
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


    if(req.method==="POST")
    {
        const data :PostData =req.body;
        console.log(data)
        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("docs_manager");
        const fileCollection = db.collection('files');
    
        var result =await fileCollection.find({parent_id:data.folder_id}).toArray()
        console.log(result)
            res.setHeader('Allow', ['POST']);
            res.status(200).json(result);
        
      
         
     
       
    }

    
}