import { type NextRequest, NextResponse } from 'next/server';
import { BASE_API_URL, BASE_URL } from '@/lib/constants/config';
import * as querystring from 'querystring';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest): Promise<NextResponse> {
	const reader = req.body?.getReader();

	if (reader == null) {
		return NextResponse.redirect(`${BASE_URL}/order/K111882/fail`, 302);
	}

	let result = '';
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		result += new TextDecoder('utf-8').decode(value);
	}

	const data = querystring.parse(result);
	if (data.P_STATUS !== '00') {
		let errorMessage: string;
		if (Array.isArray(data?.P_RMESG1)) {
			errorMessage = data?.P_RMESG1[0] ?? '이니시스 결제 처리에 문제가 발생했습니다.';
		} else {
			errorMessage = data?.P_RMESG1 ?? '이니시스 결제 처리에 문제가 발생했습니다.';
		}

		return NextResponse.redirect(`${BASE_URL}/order/K111882/fail?message=${errorMessage}`, 302);
	}

	const jsonBody = JSON.stringify({
		P_STATUS: data.P_STATUS,
		P_RMESG1: data.P_RMESG1,
		P_TID: data.P_TID,
		P_REQ_URL: data.P_REQ_URL,
		P_NOTI: data.P_NOTI,
		P_AMT: data.P_AMT,
	});

	const accessToken = cookies().get('lush_access_jwt')?.value ?? '';
	const response = await fetch(`${BASE_API_URL}/order/inicis/execute-order`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: jsonBody,
	});

	if (!response.ok) {
		return NextResponse.redirect(`${BASE_URL}/order/K111882/fail?message=이니시스 결제 처리에 문제가 발생했습니다.`, 302);
	}

	return NextResponse.redirect(`${BASE_URL}/order/K111882/success`, 302);
}
