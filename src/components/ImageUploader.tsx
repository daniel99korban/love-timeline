import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ImageUploaderProps {
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
  t: (key: string) => string;
}

export const ImageUploader = ({ photos, setPhotos, t }: ImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (photos.length + acceptedFiles.length > 6) {
        alert(t("max_photos"));
        return;
      }
      setPhotos((prev) => [...prev, ...acceptedFiles]);
    },
    [photos, setPhotos, t]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    multiple: true,
  });

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <label className="block text-gray-300 text-sm font-semibold mb-2">
        {t("form.upload_photos")} (max. 7)
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-cyan-400 bg-cyan-500/10" : "border-gray-600 hover:border-cyan-400"}`}
      >
        <input {...getInputProps()} />

        <div className="space-y-2">
          <PhotoIcon className="mx-auto h-8 w-8 text-cyan-400" />
          <p className="text-sm text-gray-400">
            {isDragActive ? t("form.drop_photos_here") : t("form.drag_drop_photos")}
          </p>
          <button type="button" className="text-cyan-400 text-sm font-medium hover:text-cyan-300">
            {t("form.browse_files")}
          </button>
        </div>
      </div>

      {/* Preview das miniaturas */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {photos.map((file, index) => (
          <div key={index} className="relative group aspect-square rounded-lg overflow-hidden">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full hover:bg-red-400 transition-colors"
            >
              <XMarkIcon className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
