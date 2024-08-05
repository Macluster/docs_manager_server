


import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
var mysql      = require('mysql');
import path from 'path';
import fs from 'fs';
const jwt=require('jsonwebtoken')
const { MongoClient } = require('mongodb');
interface PostData
{
    file_name:string,
    parent_id:string,
    cdate:string,
    image:any,
    file_ext:any,
    token:any
}
export default async function POST(req:NextApiRequest,res:NextApiResponse) {


    if(req.method==="POST")
    {
        const data :PostData =req.body;
        console.log(data)
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'docs_manager'
          });
           
            var err:any= connection.connect();

            const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
            const buffer:any = Buffer.from(base64Data, 'base64');

            // Example: Save file to the server
            const fileName =data.file_name; // Example: Use current timestamp for unique file name
            const filePath = path.join(process.cwd(), 'uploads', fileName); // uploads directory should exist

            fs.writeFileSync(filePath, buffer, 'binary');

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

        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("docs_manager");
        const filesCollection = db.collection('files');
        const insertResult = await filesCollection.insertOne({parent_id:data.parent_id,file_name: data.file_name,file_ext:data.file_ext,created_date:data.cdate,file_url:`http://localhost:3000/api/showPhoto?image=${data['file_name']}`,user_id:user_id });
      
           
       
     
        res.setHeader('Allow', ['POST']);
         res.status(200).json("file created");
    }

    
}