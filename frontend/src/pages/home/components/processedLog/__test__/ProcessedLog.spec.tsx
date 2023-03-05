import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { getByTestId, render } from '@testing-library/react';
import ProcessedLog from '@/pages/home/components/processedLog/ProcessedLog';

describe('ProcessedLog', function () {
	const DUMMY_LOG = 'dummy log';

	it('renders correctly', () => {
		const component = renderer.create(<ProcessedLog log={DUMMY_LOG} />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('Should show correct log  text', async () => {
		const { getByText } = render(<ProcessedLog log={DUMMY_LOG} />);

		expect(getByText(DUMMY_LOG)).toBeInTheDocument();
	});

	// idfk
	it.skip('Should have monospace font family style ', async () => {
		const { getByTestId } = render(<ProcessedLog log={DUMMY_LOG} />);

		const processedLog = getByTestId('processedLog.log');

		expect(processedLog).toHaveStyle({
			'font-family': 'monospace'
		});
	});
});
