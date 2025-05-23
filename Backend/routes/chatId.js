// const express= require('express')
// const router=express.Router();
// const supabase= require('../database/db');

// router.get('/',async ( req, res) =>{
//     try{
//     const { userId, receiverId } = req.query;

//     const { data, error } = await supabase
//   .from("chats")
//   .select("id")
//   .or(
//     `and(user1.eq.${userId},user2.eq.${receiverId}),and(user1.eq.${receiverId},user2.eq.${userId})`
//   );

//   if (error) throw error;
  
//   res.json(data);
// } catch (error) {
//   res.status(500).json({ error: error.message });
// }

// })

// module.exports=router


const express = require('express');
const router = express.Router();
const supabase = require('../database/db');

router.get('/', async (req, res) => {
  try {
    // Trim and validate input
    const userId = req.query.userId;
    const receiverId = req.query.receiverId;

    if (!userId || !receiverId) {
      return res.status(400).json({ error: "Missing or invalid userId or receiverId" });
    }

    const { data, error } = await supabase
      .from("chats")
      .select("id")
      .or(
        `and(user1.eq.${userId},user2.eq.${receiverId}),and(user1.eq.${receiverId},user2.eq.${userId})`
      );

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
