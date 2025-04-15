import { LanguageDropdown } from '../components/LanguageDropdown';

export const Header = () => {
  return (
    <header className=" w-full bg-gray-950 border-t border-gray-800 text-gray-400 ">
      <div className="h-16 flex items-center justify-between px-6 max-w-screen-xl mx-auto">
        <img
          src="../../../public/logos/logobranco.png"
          alt="Love Timeline"
          className="h-8 object-contain"
        />
        <LanguageDropdown />
      </div>
    </header>
  );
};
