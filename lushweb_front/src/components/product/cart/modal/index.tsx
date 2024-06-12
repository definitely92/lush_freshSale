import React, { type ReactElement, useState } from 'react';
import { type ProductOptionProps } from '@/types/product/detail';
import { cartState } from '../../../../lib/state/cart-state';
import { useRecoilState } from 'recoil';

interface ProductOptionsModalProps {
	productName: string;
	productId: number;
	quantity: number;
	options: ProductOptionProps[];
	isOpen: boolean;
	onClose: () => void;
}

export default function ProductCartModal(props: ProductOptionsModalProps): ReactElement {
	const [, setCart] = useRecoilState(cartState);
	const [quantity, setQuantity] = useState(1);
	const [selectedOption, setSelectedOption] = useState<number | undefined>();

	const handleIncreaseQuantity = (): void => {
		setQuantity(prevQuantity => prevQuantity + 1);
	};

	const handleDecreaseQuantity = (): void => {
		setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
	};

	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setSelectedOption(Number(event.target.value));
	};

	const handleAddToCart = (productId: number): void => {
		setCart(prevCart => {
			const existingItemIndex = prevCart.findIndex(item => item.itemId === productId && item.optionId === selectedOption);
			if (existingItemIndex !== -1) {
				return prevCart.map((item, index) => {
					if (index !== existingItemIndex) {
						return item;
					}

					return {
						...item,
						optionId: selectedOption,
						quantity: item.quantity + quantity,
					};
				});
			} else {
				return [
					...prevCart,
					{
						itemId: productId,
						optionId: selectedOption,
						quantity,
					},
				];
			}
		});

		alert('장바구니에 담겼습니다.');

		props.onClose();
	};

	return props.isOpen ? (
		<div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<h2 className="text-lg leading-6 font-medium text-gray-900">{props.productName}</h2>
					{props.options?.length > 0 && (
						<section className="product-options p-4">
							<h2 className="text-xl font-bold text-gray-800">옵션 선택</h2>
							<select
								value={selectedOption}
								onChange={handleOptionChange}
								className="border-2 border-gray-300 p-2 w-full mt-4 rounded-lg shadow-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
							>
								<option value={''}>옵션을 선택하세요</option>
								{props.options.map(option => (
									<option key={option.id} value={option.id} disabled={option.optionStockQuantity <= 0} className={option.optionStockQuantity <= 0 ? 'text-red-500' : ''}>
										{option.optionName1} {option.optionName2} {option.optionName3} {option.optionStockQuantity <= 0 ? '(품절)' : ''}
									</option>
								))}
							</select>
						</section>
					)}
					<section className="product-quantity p-4">
						<h2 className="text-xl font-bold text-gray-800">수량 선택</h2>
						<div className="flex items-center mt-4">
							<button
								onClick={handleDecreaseQuantity}
								className="border-2 border-gray-300 p-2 rounded-lg shadow-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
							>
								-
							</button>
							<span className="mx-4">{quantity}</span>
							<button
								onClick={handleIncreaseQuantity}
								className="border-2 border-gray-300 p-2 rounded-lg shadow-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
							>
								+
							</button>
						</div>
					</section>
					<button
						onClick={() => {
							handleAddToCart(props.productId);
						}}
						className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
					>
						장바구니에 추가
					</button>
					<button
						onClick={props.onClose}
						className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
					>
						닫기
					</button>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}
