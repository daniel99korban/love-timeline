import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { LanguageDropdown } from '../components/LanguageDropdown';


export const Form = () => {

  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [relationshipDate, setRelationshipDate] = useState<string>('');
  const [photos, setPhotos] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, message, relationshipDate, photos });
    alert(t('form_submitted'));
  };
    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      {/* <div className="absolute top-4 right-4">
        <LanguageDropdown />
      </div> */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{t('form.create_site')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.title')}
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('form.enter_title')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.message')}
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('form.enter_message')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={3}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="relationshipDate" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.relationship_start_date')}
            </label>
            <input
              id="relationshipDate"
              type="date"
              value={relationshipDate}
              onChange={(e) => setRelationshipDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="photos" className="block text-gray-700 text-sm font-bold mb-2">
              {t('form.upload_photos')}
            </label>
            <input
              id="photos"
              type="file"
              multiple
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {t('form.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
