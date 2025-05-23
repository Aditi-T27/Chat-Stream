import React, { useState } from "react";

export default function RequestModal({ requests, onClose, identity }) {
  const [requestStatusMap, setRequestStatusMap] = useState({});

  const handleReqAccept = async (user1, user2, reqId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user1,
      user2,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:3001/acceptReq", requestOptions);
      const result = await response.json();
      console.log(result);

      if (result.status === "Success" || result.status === "Sucess") {
        setRequestStatusMap((prev) => ({
          ...prev,
          [reqId]: "sent",
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Friend Requests</h2>

        {requests.length === 0 ? (
          <p className="text-gray-500">No requests received.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req, index) => {
              const user1 = req.receiver_id;
              const user2 = req.sender_id;
              const isSent = requestStatusMap[req.id] === "sent";

              return (
                <li
                  key={req.id}
                  className="border rounded-lg p-3 hover:shadow transition"
                >
                  <div className="flex w-full">
                    <div className="w-1/2">
                      <p className="font-semibold">{identity}</p>
                      <p className="text-sm text-gray-600">{req.request_status}</p>
                      <p className="text-sm text-gray-600">{req.created_at}</p>
                    </div>
                    <div className="flex justify-center items-center w-1/2">
                      <button
                        className={`p-2 rounded-md font-bold transition ${
                          isSent
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:border-dotted hover:border-white hover:border-2 hover:bg-blue-300 hover:text-blue-600"
                        }`}
                        disabled={isSent}
                        onClick={() => handleReqAccept(user1, user2, req.id)}
                      >
                        {isSent ? "Sent" : "Connect"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
