'use client';
import React, { type ReactElement } from 'react';

interface Menu {
	name: string;
	active: boolean;
	url: string;
}
const TopMenu = ({ name, url, active }: Menu): ReactElement => {
	return (
		<>
			<a className={active ? 'active' : ''} href={url}>
				{name}
			</a>
			<style jsx>{`
				.top-nav {
					background-color: #000000;
					color: #ffffff;
					overflow: hidden;
					font-size: small;
				}

				.top-nav a {
					flex: 0 0 auto; /* 메뉴 아이템들이 자동으로 줄바꿈되지 않게 함 */
					padding: 10px;
					text-decoration: none;
					color: white;
				}

				.top-nav a:hover {
					background-color: #ddd;
					color: black;
				}

				.top-nav a.active {
					background-color: #249470;
					color: white;
				}

				.top-nav {
					scrollbar-width: none;
					-ms-overflow-style: none; /* IE and Edge */
					display: flex;
					overflow-x: auto;
					white-space: nowrap; /* 메뉴 아이템들이 줄바꿈되지 않게 함 */
				}

				/*!* 스크롤바 스타일 (옵션) *!*/
				/*.top-nav::-webkit-scrollbar {*/
				/*    height: 8px;*/
				/*}*/

				.top-nav::-webkit-scrollbar-thumb {
					background-color: #888;
					border-radius: 4px;
				}

				.top-nav::-webkit-scrollbar-thumb:hover {
					background-color: #555;
				}

				/* Chrome, Safari, Edge */
				.top-nav::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</>
	);
};

export default TopMenu;
