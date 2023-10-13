import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState, useRef } from "react";
import { db } from "../cards/firebase";
import { useNavigate } from "react-router-dom";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  let navigate = useNavigate();

  useEffect(() => {
    const qrCodeId = "reader";
    const scanner = new Html5QrcodeScanner(qrCodeId, {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    // Save the scanner instance to the ref
    scannerRef.current = scanner;

    // Define a flag to track whether a successful scan has occurred
    let scanned = false;

    scanner.render(success, error);

    function success(result) {
      if (!scanned) {
        scanned = true;
        scanner.clear();
        setScanResult(result);
        removeVideoElement(qrCodeId);
      }
    }

    function error(err) {
      console.warn(err);
    }

    // Helper function to remove the video element from the DOM
    function removeVideoElement(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        const videoElement = element.querySelector("video");
        if (videoElement) {
          videoElement.srcObject.getTracks().forEach((track) => track.stop());
        }
        element.removeChild(videoElement);
      }
    }

    // Cleanup when the component unmounts
    return () => {
      scanner.clear();
    };
  }, []);

  // Update allcards in firebase
  const handleCardClick = async (selectedCard) => {
    const cardsCollection = collection(db, "allcards");
    const q = query(cardsCollection, where("cardno", "==", selectedCard));

    try {
      // Execute the query
      const querySnapshot = await getDocs(q);

      // Check if there are matching documents
      if (querySnapshot.empty) {
        console.log("Not a valid card");
        alert("Not a valid card")
        // window.location.reload();
        // navigate("/scan");
        startScanningAgain();
        return; // No matching documents, exit the function
      }

      // Iterate through the documents and access the data
      querySnapshot.forEach((doc) => {
        const cardData = doc.data();
        console.log("Matching Card Data:", cardData);

        // Update the 'arrived' field of the document
        updateDoc(doc.ref, {
          arrived: !cardData.arrived,
        });
        alert("Card updated successfully in firebase")
        navigate("/get-cards");
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Function to start scanning again
  const startScanningAgain = () => {
    setScanResult(null);
    const scanner = scannerRef.current;
    if (scanner) {
      scanner.render();
    }
  };

  return (
    <div>
      <h1>QR Code Scanning React App</h1>
      {scanResult ? (
        <div>
          <h3 onClick={() => handleCardClick(scanResult)}>Card Scanned: {scanResult}</h3>
          <br />
          <div id="reader" ref={videoRef}></div>
          <button className="my-3" onClick={startScanningAgain}>
            Scan Again
          </button>
        </div>
      ) : (
        <div>
          <div id="reader" ref={videoRef}></div>
          <button className="my-3" onClick={startScanningAgain}>
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
