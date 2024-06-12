import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import type { ItemProps } from '@/types/order/item';

const ls = typeof window !== `undefined` ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
	key: 'cart',
	storage: ls,
});

export const cartState = atom<ItemProps[]>({
	key: 'cartState',
	default: [],
	effects_UNSTABLE: [persistAtom],
});
