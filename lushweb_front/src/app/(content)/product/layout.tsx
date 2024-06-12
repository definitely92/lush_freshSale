'use client';

import React, { type ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ProductLayout({ children }: { children: React.ReactElement }): ReactElement {
	const router = useRouter();

	return (
		<motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
			<section>
				<div className="justify-center">
					<div className="bg-cyan-500 text-white p-4 flex justify-between items-center fixed w-full top-0 z-10">
						<button
							className="mb-4 bg-white text-emerald-500 p-2 rounded"
							onClick={() => {
								router.back();
							}}
						>
							←
						</button>
						<div className="text-center text-2xl font-bold flex-grow">상품 상세</div>
						<div></div>
					</div>
					<div className="pt-10 mt-10">{children}</div>
				</div>
			</section>
		</motion.section>
	);
}
