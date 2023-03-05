import { Layout } from 'antd';
import React, { ReactNode, useEffect } from 'react';
import styles from './MainLayout.module.scss';
import { responseInterceptor } from '@/services/api/interceptors';

interface IMainLayoutProps {
	children: ReactNode;
}

function MainLayout({ children }: IMainLayoutProps) {
	useEffect(() => {
		responseInterceptor();
	}, []);

	return (
		<Layout>
			<Layout.Content>
				<div className={styles.main}>
					<div className={styles['main-content__children']}>{children}</div>
				</div>
			</Layout.Content>
		</Layout>
	);
}

export default MainLayout;
