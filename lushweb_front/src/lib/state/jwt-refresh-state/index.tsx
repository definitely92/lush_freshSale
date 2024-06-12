import { atom } from 'recoil';
import { type PersistStorage, recoilPersist } from 'recoil-persist';
import Cookies from 'js-cookie';

const cookiesStorage: PersistStorage = {
	setItem(key: string, value: string): void | Promise<void> {
		const userStateValue = JSON.parse(value).jwtRefresh;
		Cookies.set(key, userStateValue);
	},
	getItem(key: string): null | string | Promise<null | string> {
		const cookieValue = Cookies.get(key) ?? null;
		return cookieValue != null ? JSON.stringify({ jwtRefresh: cookieValue }) : null;
	},
};

const { persistAtom } = recoilPersist({
	key: 'lush_refresh_jwt',
	storage: cookiesStorage,
});

export const jwtRefreshState = atom<string>({
	key: 'jwtRefresh',
	default: '',
	effects_UNSTABLE: [persistAtom],
});
