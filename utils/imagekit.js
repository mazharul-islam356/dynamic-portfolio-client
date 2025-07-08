import { IKUpload } from "imagekitio-react"

export function ImageUploader({ onSuccess, folder = "portfolio", children }) {
  return (
    <IKUpload
      fileName={`${Date.now()}.jpg`}
      folder={folder}
      useUniqueFileName
      onSuccess={(res) => onSuccess(res.url)}
      onError={(err) => console.error(err)}
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      className="cursor-pointer"
    >
      {children}
    </IKUpload>
  )
}
