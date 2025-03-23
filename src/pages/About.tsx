import { useTranslation } from 'react-i18next';
import { LanguageDropdown } from '../components/LanguageDropdown';
import { Link } from 'react-router-dom';

export const About = () => {

    const { t } = useTranslation();
  
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
            {/* Dropdown de idioma no canto superior direito */}
            <div className="absolute top-4 right-4">
                <LanguageDropdown />
            </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">{t('about.title')}</h2>
                <p className="text-gray-700 text-base mb-6">
                {t('about.content')}
                </p>
                <div className="flex justify-center">
                <Link
                    to="/"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                    {t('about.back')}
                </Link>
                </div>
            </div>
        </div>
    )
}
