// utils/ImageUploader.js
import axios from "@/utils/axiosInstance"

export function ImageUploader({ onSuccess }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      onSuccess(res.data.fileId)
    } catch (err) {
      console.error("Image upload failed", err)
    }
  }

  return <input type="file" accept="image/*" onChange={handleUpload} />
}
