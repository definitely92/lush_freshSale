'use client';

import React, { type ReactElement, useEffect, useState } from 'react';
import { type BuyItemProps, type BuyShippingProps } from '@/types/order';
import Image from 'next/image';
import { type ProductOrderProps } from '@/types/product/order';
import { BASE_API_URL } from '@/lib/constants/config';
import InicisPaymentButton from '@/components/inicis/payment-button';
import { productState } from '@/lib/state/product-state';
import { useRecoilState } from 'recoil';
import { fetchWithAuth } from '@/lib/utils/fetch';

interface OrderTotalProps {
	totalItemPrice: number;
	totalShippingPrice: number;
	totalOrderPrice: number;
}

async function fetchShipping(): Promise<BuyShippingProps> {
	return await fetchWithAuth(`${BASE_API_URL}/users/shipping-receiver`, {
		cache: 'no-cache',
		credentials: 'include',
		method: 'GET',
	})
		.then(async res => {
			return await res.json();
		})
		.catch(err => {
			throw err;
		});
}

async function fetchBuyItem(productId: number, optionId: number): Promise<BuyItemProps> {
	return await fetchWithAuth(`${BASE_API_URL}/products/${productId}/buy-item?optionId=${optionId}`, {
		cache: 'no-cache',
		credentials: 'include',
		method: 'GET',
	})
		.then(async res => {
			return await res.json();
		})
		.catch(err => {
			throw err;
		});
}

async function fetchProductOrder(buyItems?: BuyItemProps[], shipping?: BuyShippingProps, total?: OrderTotalProps): Promise<ProductOrderProps> {
	return await fetchWithAuth(`${BASE_API_URL}/products/batch/order`, {
		cache: 'no-cache',
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			buyItems,
			shipping,
			...total,
		}),
	})
		.then(async res => {
			return await res.json();
		})
		.catch(err => {
			throw err;
		});
}

export default function OrderPaymentTemplate(): ReactElement {
	const [products] = useRecoilState(productState);
	const [buyItems, setBuyItems] = useState<BuyItemProps[]>();
	const [buyShipping, setBuyShipping] = useState<BuyShippingProps>();
	const [total, setTotal] = useState<OrderTotalProps>({
		totalItemPrice: 0,
		totalShippingPrice: 0,
		totalOrderPrice: 0,
	});

	useEffect((): void => {
		const fetchBuyItems = async (): Promise<BuyItemProps[]> => {
			const promises = products.map(async item => {
				const itemProps = await fetchBuyItem(item.itemId, item.optionId ?? 0);
				itemProps.price = (itemProps.salePrice + (itemProps.choiceOption?.optionPrice ?? 0)) * item.quantity;
				itemProps.quantity = item.quantity;

				return itemProps;
			});
			return await Promise.all(promises);
		};
		fetchBuyItems()
			.then(res => {
				setBuyItems(res);
			})
			.catch(err => {
				console.error(err);
			});
		fetchShipping()
			.then(res => {
				setBuyShipping(res);
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		let totalItemPrice = 0;
		const totalShippingPrice = buyShipping?.shippingPrice ?? 0;

		buyItems?.forEach(item => {
			totalItemPrice = totalItemPrice + item.price;
		});

		setTotal({
			totalItemPrice,
			totalShippingPrice,
			totalOrderPrice: totalItemPrice + totalShippingPrice,
		});
	}, [buyItems, buyShipping]);

	const handlePayment = async (): Promise<ProductOrderProps> => {
		return await fetchProductOrder(buyItems, buyShipping, total);
	};

	if (products == null) {
		return <div>상품 정보가 없습니다.</div>;
	}

	return (
		<div className="order-payment-page p-8">
			<div className="space-y-8">
				<section className="product-summary">
					<h2 className="text-2xl font-bold">제품 정보</h2>
					{buyItems?.map((item, index) => (
						<div key={index} className="flex justify-between items-center p-4 border border-gray-300 rounded shadow-lg">
							<div className="flex-1">
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
							<div>
								<span className="text-lg text-gray-600">금액: {item.price.toLocaleString()}원</span>
								<span className="text-lg text-gray-600 block">수량: {item.quantity}</span>
								{item.choiceOption?.id !== null && (
									<span className="text-lg text-gray-600 block">
										옵션: {item.choiceOption?.optionName1} / {item.choiceOption?.optionName2} / {item.choiceOption?.optionName3}
									</span>
								)}
							</div>
						</div>
					))}
				</section>

				<section className="customer-info">
					<h2 className="text-2xl font-bold">주문자 정보</h2>
					<input type="text" name="name" placeholder="이름" required defaultValue={buyShipping?.name} className="border border-gray-300 p-2 w-full" />
					<input type="text" name="phone" placeholder="연락처" required defaultValue={buyShipping?.mobile} className="border border-gray-300 p-2 w-full mt-4" />
					<input type="email" name="email" placeholder="이메일" required defaultValue={buyShipping?.email} className="border border-gray-300 p-2 w-full mt-4" />
				</section>

				<section className="shipping-info">
					<h2 className="text-2xl font-bold">배송 정보</h2>
					<input name="receiverName" placeholder="이름" required defaultValue={buyShipping?.receiverName} className="border border-gray-300 p-2 w-full mt-4"></input>
					<input name="receiverPhone" placeholder="전화번호" required defaultValue={buyShipping?.receiverPhone} className="border border-gray-300 p-2 w-full mt-4"></input>
					<input name="address" placeholder="주소" required defaultValue={buyShipping?.receiverAddress} className="border border-gray-300 p-2 w-full mt-4"></input>

					<select name="shippingMessage" required className="border border-gray-300 p-2 w-full mt-4">
						<option value="">배송 메세지 선택</option>
						<option value="1">문앞에 놓아주세요</option>
						<option value="2">도착전에 연락주세요</option>
					</select>
				</section>

				<section className="payment-method">
					<h2 className="text-2xl font-bold">결제 수단</h2>
					<select
						name="paymentMethod"
						required
						defaultValue={''}
						className="border border-gray-300 p-2 w-full mt-4"
						onChange={e => {
							// setPaymentMethod(e.target.value);
						}}
					>
						<option value="">결제 방법 선택</option>
						<option value="CARD">신용카드</option>
						<option value="LUSHPAY">러쉬페이</option>
					</select>
				</section>

				<section className="payment-info">
					<h2 className="text-2xl font-bold">결제 정보</h2>
					<div className="flex justify-between">
						<span>합계</span>
						<span>{total?.totalItemPrice.toLocaleString()}</span>
					</div>
					<div className="flex justify-between">
						<span>배송비</span>
						<span>{total?.totalShippingPrice.toLocaleString()}</span>
					</div>
					<div className="flex justify-between">
						<span>최종 결제 금액</span>
						<span>{total?.totalOrderPrice.toLocaleString()}</span>
					</div>
				</section>

				<InicisPaymentButton handlePayment={handlePayment} className={'bg-blue-500 text-white p-4 w-full rounded'} label={'이니시스 결제'} type={'CARD'} />
			</div>
		</div>
	);
}
