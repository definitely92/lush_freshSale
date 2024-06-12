'use client';

import React, { type ReactElement, useEffect, useState } from 'react';
import { type BuyItemProps } from '@/types/order';
import Image from 'next/image';
import { BASE_API_URL } from '@/lib/constants/config';
import { cartState } from '@/lib/state/cart-state';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { productState } from '@/lib/state/product-state';
import Loading from '@/components/loading/loading';

async function fetchCartItem(productId: number, optionId: number): Promise<BuyItemProps> {
	return await fetch(`${BASE_API_URL}/products/${productId}/buy-item?optionId=${optionId}`, {
		cache: 'no-cache',
		method: 'GET',
		credentials: 'include',
	})
		.then(async res => {
			return await res.json();
		})
		.catch(err => {
			throw err;
		});
}

export default function CartTemplate(): ReactElement {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [, setProducts] = useRecoilState(productState);
	const [cart, setCart] = useRecoilState(cartState);
	const [cartItems, setCartItems] = useState<BuyItemProps[]>();
	const router = useRouter();

	useEffect((): void => {
		const fetchCartItems = async (): Promise<BuyItemProps[]> => {
			const promises = cart.map(async item => {
				const itemProps = await fetchCartItem(item.itemId, item.optionId ?? 0);
				itemProps.price = (itemProps.salePrice + (itemProps.choiceOption?.optionPrice ?? 0)) * item.quantity;
				itemProps.quantity = item.quantity;

				return itemProps;
			});
			return await Promise.all(promises);
		};
		fetchCartItems()
			.then(res => {
				setCartItems(res);
				setIsLoading(false);
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		if (cartItems != null) {
			setCart(prevCart => {
				return prevCart
					.map(cartItem => {
						const matchingCartItem = cartItems.find(item => item.itemId === cartItem.itemId && item.choiceOption?.id === cartItem.optionId);
						if (matchingCartItem != null) {
							return {
								...cartItem,
								quantity: matchingCartItem.quantity,
							};
						} else {
							return cartItem;
						}
					})
					.filter(cartItem => {
						return cartItems.some(item => item.itemId === cartItem.itemId && item.choiceOption?.id === cartItem.optionId);
					});
			});
		}
	}, [cartItems]);

	const handleOrderPage = (): void => {
		setProducts(cart);

		router.push(`/order/payment`);
	};

	const handleQuantityChange = (productId: number, optionId: number | undefined, quantity: number): void => {
		if (quantity < 1) {
			return;
		}

		setCartItems(prevCartItems => {
			return prevCartItems?.map(item => {
				if (item.itemId === productId && item.choiceOption?.id === optionId) {
					return {
						...item,
						price: (item.salePrice + (item.choiceOption?.optionPrice ?? 0)) * quantity,
						quantity,
					};
				} else {
					return item;
				}
			});
		});
	};

	const handleRemoveFromCart = (productId: number, optionId: number | undefined): void => {
		setCartItems(prevCartItems => {
			return prevCartItems?.filter(item => item.itemId !== productId || item.choiceOption?.id !== optionId);
		});
	};

	return (
		<div className="order-payment-page p-8">
			<div className="space-y-8">
				<section className="product-summary">
					{isLoading ? <Loading /> : null}
					<h2 className="text-2xl font-bold">제품 정보</h2>
					{cartItems?.map((item, index) => (
						<div key={index} className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-300 rounded shadow-lg">
							<div className="flex-1 mb-4 md:mb-0">
								<span className="text-lg font-bold text-gray-800">{item.itemName}</span>
								<Image
									src={`https://dev.lush.co.kr/upload/item/${item.itemCode}/${item.itemImage}`}
									loading="eager"
									priority={true}
									quality={90}
									alt={item.itemName}
									className="h-auto rounded shadow-lg"
									draggable="false"
									sizes="100vw"
									width={150}
									height={150}
								/>
							</div>
							<div className="mb-4 md:mb-0">
								<span className="text-lg text-gray-600">금액: {item.price.toLocaleString()}원</span>
								{item.choiceOption?.id !== null && (
									<span className="text-lg text-gray-600 block">
										옵션: {item.choiceOption?.optionName1} / {item.choiceOption?.optionName2} / {item.choiceOption?.optionName3}
									</span>
								)}
							</div>
							<div className="flex items-center mb-4 md:mb-0">
								<button
									onClick={() => {
										handleQuantityChange(item.itemId, item.choiceOption?.id, item.quantity - 1);
									}}
									className="border-2 border-gray-300 p-2 rounded-lg shadow-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
								>
									-
								</button>
								<span className="mx-4">{item.quantity}</span>
								<button
									onClick={() => {
										handleQuantityChange(item.itemId, item.choiceOption?.id, item.quantity + 1);
									}}
									className="border-2 border-gray-300 p-2 rounded-lg shadow-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
								>
									+
								</button>
							</div>
							<button
								onClick={() => {
									handleRemoveFromCart(item.itemId, item.choiceOption?.id);
								}}
								className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
							>
								장바구니에서 삭제
							</button>
						</div>
					))}
				</section>
				<button onClick={handleOrderPage} className={'mt-5 bg-green-500 text-white p-4 w-full rounded'}>
					주문 페이지 이동
				</button>
			</div>
		</div>
	);
}
