import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PhotoIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { RelationshipTimer } from '../components/RelationshipTimer';

// Função para transformar o título em slug amigável para URLs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')                     // separa os acentos dos caracteres
    .replace(/[\u0300-\u036f]/g, '')        // remove os acentos
    .replace(/&/g, 'and')                  // substitui o "&" por "and"
    .replace(/[^a-z0-9]+/g, '-')            // substitui caracteres inválidos por hífens
    .replace(/^-+|-+$/g, '');               // remove hífens do início e do fim
}

// Interface dos dados vindos do banco de dados
interface LoveStoryData {
  title: string;
  message: string;
  relationshipDate: string;
  photos: string[];
}

// Função que simula uma chamada à API/banco de dados
const fetchLoveStoryData = async (): Promise<LoveStoryData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "Felipe & Thalia",
        message: "É estranho como, mesmo nos dias comuns, meu coração faz festa só de pensar em você — como se o universo inteiro tivesse dado uma pausa só pra me lembrar da sorte que eu tenho por ter alguém como você: que me acalma sem dizer nada, que me entende sem que eu precise explicar, e que faz tudo ao meu redor ganhar cor, sentido e calor, como se amar você fosse, na verdade, a forma mais bonita de viver.",
        relationshipDate: "2025-02-08",
        photos: [
          "/img_temp/felipe.jpg",
          "/img_temp/felipe1.jpg",
          "/img_temp/felipe2.jpg",
          "/img_temp/felipe3.jpg",
          "/img_temp/felipe4.jpg",
          "/img_temp/felipe5.jpg",
          "/img_temp/felipe6.jpg",
        ],
      });
    }, 2000);
  });
};

export const LoveStoryPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<LoveStoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  // Busca os dados ao montar o componente
  useEffect(() => {
    fetchLoveStoryData().then((response) => {
      setData(response);
      setLoading(false);
    });
  }, []);

  // Após carregar os dados, verifica se o slug da URL corresponde ao slug gerado a partir do título
  useEffect(() => {
    if (data?.title && slug) {
      const generatedSlug = slugify(data.title);
      if (slug !== generatedSlug) {
        // Redireciona para a rota correta se necessário
        navigate(`/${generatedSlug}`, { replace: true });
      }
    }
  }, [data, slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 to-pink-950 p-8 flex items-center justify-center">
        <p className="text-white text-xl">{t('form.loading')}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-pink-950 p-8 text-white flex flex-col">
      {/* Cabeçalho */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
          {data.title || t('form.default_title')}
        </h1>
        <SparklesIcon className="mx-auto h-8 w-8 text-pink-400/50 mt-2 animate-pulse" />
      </header>

      {/* Seção do Timer */}
      <section className="mb-12 text-center">
        {data.relationshipDate ? (
          <RelationshipTimer startDate={data.relationshipDate} />
        ) : (
          <div className="text-purple-300/50 flex items-center justify-center space-x-2">
            <HeartIcon className="w-6 h-6" />
            <span>{t('form.select_date')}</span>
          </div>
        )}
      </section>

      {/* Seção da Foto de Capa */}
      <section className="mb-12 flex justify-center">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-600/20 transform hover:scale-105 transition-all duration-500">
          {data.photos[0] ? (
            <img
              src={data.photos[0]}
              alt="Capa"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-pink-400/30">
              <PhotoIcon className="w-20 h-20 animate-pulse" />
            </div>
          )}
        </div>
      </section>

      {/* Seção da Mensagem */}
      <section className="mb-12 mx-auto w-full max-w-3xl px-4">
        <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-xl p-6 border border-purple-500/30 min-h-[150px]">
          {data.message ? (
            <p className="text-purple-100 leading-relaxed whitespace-pre-wrap break-words font-serif text-justify">
              {data.message}
            </p>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-2">
                <span className="text-purple-400/50 block">✍️</span>
                <p className="text-purple-400/50 italic text-sm">
                  {t('form.default_message')}
                </p>
              </div>
            </div>
          )}
          <div className="absolute bottom-2 right-2 text-purple-400/30">
            <HeartIcon className="w-8 h-8" />
          </div>
        </div>
      </section>

      {/* Seção da Galeria de Fotos */}
      <section className="grid grid-cols-3 gap-4 mx-auto max-w-4xl">
        {data.photos.slice(1).map((url, index) => (
          <div 
            key={index+1}
            className="relative aspect-square rounded-lg overflow-hidden transform transition-all 
                      hover:scale-105 hover:z-10 hover:shadow-xl group"
          >
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:rotate-1 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-transparent to-transparent" />
          </div>
        ))}
        {[...Array(7 - data.photos.length)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square rounded-lg border-2 border-dashed border-purple-500/30 bg-purple-900/10 
                      flex items-center justify-center hover:bg-purple-500/10 transition-colors"
          >
            <div className="text-purple-400/30 animate-pulse">
              <PhotoIcon className="w-10 h-10" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};