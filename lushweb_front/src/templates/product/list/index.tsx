'use client';

import React, { type ReactElement, useEffect, useState } from 'react';
import Product, { type ProductProps } from '@/components/product/item';
import { type PageProps } from '@/types/common';
import ProductFilterSort from '@/components/product/filter-sort';
import PullToRefresh from 'react-simple-pull-to-refresh';

import { type CategoryProps } from '@/types/product/category';
import { BASE_API_URL } from '@/lib/constants/config';
import Loading from '@/components/loading/loading';

async function fetchProducts(value: number, page: number): Promise<PageProps<ProductProps>> {
	return await fetch(`${BASE_API_URL}/products/categories/${value}?page=${page}`, {
		cache: 'no-cache',
	})
		.then(async res => await res.json())
		.catch(err => {
			throw err;
		});
}

async function fetchCategories(): Promise<CategoryProps[]> {
	return await fetch(`${BASE_API_URL}/categories`, {
		cache: 'no-cache',
	})
		.then(async res => await res.json())
		.catch(err => {
			throw err;
		});
}

export default function ProductListTemplate(): ReactElement {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [products, setProducts] = useState<PageProps<ProductProps>>({
		id: 0,
		content: [],
		first: false,
		last: false,
		totalPages: 0,
		totalElements: 0,
		size: 0,
		number: 0,
	});
	const [categories, setCategories] = useState<CategoryProps[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<number>(113 ?? undefined);

	useEffect(() => {
		fetchCategories()
			.then(categories => {
				setCategories(categories);
				setSelectedCategory(113 ?? undefined);
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		if (selectedCategory === undefined) {
			return;
		}

		setIsLoading(true);
		fetchProducts(selectedCategory, page)
			.then(newProducts => {
				if (page === 1) {
					setProducts(newProducts);
				} else {
					setProducts(prevProducts => ({
						...newProducts,
						content: [...(prevProducts?.content ?? []), ...newProducts.content],
					}));
				}

				setIsLoading(false);
			})
			.catch(err => {
				console.error(err);
			});
	}, [page, selectedCategory]);

	const handleRefresh = async (): Promise<void> => {
		setPage(1);
	};

	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setPage(1);
		setSelectedCategory(Number(event.target.value));
	};

	const handleNextPage = (): void => {
		setPage(prevPage => prevPage + 1);
	};

	return (
		<>
			<div className={'sticky top-0 z-50 bg-white p-1 text-black border-gray-700'}>
				<select className="p-4 border-2" defaultValue={selectedCategory} onChange={handleCategoryChange}>
					{categories.map(category => (
						<option key={category.id} value={category.id}>
							{category.categoryName}
						</option>
					))}
				</select>
				<ProductFilterSort count={products?.totalElements ?? 0} />
			</div>
			{isLoading ? (
				<Loading />
			) : (
				<PullToRefresh onRefresh={handleRefresh} pullingContent={'당겨주세요'}>
					<div>
						<div className="grid grid-cols-2 gap-1">
							{(products?.content).map(product => (
								<Product key={product.id} {...product} />
							))}
						</div>
						{products?.content.length === 0 && (
							<div className="flex justify-center items-center h-screen">
								<h1 className="text-2xl">상품이 존재하지 없습니다.</h1>
							</div>
						)}
						<button
							onClick={handleNextPage}
							className="bg-black mt-5 py-3 px-4 rounded text-white font-bold transition-all duration-200 transform hover:scale-105 hover:bg-green-800 shadow-lg w-4/5 mx-auto block"
						>
							더보기
						</button>
					</div>
				</PullToRefresh>
			)}
		</>
	);
}
