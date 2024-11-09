import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import "./QRData.css";

function QRData() {
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQrValue(url);
    setUrl("");
  };

  const handleDownload = () => {
    if (qrRef.current === null) return;

    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch((err) => {
        console.error("Could not download QR code", err);
      });
    console.log("download");
  };

  return (
    <div className="container">
      <h1 className="header">QR Code Generator</h1>

      <div ref={qrRef} className="qrCodeContainer">
        <QRCode value={qrValue || " "} />
      </div>

      <form onSubmit={handleSubmit} className="form">
        <p>Enter your text here</p>
        <input
          type="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL"
          required
          className="input"
        />
        <input type="submit" value="Generate QR Code" className="button" />
      </form>

      {qrValue && (
        <button onClick={handleDownload} className="downloadButton">
          Download QR Code
        </button>
      )}
    </div>
  );
}

export default QRData;
