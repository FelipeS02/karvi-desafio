import { Heart } from 'lucide-react';

const FavouritesTitle = () => {
  return (
    <div className='w-full mb-4 border-b'>
      <div className='inline-flex gap-2 items-center py-4'>
        <Heart className='stroke-orange-500 fill-orange-500'/>
        <h1 className='text-xl font-semibold'>Tus autos favoritos</h1>
      </div>
    </div>
  );
};

export default FavouritesTitle;
