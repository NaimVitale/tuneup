// /services/cloudinaryService.js

export const uploadToCloudinary = async (file) => {
  const CLOUDINARY = `${import.meta.env.CLOUDINARY_API_URL}`;
  if (!file) return "";
  console.log()

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "YOUR_UPLOAD_PRESET");

  try {
    const res = await fetch(CLOUDINARY, {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    return json.secure_url;
  } catch (error) {
    console.error("Error subiendo imagen a Cloudinary:", error);
    return "";
  }
};