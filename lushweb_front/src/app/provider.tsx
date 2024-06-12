'use client';

import { type ReactElement, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

export default function Provider({ children }: { children: React.ReactNode }): ReactElement {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<RecoilRoot>
			{isClient && <ToastContainer />}
			{children}
		</RecoilRoot>
	);
}
