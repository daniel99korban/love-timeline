import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX } from 'react-icons/fi';
import { LanguageDropdown } from '../components/LanguageDropdown';

export const Header = () => {

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {/* <img src="/assets/logo.png" alt="Logo" className="h-8 w-8" /> */}
                        <span className="font-bold text-xl">MDK Studio</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                            {t('nav.home')}
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                            {t('nav.about')}
                        </Link>
                        <Link to="/form" className="text-gray-700 hover:text-blue-600 transition-colors">
                            {t('nav.form')}
                        </Link>
                        <LanguageDropdown />
                    </nav>
                    <div className="md:hidden flex items-center space-x-2">
                        <LanguageDropdown />
                        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <nav className="md:hidden bg-white shadow-md">
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className="block text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                {t('nav.home')}
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className="block text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                {t('nav.about')}
                            </Link>
                            <Link
                                to="/form"
                                onClick={() => setIsOpen(false)}
                                className="block text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                {t('nav.form')}
                            </Link>
                            {/* <div className="pt-2">
                                <LanguageDropdown />
                            </div> */}
                        </div>
                    </nav>
                )}
            </header>
            <div className="h-16"></div>
        </>
    )
}
