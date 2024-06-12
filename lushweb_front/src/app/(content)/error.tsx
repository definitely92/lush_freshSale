'use client'; // Error components must be Client Components

import { type ReactElement, useEffect } from 'react';

export default function ContentError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }): ReactElement {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>에러 페이지</h2>
			<button
				onClick={() => {
					reset();
				}}
			>
				Try again
			</button>
		</div>
	);
}
