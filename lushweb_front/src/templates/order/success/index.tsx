'use client';

import React, { type ReactElement } from 'react';

interface OrderCompleteTemplateProps {
	code: string;
}

export default function OrderSuccessTemplate(props: OrderCompleteTemplateProps): ReactElement {
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
				<h1 style={{ color: 'blue', fontSize: '2em' }}>주문 성공 [{props.code}]</h1>
				<p style={{ marginTop: '1em' }}>{'주문이 성공했습니다.'}</p>
				<a href={'/'} style={{ marginTop: '2em', padding: '1em', border: '1px solid blue', borderRadius: '5px', textDecoration: 'none', color: 'blue' }}>
					홈으로 돌아가기
				</a>
			</div>
		</>
	);
}
