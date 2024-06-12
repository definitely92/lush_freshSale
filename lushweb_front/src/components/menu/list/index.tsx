import React, { type ReactElement } from 'react';
import TopMenu from '../item';

const TopMenuList = (): ReactElement => {
	const menus = [
		{
			name: '전체(75)',
			url: 'https://via.placeholder.com/150',
			active: true,
		},
		{
			name: '배쓰 밤(10)',
			url: 'https://via.placeholder.com/150',
			active: false,
		},
		{
			name: '버블바(10)',
			url: 'https://via.placeholder.com/150',
			active: false,
		},
		{
			name: '보디 컨디셔너(10)',
			url: 'https://via.placeholder.com/150',
			active: false,
		},
		{
			name: '러쉬 퍼퓸(10)',
			url: 'https://via.placeholder.com/150',
			active: false,
		},
		{
			name: '페이스 마스크(10)',
			url: 'https://via.placeholder.com/150',
			active: false,
		},
		{
			name: '풋 마스크(10)',
			url: 'https://via.placeholder.com/150',
			active: false,
		},
		{
			name: '헤어 트리트먼트(10)',
			url: 'https://via.placeholder.com/150',
			active: false,
		},
	];

	return (
		<nav className="top-nav">
			{menus.map((menu, index) => (
				<TopMenu key={index} name={menu.name} active={menu.active} url={menu.url} />
			))}
		</nav>
	);
};

export default TopMenuList;
