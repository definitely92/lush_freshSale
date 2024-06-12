'use client';

import React, { type ReactElement, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cartState } from '@/lib/state/cart-state';
import Link from 'next/link';
import { type ItemProps } from '@/types/order/item';
import LoginModal from '@/components/login';
import Image from 'next/image';

export default function HeaderTemplate(): ReactElement {
	const cart = useRecoilValue(cartState);
	const [cartItems, setCartItems] = useState<ItemProps[]>([]);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	useEffect((): void => {
		setCartItems(cart);
	}, [cart]);

	const handleAccountClick = (): void => {
		setIsLoginModalOpen(true);
	};

	return (
		<div className="sticky top-0 z-50 bg-white p-1 text-black border-b-2 border-gray-700">
			<div className="p-4 text-black flex justify-between items-center">
				<div className="flex flex-col">
					<div>LUSH</div>
				</div>
				<div className="flex space-x-4">
					<Link href={`/cart`}>
						<div className="relative">
							<Image src="/bag.svg" width={24} height={24} alt="First Icon" className="w-6 h-6" />
							{cartItems.length > 0 && (
								<div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartItems.length}</div>
							)}
						</div>
					</Link>
					<Image src="/account.svg" width={24} height={24} alt="Second Icon" className="w-6 h-6" onClick={handleAccountClick} />
				</div>
			</div>
			{isLoginModalOpen && <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />}
		</div>
	);
}
