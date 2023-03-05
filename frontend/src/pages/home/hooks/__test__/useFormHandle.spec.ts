import { ILogRequest } from '@/services/api/apiModels/log';
import React from 'react';
import useFormHandle from '@/pages/home/hooks/useFormHandle';

describe('useFormHandle', function () {
	const setStateMock = jest.fn();
	const useStateMock: any = (useState: any) => [useState, setStateMock];
	const onSubmitMock = jest.fn().mockImplementation(async (values: ILogRequest, callback: Function) => {});
	const useCallbackMock: any = (values: ILogRequest, callback: Function) => onSubmitMock;
	jest.spyOn(React, 'useState').mockImplementation(useStateMock);
	jest.spyOn(React, 'useCallback').mockImplementation(useCallbackMock);

	// pretty redundant tests there
	it('Should return correct values', async () => {
		const [onSubmit, log, isLoading] = useFormHandle();
		await onSubmit({ name: 'string', email: 'string', log: 'string' }, () => {});

		expect(log).toEqual('');
		expect(isLoading).toEqual(false);
		expect(onSubmit).toHaveBeenCalled();
	});
});
