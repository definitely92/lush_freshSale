import React, { type ReactElement } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }): ReactElement {
	return <section>{children}</section>;
}
