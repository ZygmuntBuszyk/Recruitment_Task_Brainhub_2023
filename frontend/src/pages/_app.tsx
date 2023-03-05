import Head from 'next/head';
import PageWithLayoutType from '@/layout/PageWithLayoutType';
import * as React from 'react';

interface IAppLayoutProps {
	Component: PageWithLayoutType;
	pageProps: any;
}

function App({ Component, pageProps }: IAppLayoutProps) {
	const Layout = Component.Layout || React.Fragment;

	return (
		<>
			<Head>
				<title>Recruitment application for brainhub</title>
				<meta name='description' content='Recruitment application for brainhub' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</div>
		</>
	);
}

export default App;
