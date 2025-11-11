import React, { useRef, useState } from "react";

const palette = {
  jasmine: "#EECF6D",
  satinSheenGold: "#D5AC4E",
  goldenBrown: "#8B6220",
  barnRed: "#720E07",
  chocolateCosmos: "#45050C",
  backdrop: "#FBF1D4",
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    padding: "3rem 1.5rem",
    background: `linear-gradient(135deg, ${palette.backdrop} 0%, #F8E4A6 40%, #F2CF87 100%)`,
    color: palette.chocolateCosmos,
  },
  headingBlock: {
    textAlign: "center",
    maxWidth: "640px",
  },
  heading: {
    margin: "0 0 0.5rem",
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
    letterSpacing: "0.04em",
  },
  subheading: {
    margin: 0,
    fontSize: "clamp(0.95rem, 2.2vw, 1.05rem)",
    color: palette.goldenBrown,
  },
  accent: {
    display: "inline-block",
    padding: "0.35rem 0.85rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#FFF4E0",
    backgroundColor: palette.barnRed,
    marginBottom: "0.75rem",
  },
  logoStack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.9rem",
    marginBottom: "1.5rem",
  },
  logoImage: {
    width: "62px",
    height: "62px",
    borderRadius: "16px",
    objectFit: "cover",
    boxShadow: "0 14px 30px rgba(114, 14, 7, 0.25)",
    border: `2px solid ${palette.jasmine}`,
  },
  logoTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "1.05rem",
    lineHeight: 1.2,
    color: palette.chocolateCosmos,
    fontWeight: 700,
  },
  card: {
    width: "min(92vw, 520px)",
    backgroundColor: "#FFFDF6",
    borderRadius: "20px",
    boxShadow: "0 28px 60px rgba(69, 5, 12, 0.18)",
    padding: "2.75rem clamp(1.75rem, 4vw, 2.5rem)",
    border: `1px solid rgba(213, 172, 78, 0.35)`,
  },
  dropzone: (isDragActive) => ({
    border: `2px dashed ${isDragActive ? palette.barnRed : palette.satinSheenGold}`,
    borderRadius: "18px",
    padding: "2.25rem 1.5rem",
    textAlign: "center",
    backgroundColor: isDragActive ? "#FFEFD8" : "#FFF7E6",
    color: palette.chocolateCosmos,
    cursor: "pointer",
    transition: "border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease",
    boxShadow: isDragActive ? "0 16px 32px rgba(114, 14, 7, 0.12)" : "none",
  }),
  dropzoneTitle: {
    marginBottom: "0.5rem",
    fontWeight: 700,
    color: palette.chocolateCosmos,
    fontSize: "1.05rem",
  },
  dropzoneHint: {
    margin: 0,
    fontSize: "0.95rem",
    color: "#7A5C30",
  },
  fileName: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: palette.barnRed,
    fontWeight: 600,
    wordBreak: "break-word",
  },
  previewWrapper: {
    marginTop: "1.75rem",
    borderRadius: "16px",
    overflow: "hidden",
    border: `1px solid ${palette.satinSheenGold}`,
    boxShadow: "0 18px 38px rgba(213, 172, 78, 0.25)",
    backgroundColor: "#FFF3D4",
    padding: "0.75rem",
  },
  previewImage: {
    width: "100%",
    height: "280px",
    objectFit: "contain",
    borderRadius: "12px",
    background: "#FFF",
  },
  button: (enabled) => ({
    marginTop: "2.25rem",
    width: "100%",
    padding: "0.95rem 1rem",
    backgroundColor: enabled ? palette.goldenBrown : "rgba(139, 98, 32, 0.55)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "14px",
    fontSize: "1.05rem",
    fontWeight: 700,
    cursor: enabled ? "pointer" : "not-allowed",
    transition: "transform 0.2s ease, box-shadow 0.25s ease",
    boxShadow: enabled ? "0 16px 32px rgba(114, 14, 7, 0.18)" : "none",
  }),
  message: (isError) => ({
    marginTop: "1.25rem",
    textAlign: "center",
    fontWeight: 600,
    color: isError ? palette.barnRed : "#2F8F3A",
  }),
};

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileSelection = (file) => {
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadMessage("");
    setIsError(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    handleFileSelection(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    const file = event.dataTransfer.files?.[0];
    handleFileSelection(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file before uploading.");
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload response:", data);
      setUploadMessage("Image uploaded successfully!");
      setIsError(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("Failed to upload image. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.headingBlock}>
        <span style={styles.accent}>Smart Uploads</span>
        <h1 style={styles.heading}>CrowdCatch Image Upload</h1>
        <p style={styles.subheading}>
          Select, preview, and securely upload images to your CrowdCatch storage
          bucket.
        </p>
      </div>

      <div style={styles.logoStack}>
        <img src="/crowdcatchlogo.png" alt="CrowdCatch logo" style={styles.logoImage} />
        <div style={styles.logoTitle}>
          <span style={{ fontSize: "1.1rem" }}>CrowdCatch</span>
          <span style={{ fontWeight: 500, color: palette.satinSheenGold }}>Capture • Curate • Share</span>
        </div>
      </div>

      <div style={styles.card}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={styles.dropzone(isDragActive)}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <p style={styles.dropzoneTitle}>Drag & Drop your image here</p>
          <p style={styles.dropzoneHint}>or click to browse files</p>
          {selectedFile && (
            <p style={styles.fileName}>Selected: {selectedFile.name}</p>
          )}
        </div>

        {previewUrl && (
          <div style={styles.previewWrapper}>
            <img
              src={previewUrl}
              alt="Selected preview"
              style={styles.previewImage}
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          style={styles.button(Boolean(selectedFile))}
          onMouseEnter={(event) => {
            if (selectedFile) {
              event.currentTarget.style.backgroundColor = palette.barnRed;
              event.currentTarget.style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = palette.goldenBrown;
            event.currentTarget.style.transform = "translateY(0)";
          }}
          disabled={!selectedFile}
        >
          Upload to S3
        </button>

        {uploadMessage && (
          <p style={styles.message(isError)}>{uploadMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
