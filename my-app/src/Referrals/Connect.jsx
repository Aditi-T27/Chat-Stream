import React from 'react'
import { useState } from 'react';
import QrScanner from '../pages/HomePage/Components/QrScanner';
function Connect({userId}) {
    const user=userId;
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const qrCodeGenerator=async()=>{
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      try {
        const response = await fetch(`http://localhost:3001/qrcode?userId=${user}`, requestOptions);
        const result = await response.json();;
        if (result.status === "success") {
            setQrCodeUrl(result.imageDataUrl);
          }
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div><div style={{display:"flex"}}>
       <div style={{width:"50%",height:"98vh",border:"1px solid white"}}><h3>Send Request To Connect</h3>
       <div><QrScanner/></div>
       </div>
       {/* <div  style={{width:"50%",height:"98vh",border:"1px solid white"}}><h3>Recived Requests to Connect</h3></div>
       <div><h4>Gnerate QrCode to send Connections</h4>
         <button onClick={qrCodeGenerator}>Generate QRCode</button>
         {qrCodeUrl && <img src={qrCodeUrl} alt="Generated QR Code" />}
         {qrCodeUrl &&<a href={qrCodeUrl} download="qr_code.png">
  <button>Download QR Code</button>
</a>
}

       </div> */}
       </div>
    </div>
  )
}

export default Connect
