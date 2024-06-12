import React from 'react';
import { type ProductFilterSortProps } from '@/types/product/filter-sort';

export default function ProductFilterSort(props: ProductFilterSortProps): React.ReactElement {
	return (
		<div className="mt-1 p-4 border-2">
			<div className="flex justify-between">
				<div>총 {props.count}개 상품</div>
				<div>정렬</div>
			</div>
		</div>
	);
}
