'use client';

import React, { type ReactElement, useEffect, useRef, useState } from 'react';
import { BASE_URL } from '@/lib/constants/config';
import { type ProductOrderProps } from '@/types/product/order';

interface InicisPaymentProps {
	className: string;
	label: string;
	type: string;
	handlePayment: () => Promise<ProductOrderProps>;
}

export default function InicisPaymentButton(props: InicisPaymentProps): ReactElement {
	const [inicisProps, setInicisProps] = useState<ProductOrderProps>();
	const formRef = useRef<HTMLFormElement>(null);

	const returnUrl = `${BASE_URL}/api/external/inicis-callback`;

	useEffect(() => {
		if (inicisProps != null) {
			formRef.current?.submit();
		}
	}, [inicisProps]);

	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();

		void props.handlePayment().then((res: ProductOrderProps) => {
			setInicisProps(res);
		});
	};

	return (
		<>
			<form ref={formRef} onSubmit={handleSubmit} acceptCharset="euc-kr" name="inicisForm" action="https://mobile.inicis.com/smart/payment/" target="_self" method="post">
				<input type="hidden" name="P_INI_PAYMENT" defaultValue={props.type} />
				<input type="hidden" name="P_MID" defaultValue={inicisProps?.mid} />
				<input type="hidden" name="P_OID" defaultValue={inicisProps?.oid} />
				<input type="hidden" name="P_AMT" defaultValue={inicisProps?.amount} />
				<input type="hidden" name="P_GOODS" defaultValue={inicisProps?.goods} />
				<input type="hidden" name="P_UNAME" defaultValue={inicisProps?.buyerName} />
				<input type="hidden" name="P_MOBILE" defaultValue={inicisProps?.buyerTel} />
				<input type="hidden" name="P_EMAIL" defaultValue={inicisProps?.buyerEmail} />
				<input type="hidden" name="P_NEXT_URL" defaultValue={returnUrl} />
				<input type="hidden" name="P_CHARSET" defaultValue="utf8" />
				<input type="hidden" name="P_RESERVED" defaultValue="below1000=Y&vbank_receipt=Y&centerCd=Y" />
				<input type="hidden" name="P_NOTI" defaultValue={inicisProps?.verifyToken} />

				<button className={props.className} type="submit">
					{props.label}
				</button>
			</form>
		</>
	);
}
