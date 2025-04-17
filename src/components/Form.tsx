import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoveStoryPreview } from "./LoveStoryPreview";
import { createWebsite } from "../api/websiteService";
import { ImageUploader } from "./ImageUploader";
import { SpotifySearchDropdown } from "./SpotifySearchDropdown";
import { handleFileUpload } from "../api/websiteService";

export const Form = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [relationshipDate, setRelationshipDate] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);

  const [selectedSong, setSelectedSong] = useState<any>(null);
  const spotifyToken =
    "BQAGVOp-Q15xM9FP93t9WDbzYU4W0ESLIHSHsJDkmMRogWTEVtjsDgr7BrCW648dXmhN3Fwz5qNotJJIIXqqD3VSFwS7HP3359oqluel36NKWsxJTuc-7aL-_uic4nYcaLZxfZvfsk4";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedSongUrl = selectedSong
    ? `https://open.spotify.com/embed/track/${selectedSong.id}`
    : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const plan = 1;

      const payload = {
        title,
        text: message,
        plan,
        dataCouple: relationshipDate,
        music_url: selectedSongUrl,
      };

      const createdWebsite = await createWebsite(payload);
      const websiteId = createdWebsite.id;

      // Envia os uploads das imagens em paralelo
      const uploadPromises = photos.map((file: File) =>
        handleFileUpload(file, websiteId)
      );
      await Promise.all(uploadPromises);

      console.log("Website e imagens enviados com sucesso!");
      alert(t("form_submitted"));
    } catch (error) {
      console.error("Erro ao criar website ou enviar imagens:", error);
      alert("Erro ao enviar os dados!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row gap-8 items-start justify-center bg-gray-950 p-8">
      {/* Modal de carregamento */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
              {t("form.loading") || "Carregando..."}
            </p>
          </div>
        </div>
      )}

      {/* Formulário */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl px-8 pt-6 pb-8 w-full max-w-md flex-shrink-0">
        <h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r 
                     from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
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
              className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 
                         text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400 
                         focus:ring-2 focus:ring-blue-500/50 transition-all"
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
              className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 
                         text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400 
                         focus:ring-2 focus:ring-blue-500/50 transition-all"
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

          {/* Componente de busca de música Spotify */}
          <SpotifySearchDropdown
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
            spotifyToken={spotifyToken}
          />

          <div className="mb-6">
            <ImageUploader photos={photos} setPhotos={setPhotos} t={t} />
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
        selectedSong={selectedSong}
      />
    </div>
  );
};
