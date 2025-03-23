import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageDropdown } from '../components/LanguageDropdown';

export const Home = () => {

  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      {/* Language Dropdown in the top-right corner */}
      <div className="absolute top-4 right-4">
        <LanguageDropdown />
      </div>

      <h1 className="text-4xl font-bold mb-4">{t('welcome')}</h1>
      <p className="text-lg mb-8">{t('create_site')}</p>
      <Link
        to="/form"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        {t('submit')}
      </Link>
    </div>
  )
}
