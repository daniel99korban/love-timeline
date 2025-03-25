import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { LanguageDropdown } from '../components/LanguageDropdown';

export const Home = () => {

  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      {/* <div className="absolute top-4 right-4">
        <LanguageDropdown />
      </div> */}
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          {t('home.welcome')}
        </h1>
        <p className="text-base sm:text-lg mb-8">
          {t('home.create_site')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/form"
            className="w-full sm:w-auto px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            {t('home.submit')}
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
          >
            {t('about.title')}
          </Link>
        </div>
      </div>
    </div>
  )
}
