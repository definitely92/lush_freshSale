import { Inter } from 'next/font/google';
import './globals.css';
import React, { type ReactElement } from 'react';
import Provider from './provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }): ReactElement {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
