import { LanguageDropdown } from '../components/LanguageDropdown';

export const Header = () => {
  return (
    <header className=" w-full bg-gray-950 border-t border-gray-800 text-gray-400 ">
      <div className="h-16 flex items-center justify-between px-6 max-w-screen-xl mx-auto">
        <h1 className="text-white font-bold text-lg tracking-wide hover:text-indigo-400 transition-colors">
          Love Timeline
        </h1>
        <LanguageDropdown />
      </div>
    </header>
  );
};
