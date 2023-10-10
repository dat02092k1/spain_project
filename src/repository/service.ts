import axios from "axios"; 
const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;

export const uploadImg = async (formData: FormData) => {
    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          );

        return res.data.secure_url; 
    } catch (error) {
        throw error; 
    }
}