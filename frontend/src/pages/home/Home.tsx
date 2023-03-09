import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import MainLayout from '@/layout/MainLayout';
import LogForm from '@/pages/home/components/logForm/LogForm';
import ProcessedLog from '@/pages/home/components/processedLog/ProcessedLog';
import useFormHandle from '@/hooks/useFormHandle';

function Home() {
	const [onSubmit, log, isLoading] = useFormHandle();

	return (
		<div className={styles.main}>
			<h1>Recruitment Application Brainhub</h1>

			<LogForm onSubmit={onSubmit} isLoading={isLoading} />

			{log && (
				<>
					<h1>Processed Log </h1>

					<ProcessedLog log={log} />
				</>
			)}
		</div>
	);
}

Home.Layout = MainLayout;

export default Home;
