import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoveStoryPreview } from "./LoveStoryPreview";
import { createWebsite } from "../api/websiteService";
import { ImageUploader } from "./ImageUploader";
import { SpotifySearchDropdown } from "./SpotifySearchDropdown";
import { handleFileUpload } from "../api/websiteService";

export const Form = () => {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [relationshipDate, setRelationshipDate] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const maxLength = 200;
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);

  const selectedSongUrl = selectedSong
    ? `https://open.spotify.com/embed/track/${selectedSong.id}`
    : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const plan = 1;

      const language = i18n.language;

      const payload = {
        title,
        text: message,
        plan,
        dataCouple: relationshipDate,
        music_url: selectedSongUrl,
        language,
      };

      const createdWebsite = await createWebsite(payload);
      const websiteId = createdWebsite.id;

      // Envia os uploads das imagens em paralelo
      const uploadPromises = photos.map((file: File) =>
        handleFileUpload(file, websiteId)
      );
      await Promise.all(uploadPromises);
      setShowSuccess(true);

      console.log("Website e imagens enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao criar website ou enviar imagens:", error);
      setShowError(true);
    } finally {
      setTimeout(() => {
        setShowSuccess(false);
        setShowError(false);
      }, 4000);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row gap-8 items-start justify-center bg-gray-950 p-8">
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
              className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all"
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
              className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all"
              rows={3}
              required
              maxLength={200}
            ></textarea>
            <p className="text-xs text-gray-400 mt-1 text-right">
              {message.length}/{maxLength}
            </p>
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
              className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
              required
            />
          </div>

          {/* Componente de busca de música Spotify */}
          <SpotifySearchDropdown
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />

          <div className="mb-6">
            <ImageUploader photos={photos} setPhotos={setPhotos} t={t} />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 py-2 px-4 rounded-lg font-semibold transition-all 
    ${
      isLoading
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    } 
    text-white flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                {t("form.submitting")}
              </>
            ) : (
              t("form.submit")
            )}
          </button>
        </form>
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-50">
            {t("form.form_submitted")}
          </div>
        )}

        {showError && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-opacity duration-500 z-50">
            {t("form.error_message")}
          </div>
        )}
      </div>

      {/* Preview */}
      <LoveStoryPreview
        title={title}
        message={message}
        relationshipDate={relationshipDate}
        photos={photos}
        selectedSong={selectedSong}
      />
    </div>
  );
};
