const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
// typescript: { ignoreBuildErrors: true },

module.exports = withPlugins([withImages], {
	async redirects() {
		return [
			{
				source: '/home',
				destination: '/',
				permanent: true
			}
		];
	},
	env: {
		NEXT_BACKEND_API_URL: process.env.NEXT_BACKEND_API_URL
	}
});
