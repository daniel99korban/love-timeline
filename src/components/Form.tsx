import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LoveStoryPreview } from "./LoveStoryPreview";

export const Form = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [relationshipDate, setRelationshipDate] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (photos.length + acceptedFiles.length > 12) {
        alert(t("max_photos"));
        return;
      }
      setPhotos((prev) => [...prev, ...acceptedFiles]);
    },
    [photos]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    multiple: true,
  });

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, message, relationshipDate, photos });
    alert(t("form_submitted"));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 items-start justify-center bg-gray-950 p-8">
      {/* Formulário */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl px-8 pt-6 pb-8 w-full max-w-md flex-shrink-0">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {t("form.create_site")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              {t("form.title")}
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("form.enter_title")}
              className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 
                        focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              {t("form.message")}
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("form.enter_message")}
              className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 
                        focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all"
              rows={3}
              required
            ></textarea>
          </div>

          <div className="mb-5">
            <label
              htmlFor="relationshipDate"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              {t("form.relationship_start_date")}
            </label>
            <input
              id="relationshipDate"
              type="date"
              value={relationshipDate}
              onChange={(e) => setRelationshipDate(e.target.value)}
              className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100
                        focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all
                        [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              {t("form.upload_photos")} (max. 12)
            </label>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${
                isDragActive
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-gray-600 hover:border-cyan-400"
              }`}
            >
              <input {...getInputProps()} />

              <div className="space-y-2">
                <PhotoIcon className="mx-auto h-8 w-8 text-cyan-400" />
                <p className="text-sm text-gray-400">
                  {isDragActive ? t("form.drop_photos_here") : t("form.drag_drop_photos")}
                </p>
                <button
                  type="button"
                  className="text-cyan-400 text-sm font-medium hover:text-cyan-300"
                >
                  {t("form.browse_files")}
                </button>
              </div>
            </div>

            {/* Preview das miniaturas */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {photos.map((file, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-lg overflow-hidden"
                >
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
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600
                        text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02]
                        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800
                        shadow-md hover:shadow-lg active:scale-95"
            >
              {t("form.submit")}
            </button>
          </div>
        </form>
      </div>

      {/* Preview */}
      <LoveStoryPreview 
        title={title}
        message={message}
        relationshipDate={relationshipDate}
        photos={photos}
      />
    </div>
  );
};
