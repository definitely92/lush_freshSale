'use client';

import React, { type ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import OrderError from '@/app/(content)/error';

export default function OrderLayout({ children }: { children: React.ReactElement }): ReactElement {
	const router = useRouter();

	return (
		<ErrorBoundary errorComponent={OrderError}>
			<section>
				<div className="justify-center">
					<div className="bg-emerald-500 text-white p-4 flex justify-between items-center fixed w-full top-0 z-10">
						<button
							className="mb-4 bg-white text-emerald-500 p-2 rounded"
							onClick={() => {
								router.back();
							}}
						>
							←
						</button>
						<div className="text-center text-2xl font-bold flex-grow">주문 결제</div>
						<div></div>
					</div>
					<div className="pt-10 mt-10">{children}</div>
				</div>
			</section>
		</ErrorBoundary>
	);
}
