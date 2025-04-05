import { LanguageDropdown } from '../components/LanguageDropdown';

export const Header = () => {
  return (
    <header className="fixed top-4 right-4 z-50">
      <div>
        <LanguageDropdown />
      </div>
    </header>
  );
};