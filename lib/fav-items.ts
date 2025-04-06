import { Item } from '@/models/api';

function handleError(e: unknown) {
  const error = e as Error;

  if (error?.message) {
    console.log(error.message);
  } else {
    console.log(error);
  }
  return [] as Item[];
}

export function getFavItems(): Item[] {
  try {
    if (typeof window === 'undefined') return [];

    const storageFavs = localStorage.getItem('fav-items');

    const allFavs: Item[] = storageFavs ? JSON.parse(storageFavs) : [];

    return allFavs;
  } catch (e) {
    return handleError(e);
  }
}

export function getItemSelection(item: Item, favList: Item[]) {
  if (!item || favList?.length === 0)
    return {
      isSelected: false,
      index: -1,
    };

  const valueIndex = favList.findIndex((favItem) => favItem.id === item.id);

  return {
    isSelected: valueIndex !== -1,
    index: valueIndex,
  };
}

export function alternateFavItem(item: Item) {
  try {
    // Return if item not exists or function is called in server
    if (!item || !window) return;

    const allFavs = getFavItems();

    const { index, isSelected } = getItemSelection(item, allFavs);

    if (isSelected) {
      // Remove value if present
      allFavs.splice(index, 1);
    } else {
      allFavs.push(item);
    }

    localStorage.setItem('fav-items', JSON.stringify(allFavs));
  } catch (e) {
    return handleError(e);
  }
}
