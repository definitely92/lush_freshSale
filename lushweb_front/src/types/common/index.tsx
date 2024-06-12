export interface PageProps<T> {
	id: number;
	content: T[];
	first: boolean;
	last: boolean;
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
}
