import React, { useEffect, useState } from 'react';
import styles from './ProcessedLog.module.scss';

interface IProcessedLogProps {
	log: string;
}

function ProcessedLog({ log }: IProcessedLogProps) {
	const [lines, setLines] = useState<string[]>([]);

	useEffect(() => {
		const processedLogLines: string[] = log.split('\n');

		setLines(processedLogLines);
	}, [log]);

	return (
		<div className={styles.main}>
			<div data-testid='processedLog.log' className={styles['main-inner']}>
				{lines.map((line, key) => (
					<span key={key} className={styles['main-inner__error_line']}>
						{line}
					</span>
				))}
			</div>
		</div>
	);
}

export default ProcessedLog;
