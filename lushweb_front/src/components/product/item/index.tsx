import React, { type ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartButton from '@/components/product/cart/button';
import { type ProductOptionProps } from '@/types/product/detail';

export interface ProductProps {
	id: number;
	itemRange: string;
	sellerId: number;
	ownItemCode: string;
	itemCode: string;
	itemUserCode: string;
	itemName: string;
	itemImage: string;
	itemSummary: string;
	itemDataType: string;
	itemType: string;
	itemNewFlag: string;
	itemLabel: string;
	itemType1: string;
	itemType2: string;
	itemType3: string;
	itemType4: string;
	itemType5: string;
	itemType6: string;
	itemType7: string;
	itemType8: string;
	itemType9: string;
	itemType10: string;
	manufacturer: string;
	brandId: number;
	brand: string;
	color: string;
	weight: string;
	itemPrice: string;
	costPrice: number;
	supplyPrice: number;
	salePrice: number;
	options: ProductOptionProps[];
}

export default function Product(props: ProductProps): ReactElement {
	const imageUrl = `https://dev.lush.co.kr/upload/item/${props.itemCode}/${props.itemImage}`;
	return (
		<div key={props.id} className="p-4 bg-white rounded-lg shadow-lg">
			<Link href={`/product/${props.id}`}>
				<Image
					src={imageUrl}
					loading="eager"
					priority={true}
					quality={90}
					alt={props.itemName}
					className="w-full h-64 rounded-t-lg object-cover"
					draggable="false"
					sizes="100vw"
					width={150}
					height={150}
				/>
				<h2 className="mt-4 text-lg font-semibold text-gray-900">{props.itemName}</h2>
				<p className="mt-2 text-gray-600">{props.salePrice.toLocaleString()}</p>
			</Link>
			<CartButton className={''} id={props.id} options={props.options} name={props.itemName} />
		</div>
	);
}
