import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../api/axiosInstance";

interface SpotifySearchDropdownProps {
  selectedSong: any;
  setSelectedSong: (song: any) => void;
  spotifyToken: string;
}

export const SpotifySearchDropdown = ({
  selectedSong,
  setSelectedSong,
}: SpotifySearchDropdownProps) => {
  const { t } = useTranslation();
  const [songQuery, setSongQuery] = useState<string>("");
  const [songSuggestions, setSongSuggestions] = useState<any[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  // Função para buscar músicas no Spotify
  async function searchSpotifyTracks(query: string) {
    try {
      const response = await api.get('/websites/search-music', {
        params: {
          search: query,
          type: 'track',
          limit: 5,
        },
      });

      const data = await response.data;
      if (data) {
        setSongSuggestions(data);
      }
    } catch (error) {
      console.error("Erro na busca de músicas", error);
    }
  }

  // Implementação de debounce para aguardar 500ms após a última digitação
  useEffect(() => {
    if (!isDropdownVisible || songQuery.length < 3) {
      setSongSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      searchSpotifyTracks(songQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [songQuery, isDropdownVisible]);

  // Função para selecionar uma música da lista
  const handleSongSelect = (track: any) => {
    setSelectedSong(track);
    setSongQuery(
      `${track.name} - ${track.artists.map((a: any) => a.name).join(", ")}`
    );
    setSongSuggestions([]);
    setDropdownVisible(false);
  };

  return (
    <div className="mb-5">
      <label
        htmlFor="spotify-song"
        className="block text-gray-300 text-sm font-semibold mb-2"
      >
        {t("form.spotify_song_label")}
      </label>
      <input
        id="spotify-song"
        type="text"
        value={songQuery}
        onChange={(e) => {
          setSongQuery(e.target.value);
          setSelectedSong(null);
          setDropdownVisible(true);
        }}
        placeholder={t("form.spotify_song_placeholder")}
        className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all"
      />
      {isDropdownVisible && songSuggestions.length > 0 && (
        <ul className="bg-gray-800 border border-gray-600 mt-1 rounded-lg">
          {songSuggestions.map((track) => {
            const albumImage =
              track.album.images[2]?.url || track.album.images[0]?.url;

            return (
              <li
                key={track.id}
                onClick={() => handleSongSelect(track)}
                className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-700 transition-colors"
              >
                {albumImage && (
                  <img
                    src={albumImage}
                    alt={track.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                )}
                <span className="text-gray-100">
                  {track.name} {t("form.spotify_song_by")} {" "}
                  {track.artists.map((artist: any) => artist.name).join(", ")}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {selectedSong && (
        <p className="text-green-400 mt-2">
          {t("form.spotify_song_selected")} : {selectedSong.name} - {" "}
          {selectedSong.artists.map((a: any) => a.name).join(", ")}
        </p>
      )}
    </div>
  );
};