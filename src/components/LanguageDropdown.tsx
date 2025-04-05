import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  label: string;
  flagSrc: string;
}

const languages: Language[] = [
  { code: 'en', label: 'English', flagSrc: '/flags/us.png' },
  { code: 'pt', label: 'Português', flagSrc: '/flags/br.png' },
  { code: 'es', label: 'Español', flagSrc: '/flags/es.png' }
];

export const LanguageDropdown = () => {

  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang.code);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Find the current language based on i18n
  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-900 p-2 rounded text-white"
      >
        <img
          src={currentLang.flagSrc}
          alt={currentLang.label}
          className="w-6 h-6"
        />
        <span className="text-sm">{currentLang.label}</span>
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-40 bg-gray-900 shadow-lg rounded text-white">
          {languages.map(lang => (
            <li key={lang.code}>
              <button
                onClick={() => handleLanguageChange(lang)}
                className="w-full text-left px-4 py-2 hover:bg-gray-600 flex items-center space-x-2"
              >
                <img
                  src={lang.flagSrc}
                  alt={lang.label}
                  className="w-6 h-6"
                />
                <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
