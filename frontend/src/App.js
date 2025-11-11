import React from "react";
import "./App.css";
import ImageUploader from "./ImageUploader";

function App() {
  return (
    <div className="App" style={{ maxWidth: "480px", margin: "2rem auto", padding: "1rem" }}>
      <h1>CrowdCatch Image Upload</h1>
      <p>Select an image to preview and upload it to S3.</p>
      <ImageUploader />
    </div>
  );
}

export default App;
