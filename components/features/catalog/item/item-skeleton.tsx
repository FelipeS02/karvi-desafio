import { Skeleton } from '@/components/ui/skeleton';

const ItemSkeleton = () => {
  return (
    <div className='col-span-1 relative rounded-lg flex flex-col justify-between'>
      {/* Border */}
      <Skeleton
        className='size-full absolute inset-0 p-1'
        style={{
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
      />

     
        <div className='p-2 pb-0'>
          <Skeleton className='w-full aspect-[16/10] rounded-xl' />
        </div>

        <div className='px-4 py-3 flex-grow flex flex-col justify-between'>
          <div>
            <div className='inline-flex gap-2'>
              <Skeleton className='w-16 h-5 rounded-full' />
              <Skeleton className='w-24 h-5 rounded-full' />
            </div>
            <div>
              <Skeleton className='w-2/4 h-7' />
              <Skeleton className='w-2/3 h-6 mt-1' />
            </div>
          </div>

          <div>
            <div>
              <Skeleton className='w-3/4 h-10' />
              <Skeleton className='w-1/4 h-6 mt-1' />
            </div>
            <Skeleton className='h-10 rounded-full mt-2 mb-1' />
          </div>
        </div>
     
    </div>
  );
};

export default ItemSkeleton;
