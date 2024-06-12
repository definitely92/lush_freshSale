'use client';

import React, { type ReactElement } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

const Loading = (): ReactElement => {
	return (
		<div className="flex justify-center items-center h-screen">
			<MagnifyingGlass visible={true} height="80" width="80" ariaLabel="MagnifyingGlass-loading" wrapperStyle={{}} wrapperClass="MagnifyingGlass-wrapper" glassColor="#c0efff" color="#e15b64" />
		</div>
	);
};

export default Loading;
