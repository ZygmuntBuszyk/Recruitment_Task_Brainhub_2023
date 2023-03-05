import React from 'react';
import { message } from 'antd';
import api from '../api';
import { AxiosError } from 'axios';
import { Image } from 'antd';

const responseInterceptor = () => {
	api.interceptors.response.use(
		response => {
			message.success({
				content: 'Log was processed successfully.',
				icon: <Image src={require('../../../assets/icons/success.svg')} alt='success' />
			});

			return Promise.resolve(response);
		},
		(error: AxiosError) => {
			switch (error?.response?.status) {
				case 500:
					message.error({
						content: 'Server error, there is something wrong with your requested operation.',
						icon: <Image src={require('../../../assets/icons/error.svg')} alt='error' />
					});
					break;
				case 400:
					message.error({
						content: 'Bad request. Malformed request syntax',
						icon: <Image src={require('../../../assets/icons/error.svg')} alt='error' />
					});
					break;
				default:
					message.error({
						content: error.message,
						icon: <img src={require('../../../assets/icons/error.svg')} alt='error' />
					});
					break;
			}
			// I quess we don't need more errors to handle any more errors like auth or permission.

			return Promise.reject(error);
		}
	);
};

export default responseInterceptor;
