import { atom } from 'recoil';
import { type PersistStorage, recoilPersist } from 'recoil-persist';
import Cookies from 'js-cookie';

const cookiesStorage: PersistStorage = {
	setItem(key: string, value: string): void | Promise<void> {
		const userStateValue = JSON.parse(value).jwtAccess;
		Cookies.set(key, userStateValue);
	},
	getItem(key: string): null | string | Promise<null | string> {
		const cookieValue = Cookies.get(key) ?? null;
		return cookieValue != null ? JSON.stringify({ jwtAccess: cookieValue }) : null;
	},
};

const { persistAtom } = recoilPersist({
	key: 'lush_access_jwt',
	storage: cookiesStorage,
});

export const jwtAccessState = atom<string>({
	key: 'jwtAccess',
	default: '',
	effects_UNSTABLE: [persistAtom],
});
