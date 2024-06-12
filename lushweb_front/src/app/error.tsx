'use client';

import { type ReactElement, useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }): ReactElement {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>알수없는 오류가 발생했습니다.</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => {
						location.href = '/';
					}
				}
			></button>
		</div>
	);
}
