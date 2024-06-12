'use client';

import React, { type ReactElement } from 'react';
import { jwtAccessState } from '@/lib/state/jwt-access-state';
import { jwtRefreshState } from '@/lib/state/jwt-refresh-state';
import { useRecoilState } from 'recoil';

export default function LoginFailTemplate(): ReactElement {
	const [, setAccessToken] = useRecoilState(jwtAccessState);
	const [, setRefreshToken] = useRecoilState(jwtRefreshState);

	setAccessToken('');
	setRefreshToken('');

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
				<h1 style={{ color: 'red', fontSize: '2em' }}>로그인이 필요합니다.</h1>
				<a href={'/'} style={{ marginTop: '2em', padding: '1em', border: '1px solid red', borderRadius: '5px', textDecoration: 'none', color: 'red' }}>
					홈으로 돌아가기
				</a>
			</div>
		</>
	);
}
