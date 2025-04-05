import { LanguageDropdown } from '../components/LanguageDropdown';

export const Header = () => {
  return (
    <header className='bg-gray-950 h-16'>
      <div className='h-full flex items-center justify-end px-4 w-full'>
        <LanguageDropdown />
      </div>
    </header>
  );
};