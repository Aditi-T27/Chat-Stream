// // src/components/QrScanner.js
// import React, { useEffect, useRef, useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// const QrScanner = () => {
//   const [scanResult, setScanResult] = useState("None");
//   const scannerRef = useRef(null);

//   useEffect(() => {
//     const onScanSuccess = (decodedText, decodedResult) => {
//       console.log("Scanned Data:", decodedText);
//       setScanResult(decodedText);

//       // Stop scanning
//       scannerRef.current.clear().catch((error) => {
//         console.error("Failed to clear scanner: ", error);
//       });
//     };

//     scannerRef.current = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250 },
//       false
//     );

//     scannerRef.current.render(onScanSuccess);

//     // Cleanup on component unmount
//     return () => {
//       scannerRef.current?.clear?.();
//     };
//   }, []);

//   return (
//     <>
//     <div>
//       <h2>Scan a QR Code using Webcam</h2>
//       <div id="reader" style={{ width: '400px' }}></div>
//       <p><strong>Scanned Result:</strong> <span>{scanResult}</span></p>
//     </div>
//     </>
//   );
// };

// export default QrScanner;


import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = ({userId}) => {
const user=userId;

  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef(null);

  useEffect(() => {
    const onScanSuccess = (decodedText, decodedResult) => {
      console.log("Scanned Data:", decodedText);
      setScanResult(decodedText);
      setIsScanning(false);
      
      // Stop scanning
      scannerRef.current.clear().catch((error) => {
        console.error("Failed to clear scanner: ", error);
      });
    };

    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        formatsToSupport: [0, 1, 2, 3, 4]  // Supports all common formats
      },
      false
    );

    scannerRef.current.render(onScanSuccess);

    // Cleanup on component unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, []);

  const resetScanner = () => {
    setScanResult(null);
    setIsScanning(true);
    
    setTimeout(() => {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          formatsToSupport: [0, 1, 2, 3, 4]  // Supports all common formats
        },
        false
      );
      
      scannerRef.current.render((decodedText) => {
        setScanResult(decodedText);
        setIsScanning(false);
        scannerRef.current.clear().catch(console.error);
      });
    }, 100);
  };

  
  const handleSendRequest = async () => {
    const parsedResult = JSON.parse(scanResult);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        sender_id: user,
        receiver_id: parsedResult.user,
      });
     
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      const response = await fetch("http://localhost:3001/req", requestOptions);
      const result = await response.json();
      const message=result.message;
      {alert(`${message}`)}
      console.log(result);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">QR Code Scanner</h2>
        <p className="text-gray-600">Position the QR code within the camera view</p>
      </div>

      <div className="mb-6">
        {isScanning ? (
          <div id="reader" className="mx-auto rounded-lg overflow-hidden"></div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <div className="text-green-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700 mb-1">Scan complete!</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Scan Result</h3>
        {scanResult ? (<div>
          <div className="break-words bg-white p-3 rounded border border-gray-200">
            <p className="font-mono text-gray-800">{scanResult}</p>
          </div>
          <button className='p-1 font-bold hover:pointer bg-color: bg-green-600 rounded-md mt-2' onClick={handleSendRequest}>Send Request</button></div>
        
        ) : (
          <div className="text-gray-500 italic">No QR code scanned yet</div>
        )}
      </div>

      {!isScanning && (
        <div className="text-center mt-4">
          <button
            onClick={resetScanner}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QrScanner;