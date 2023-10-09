import { useState } from 'react';
const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;
const apiKey = import.meta.env.VITE_REACT_APP_CLOUDINARY_API_KEY;

const ImageUpload = () => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'wv59iewr'); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImage(data.secure_url);
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading ? (
        <p>Uploading...</p>
      ) : image ? (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
