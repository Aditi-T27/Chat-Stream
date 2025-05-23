// import React from 'react'
// import { useState } from 'react';
// import QrScanner from './QrScanner';
// function GetQRCode({userId}) {
//     const user=userId;
//     const [qrCodeUrl, setQrCodeUrl] = useState("");
//     const qrCodeGenerator=async()=>{
//     const requestOptions = {
//         method: "GET",
//         redirect: "follow"
//       };
      
//       try {
//         const response = await fetch(`http://localhost:3001/qrcode?userId=${user}`, requestOptions);
//         const result = await response.json();;
//         if (result.status === "success") {
//             setQrCodeUrl(result.imageDataUrl);
//           }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//   return (
//     <div><div style={{display:"flex"}}>
     
       
//        <div><h4>Gnerate QrCode to send Connections</h4>
//          <button onClick={qrCodeGenerator}>Generate QRCode</button>
//          {qrCodeUrl && <img src={qrCodeUrl} alt="Generated QR Code" />}
//          {qrCodeUrl &&<a href={qrCodeUrl} download="qr_code.png">
//   <button>Download QR Code</button>
// </a>
// }

//        </div>
//        </div>
//     </div>
//   )
// }

// export default GetQRCode


import React, { useState } from 'react';


function GetQRCode({ userId, onClose }) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const qrCodeGenerator = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://localhost:3001/qrcode?userId=${userId}`, requestOptions);
      const result = await response.json();
      if (result.status === "success") {
        setQrCodeUrl(result.imageDataUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-center">Generate QR Code to Send Connections</h2>
        
        <div className="flex flex-col items-center gap-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" 
            onClick={qrCodeGenerator}
          >
            Generate QR Code
          </button>

          {qrCodeUrl && (
            <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40 object-contain" />
          )}

          {qrCodeUrl && (
            <a 
              href={qrCodeUrl} 
              download="qrcode.png" 
              className="text-blue-600 underline"
            >
              Download QR Code
            </a>
          )}

          <button 
            className="mt-4 text-red-500 hover:underline" 
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetQRCode;
