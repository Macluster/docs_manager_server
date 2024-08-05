import { NextApiRequest, NextApiResponse } from "next";

var mysql=require('mysql')
const { MongoClient } = require('mongodb');
interface PostData
{
    user_name:string,
    user_email:string,
    user_password:string
}


export default async function register(req:NextApiRequest,res:NextApiResponse)
{

    if(req.method=="POST")
    {
        var data:PostData=req.body;

        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("docs_manager");
        const userCollection = db.collection('user');
        const insertResult = await userCollection.insertOne({ user_name:data.user_name,user_email: data.user_email,user_password:data.user_password });
        // console.log('Inserted document:', insertResult.insertedId);
        
        // var con = mysql.createConnection({
        //     host     : 'localhost',
        //     user     : 'root',
        //     password : '',
        //     database : 'docs_manager'
        //   });


        //   con.query(`insert into user(user_name,user_email,user_password) values('${data.user_name}','${data.user_email}','${data.user_password}')`,function(err:string,result:string){

          
        
        // })

        res.status(200).json("Cant SignUp")


    }


}