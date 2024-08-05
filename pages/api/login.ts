import { NextApiRequest, NextApiResponse } from "next";
const jwt =require('jsonwebtoken')
var mysql=require("mysql")
const { MongoClient } = require('mongodb');

interface PostData
{
    user_name:string,
    user_email:string,
    user_password:string
}

export default async function Login(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method=="POST")
    {

     
     
          var data:PostData=req.body;
          const url = 'mongodb://localhost:27017';
          const client = new MongoClient(url);
          await client.connect();
          const db = client.db("docs_manager");
          const userCollection = db.collection('user');
      
          var result =await userCollection.find({user_email:data.user_email,user_password:data.user_password}).toArray()
          console.log(result);
     
                if(result.length==0)
                {
                   
                    res.status(200).json({found:false})
                   
                }
                else
                {
                    const key="docs"
                    const token = jwt.sign({ id: result[0]._id, username: result[0].user_name }, key, { expiresIn: '1h' });
                    res.status(200).json({found:true,token:token})
                }


    }
}