import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import type { ItemProps } from '@/types/order/item';

const ls = typeof window !== `undefined` ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
	key: 'product',
	storage: ls,
});

export const productState = atom<ItemProps[]>({
	key: 'productState',
	default: [],
	effects_UNSTABLE: [persistAtom],
});
