const express=require('express')
const router=express.Router();
const supabase=require("../database/db")

router.post('/',async(req,res)=>{
    const{email,password,fullname}=req.body;
    try{

     const { data, error } =  await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    fullname: fullname,
                },
                 emailRedirectTo: "http://localhost:5173"
            },
           
        });
    
        if (error) {
            console.error("Error signing up:", error.message);
            return res.status(400).json({ error :"Cannot Authenticate" });;
        }
    
        // Insert the user into 'users' table
        const { error: insertError } = await supabase.from('users').insert([
            {
                id: data.user.id,  // Supabase assigns a UUID
                email: email,
                name: fullname,
                created_at: new Date()
            }
        ]);

        if (insertError) {
            console.error("Error inserting user:", insertError.message);
            return res.status(500).json({ error: insertError.message });
        }

        return res.status(200).json({ status: "successful", message: "Check your email for verification link" });
    }
     catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "Unexpected server error" });
    }


       
})

module.exports=router;

