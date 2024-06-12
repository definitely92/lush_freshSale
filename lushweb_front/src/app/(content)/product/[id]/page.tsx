import React, { type ReactElement } from 'react';
import ProductDetailTemplate from '@/templates/product/detail';
import { type Metadata } from 'next';
import { type ProductDetailProps } from '@/types/product/detail';
import { BASE_API_URL } from '@/lib/constants/config';

export const metadata: Metadata = {
	title: 'LUSH 프레시몰 상품정보',
	description: 'LUSH 프레시몰 상품정보',
};

interface ProductDetailPageProps {
	params: {
		id: number;
	};
}

async function fetchProduct(id: number): Promise<ProductDetailProps> {
	return await fetch(`${BASE_API_URL}/products/${id}`, {
		cache: 'no-cache',
	})
		.then(async res => {
			return await res.json();
		})
		.catch(err => {
			throw err;
		});
}

export default async function ProductDetailPage(props: ProductDetailPageProps): Promise<ReactElement> {
	const product = await fetchProduct(props.params.id);
	return (
		<>
			<ProductDetailTemplate {...product} />
		</>
	);
}
