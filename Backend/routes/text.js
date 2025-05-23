const express=require('express')
const app=express()
const supabase=require('../database/db');
const router=express.Router();
app.use(express.json());
router.post('/',async(req,res)=>{
    console.log("sjdsk")
 const{sender_id,receiver_id,content,chat_id}=req.body
 console.log(req.body)
 
 if (!sender_id || !receiver_id || !content ||  ! chat_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const {data,error}= await supabase
  .from("messages")
  .insert([{sender_id,receiver_id,content,chat_id}])

  if(error){
    console.log(error);
    res.status(500).json({error:error.message})

  }
  res.status(200).json({status:"Message Saved",data});
})

module.exports=router;