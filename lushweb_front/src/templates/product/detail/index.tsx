'use client';

import React, { type ReactElement, useState } from 'react';
import { type ProductDetailProps } from '@/types/product/detail';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import 'react-toastify/dist/ReactToastify.css';
import { type ItemProps } from '@/types/order/item';
import { productState } from '@/lib/state/product-state';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';

export default function ProductDetailTemplate(props: ProductDetailProps): ReactElement {
	const [, setProducts] = useRecoilState(productState);
	const [selectedOption, setSelectedOption] = useState<number | undefined>();
	const [quantity, setQuantity] = useState<number>(1);

	const router = useRouter();

	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setSelectedOption(Number(event.target.value));
	};
	const handleIncreaseQuantity = (): void => {
		setQuantity(prevQuantity => prevQuantity + 1);
	};

	const handleDecreaseQuantity = (): void => {
		setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
	};

	const handleOrderPage = (): void => {
		if (props.options?.length > 0 && selectedOption === undefined) {
			toast.error('옵션을 선택해주세요');
			return;
		}

		const buyItem: ItemProps = {
			itemId: props.id,
			optionId: selectedOption ?? undefined,
			quantity,
		};
		setProducts([buyItem]);

		router.push(`/order/payment`);
	};

	return (
		<div className="product-detail-page p-8">
			<section className="product-banner">
				<div className="inner">
					<Image
						src={`https://dev.lush.co.kr/upload/item/${props.itemCode}/${props.itemImage}`}
						alt="제품배너이미지"
						className="w-full h-auto rounded shadow-lg"
						width={150}
						height={150}
						loading="eager"
						priority={true}
						quality={90}
						draggable="false"
					/>
				</div>
			</section>

			<section className="product-nametag p-4">
				<p className="body1 text-lg text-gray-600">{props.itemRange}</p>
				<h3 className="name-tag text-2xl font-bold text-gray-800">{props.itemName}</h3>
				<p className="body1 text-lg text-gray-600">{props.itemNameEn}</p>
			</section>

			<section className="product-scent p-4">
				<h2 className="text-2xl font-bold text-gray-800">이 향기는요</h2>
				<div dangerouslySetInnerHTML={{ __html: props.perfurmScent }} />
			</section>

			<section className="product-difference p-4">
				<h2 className="text-2xl font-bold text-gray-800">비슷하지만 달라요</h2>
				<div dangerouslySetInnerHTML={{ __html: props.differentContent }} />
			</section>

			<section className="product-detail p-4">
				<h2 className="text-2xl font-bold text-gray-800">제품 상세</h2>
				<div dangerouslySetInnerHTML={{ __html: props.detailContent }} />
			</section>

			<section className="product-box p-4">
				<h2 className="text-2xl font-bold text-gray-800">퍼퓸박스</h2>
				<div dangerouslySetInnerHTML={{ __html: props.perfumeBoxText }} />
			</section>

			<section className="product-manual p-4">
				<h2 className="text-2xl font-bold text-gray-800">사용방법</h2>
				<div dangerouslySetInnerHTML={{ __html: props.manualContent }} />
			</section>

			{props.options?.length > 0 && (
				<section className="product-options p-4">
					<h2 className="text-2xl font-bold text-gray-800">옵션 선택</h2>
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
				<h2 className="text-2xl font-bold text-gray-800">수량 선택</h2>
				<div className="flex items-center mt-4">
					<button onClick={handleDecreaseQuantity} className="border-2 border-gray-300 p-2 rounded-lg shadow-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
						-
					</button>
					<span className="mx-4">{quantity}</span>
					<button onClick={handleIncreaseQuantity} className="border-2 border-gray-300 p-2 rounded-lg shadow-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
						+
					</button>
				</div>
			</section>

			<button onClick={handleOrderPage} className={'mt-5 bg-green-500 text-white p-4 w-full rounded'}>
				주문 페이지 이동
			</button>
		</div>
	);
}
