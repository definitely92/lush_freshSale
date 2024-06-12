import React from 'react';
import HeaderTemplate from '@/templates/layout/header';
import FooterTemplate from '@/templates/layout/footer';
import ProductListTemplate from '@/templates/product/list';

export default async function MainPage(): Promise<React.ReactElement> {
	return (
		<>
			<HeaderTemplate />
			<ProductListTemplate />
			<FooterTemplate />
		</>
	);
}
