import { useTranslation } from "react-i18next";
import {
  PhotoIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { RelationshipTimer } from "./RelationshipTimer";

interface LoveStoryPreviewProps {
  title: string;
  message: string;
  relationshipDate: string;
  photos: File[];
  selectedSong: any;
}

export const LoveStoryPreview = ({
  title,
  message,
  relationshipDate,
  photos,
  selectedSong,
}: LoveStoryPreviewProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 border-2 border-purple-500/20 rounded-xl shadow-2xl p-6 w-full max-w-md flex-shrink-0 backdrop-blur-sm">
      {/* Título */}
      <div className="mb-8 text-center group">
        <div className="inline-block bg-gradient-to-r from-purple-600/30 to-pink-500/30 px-6 py-2 rounded-full border border-purple-500/30 transition-all hover:bg-purple-500/10">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
            {title || t("form.default_title")}
          </h1>
        </div>
        <SparklesIcon className="h-5 w-5 text-pink-400/50 mx-auto mt-2 animate-pulse" />
      </div>

      {/* Timer */}
      <div className="mb-8 text-center p-4 bg-purple-900/20 rounded-xl border border-purple-500/20 hover:border-pink-500/30 transition-all">
        {relationshipDate ? (
          <RelationshipTimer startDate={relationshipDate} />
        ) : (
          <div className="text-purple-300/50 flex items-center justify-center space-x-2">
            <HeartIcon className="w-5 h-5" />
            <span>{t("form.select_date")}</span>
          </div>
        )}
      </div>

      {/* Galeria */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-600/20 mb-6 transform hover:scale-[0.98] transition-all duration-300">
        {photos[0] ? (
          <div className="relative h-full w-full overflow-hidden group">
            <img
              src={URL.createObjectURL(photos[0])}
              alt="Capa"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-pink-400/30">
            <PhotoIcon className="w-16 h-16 animate-pulse" />
          </div>
        )}
      </div>

      {/* Mensagem */}
      <div className="relative mb-6 bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-xl p-4 border border-purple-500/30 min-h-[150px]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        {message ? (
          <p className="text-purple-100 leading-relaxed whitespace-pre-wrap break-words font-serif text-justify">
            {message}
          </p>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <span className="text-purple-400/50 block">✍️</span>
              <p className="text-purple-400/50 italic text-sm">
                {t("form.default_message")}
              </p>
            </div>
          </div>
        )}
        <div className="absolute bottom-2 right-2 text-purple-400/30">
          <HeartIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Grid de Fotos */}
      <div className="grid grid-cols-3 gap-2">
        {photos.slice(1).map((file, index) => (
          <div
            key={index + 1}
            className="relative aspect-square rounded-lg overflow-hidden transform transition-all 
                      hover:scale-105 hover:z-10 hover:shadow-xl group"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:rotate-1 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-transparent to-transparent" />
          </div>
        ))}
        {[...Array(6 - photos.length)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square rounded-lg border-2 border-dashed border-purple-500/30 bg-purple-900/10 
                      flex items-center justify-center hover:bg-purple-500/10 transition-colors"
          >
            <div className="text-purple-400/30 animate-pulse">
              <PhotoIcon className="w-8 h-8" />
            </div>
          </div>
        ))}
      </div>

      {/* Spotify Player */}
      {selectedSong && (
        <div className="mt-6 border border-purple-500/20 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-800/40 to-pink-800/30 backdrop-blur-md">
          <iframe
            src={`https://open.spotify.com/embed/track/${selectedSong.id}?utm_source=generator&autoplay=1`}
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-b-xl"
          ></iframe>
        </div>
      )}
    </div>
  );
};
