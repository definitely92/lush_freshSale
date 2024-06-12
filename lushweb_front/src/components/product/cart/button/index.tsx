'use client';

import React, { type ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../../../lib/state/cart-state';
import ProductCartModal from '../modal';
import { type ProductOptionProps } from '@/types/product/detail';

interface CartButtonProps {
	className: string;
	id: number;
	options?: ProductOptionProps[];
	name: string;
}

export default function CartButton(props: CartButtonProps): ReactElement {
	const [isModalOpen, setModalOpen] = useState(false);
	const [, setCart] = useRecoilState(cartState);

	const handleAddToCart = (productId: number): void => {
		setCart(prevCart => {
			const existingItemIndex = prevCart.findIndex(item => item.itemId === productId && item.optionId === undefined);
			if (existingItemIndex !== -1) {
				return prevCart.map((item, index) => {
					if (index !== existingItemIndex) {
						return item;
					}

					return {
						...item,
						quantity: item.quantity + 1,
					};
				});
			} else {
				return [
					...prevCart,
					{
						itemId: productId,
						quantity: 1,
					},
				];
			}
		});

		alert('장바구니에 담겼습니다.');
	};

	const handleOpenModal = (): void => {
		if (props.options == null || props.options.length === 0) {
			handleAddToCart(props.id);
			return;
		}

		setModalOpen(true);
	};

	const handleCloseModal = (): void => {
		setModalOpen(false);
	};

	return (
		<>
			<button onClick={handleOpenModal} className={props.className}>
				<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M4.72526 17.4625L5.465 6.99088H6.99365V9.51001C6.99365 9.84984 7.26712 10.1265 7.60452 10.1265C7.94193 10.1265 8.21539 9.84984 8.21539 9.51001V6.99088H12.8004V9.51001C12.8004 9.84984 13.0748 10.1265 13.4122 10.1265C13.7496 10.1265 14.0231 9.84984 14.0231 9.51001V6.99088H15.5311L16.2698 17.4625H4.72526ZM8.15243 4.51522C8.15243 3.24775 9.16858 2.21639 10.4159 2.21639C11.6632 2.21639 12.6784 3.24775 12.6784 4.51522V5.77281H8.15243V4.51522ZM16.6584 6.2519L16.6092 6.25586L16.6584 6.24697C16.6249 5.91701 16.3613 5.66905 16.0446 5.66905H13.9473V4.39467C13.9473 2.43074 12.3626 0.833313 10.4129 0.833313C8.46425 0.833313 6.87854 2.43074 6.87854 4.39467V5.66905H4.7823C4.46654 5.66905 4.19701 5.92491 4.16848 6.2519L3.33333 18.0424C3.33333 18.1995 3.38251 18.3496 3.47596 18.4761C3.57138 18.6045 3.74845 18.6816 3.94715 18.6816H16.8787C17.0568 18.6816 17.2083 18.6203 17.3302 18.4978C17.4581 18.3694 17.523 18.1787 17.4925 18.0276L16.6584 6.2519Z"
						fill="#222222"
					/>
				</svg>
			</button>
			<ProductCartModal isOpen={isModalOpen} onClose={handleCloseModal} productId={props.id} options={props.options ?? []} quantity={1} productName={props.name} />
		</>
	);
}
