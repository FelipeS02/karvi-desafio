import Link from 'next/link';

import KarviLogo from '../icons/karvi-logo';

const Header = () => {
  return (
    <>
      {/* Spacer */}
      <div className='h-24 w-full invisible' id='header-spacer' />
      <header className='w-full fixed top-0 shadow-md bg-background z-10'>
        <div className='max-w-section m-auto py-6 px-4 flex justify-between items-center'>
          <KarviLogo className='h-8 -ml-5' />
          <nav className='inline-flex gap-4 font-medium text-pink-600'>
            <Link href='/catalog'>Catalogo</Link>
            <Link href='/favourites'>Favoritos</Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
