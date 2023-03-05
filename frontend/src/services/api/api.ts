import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_BACKEND_API_URL,
	headers: {
		Accept: '*/*',
		'Content-Type': 'application/json'
	}
});

export default api;
