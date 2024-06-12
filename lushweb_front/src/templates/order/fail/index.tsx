'use client';

import React, { type ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';

export default function OrderFailTemplate(): ReactElement {
	const serchParams = useSearchParams();
	const message = serchParams.get('message') ?? '';

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
				<h1 style={{ color: 'red', fontSize: '2em' }}>주문 실패</h1>
				<p style={{ marginTop: '1em' }}>{message}</p>
				<a href={'/'} style={{ marginTop: '2em', padding: '1em', border: '1px solid red', borderRadius: '5px', textDecoration: 'none', color: 'red' }}>
					홈으로 돌아가기
				</a>
			</div>
		</>
	);
}
