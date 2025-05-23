const express=require('express')
const router=express.Router();
const supabase=require('../database/db')
const QRCode=require('qrcode')

router.get('/',(req,res)=>{
    user=req.query.userId;
    console.log(user);
  const data={
     "user":user
  }

  const jsonData=JSON.stringify(data)

//   QRCode.toFile('user.png',jsonData,{
//       color:{
//           dark:"000000",
//           light:"FFFFFF"
//       }
//   },function (err) {
//       if (err) throw err;
//       console.log('QR code saved as user_qr.png');
//       res.status(200).json({status:"success created QR code :)"})
//     });


QRCode.toDataURL(jsonData, {
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  }, function (err, url) {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: 'error', message: 'Failed to generate QR code' });
    }

    // Return the base64-encoded image URL
    res.status(200).json({
      status: 'success',
      message: 'QR code created successfully!',
      imageDataUrl: url  // base64 image string
    });
  });
  
})

module.exports=router;