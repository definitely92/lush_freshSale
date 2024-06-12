'use client';

import { BASE_API_URL, BASE_URL } from '@/lib/constants/config';
import Cookies from 'js-cookie';

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
	const accessToken = Cookies.get('lush_access_jwt') ?? '';
	const refreshToken = Cookies.get('lush_refresh_jwt') ?? '';

	if (accessToken === '' || refreshToken === '') {
		location.href = `${BASE_URL}/login/fail`;
	}

	const authOptions = {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${accessToken}`,
		},
	};

	let response = await fetch(url, authOptions);

	// 401 오류가 발생했을 때 토큰 재갱신 API를 호출
	if (response.status === 401) {
		const refreshResponse = await fetch(`${BASE_API_URL}/users/login/re-issue`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refreshToken }),
		});

		if (!refreshResponse.ok) {
			location.href = `${BASE_URL}/login/fail`;
		}

		const data = await refreshResponse.json();
		Cookies.set('lush_access_jwt', data.accessToken);
		Cookies.set('lush_access_jwt', data.refreshToken);

		// 새로운 토큰으로 Authorization 헤더를 업데이트
		authOptions.headers.Authorization = `Bearer ${data.accessToken}`;

		// 원래의 API 호출을 다시 시도
		response = await fetch(url, authOptions);
	}

	return response;
}
