'use client';

import React, { type ReactElement, useState } from 'react';
import { BASE_API_URL } from '@/lib/constants/config';
import { type LoginProps } from '@/types/login';
import { useRecoilState } from 'recoil';
import { jwtAccessState } from '../../lib/state/jwt-access-state';
import { jwtRefreshState } from '@/lib/state/jwt-refresh-state';

interface LoginModalProps {
	isLoginModalOpen: boolean;
	setIsLoginModalOpen: (value: boolean) => void;
}

async function fetchLogin(id: string): Promise<LoginProps> {
	return await fetch(`${BASE_API_URL}/users/login`, {
		cache: 'no-cache',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userId: id,
		}),
	})
		.then(async res => {
			return await res.json();
		})
		.catch(err => {
			throw err;
		});
}

export default function LoginModal(props: LoginModalProps): ReactElement {
	const [accessToken, setAccessToken] = useRecoilState(jwtAccessState);
	const [, setRefreshToken] = useRecoilState(jwtRefreshState);

	const [id, setId] = useState('');

	const handleClose = (): void => {
		props.setIsLoginModalOpen(false);
	};

	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();

		fetchLogin(id)
			.then(res => {
				setAccessToken(res.accessToken);
				setRefreshToken(res.refreshToken);
			})
			.catch(err => {
				console.error(err);
			});
	};

	const handleLogout = (): void => {
		setAccessToken('');
		setRefreshToken('');
	};

	return (
		<div className={`fixed z-10 inset-0 overflow-y-auto ${props.isLoginModalOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
					&#8203;
				</span>
				<div
					className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
						props.isLoginModalOpen ? 'scale-100' : 'scale-0'
					} transition-transform duration-500`}
				>
					<div className="bg-gray-50 px-6 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<form onSubmit={handleSubmit}>
							{accessToken !== '' && (
								<>
									<p>로그인 중</p>
									<button
										type="button"
										className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
										onClick={handleLogout}
									>
										Logout
									</button>
								</>
							)}
							{accessToken === '' && (
								<>
									<input
										type="id"
										value={id}
										onChange={e => {
											setId(e.target.value);
										}}
										required
										className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
									/>
									<input
										type="submit"
										value="Log in"
										className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									/>
								</>
							)}
							<button
								type="button"
								className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								onClick={handleClose}
							>
								Close
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
