'use client';

import React, { type ReactElement } from 'react';
import OrderSuccessTemplate from '@/templates/order/success';

interface OrderCompletePageProps {
	params: {
		code: string;
	};
}

export default function OrderSuccessPage(props: OrderCompletePageProps): ReactElement {
	return (
		<>
			<OrderSuccessTemplate code={props.params.code} />
		</>
	);
}
