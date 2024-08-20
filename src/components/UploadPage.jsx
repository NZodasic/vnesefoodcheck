import React, { useState } from 'react';

function UploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);  // Để lưu kết quả từ API

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile); // Đổi 'file' thành 'image' để phù hợp với backend

        try {
            const response = await fetch('https://appapi.fuzzypn.com/upload_image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);  
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            <h2>Upload Image</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            
            {result && (
                <div>
                    <h3>Prediction Result</h3>
                    <p><strong>Best Class Name:</strong> {result.best_class_name}</p>
                    <p><strong>Highest Confidence:</strong> {result.highest_confidence}</p>
                    <img src={result.image_url} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />
                </div>
            )}
        </div>
    );
}

export default UploadPage;
