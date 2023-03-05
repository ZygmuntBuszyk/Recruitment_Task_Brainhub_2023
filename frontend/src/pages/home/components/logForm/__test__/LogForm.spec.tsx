import React from 'react';
import LogForm from '../LogForm';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ILogRequest } from '@/services/api/apiModels/log';

describe('LogForm', function () {
	const DUMMY_TEXT_INPUT = 'dummy input';
	const DUMMY_EMAIL_INPUT = 'dummy@email.com';
	const ONSUBMIT_MOCK = jest.fn().mockImplementation((values: ILogRequest, callback: Function) => {});
	let DUMMY_ISLOADING = false;

	it('renders correctly', () => {
		const component = renderer.create(<LogForm onSubmit={ONSUBMIT_MOCK} isLoading={DUMMY_ISLOADING} />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('Should be able to submit a form, whenever required inputs are filled', async () => {
		const { getByTestId } = render(<LogForm onSubmit={ONSUBMIT_MOCK} isLoading={DUMMY_ISLOADING} />);
		const nameInput = getByTestId('logForm.nameInput');
		expect(nameInput).toBeTruthy();

		const emailInput = getByTestId('logForm.emailInput');
		expect(emailInput).toBeTruthy();

		const textarea = getByTestId('logForm.textarea');
		expect(textarea).toBeTruthy();

		fireEvent.change(nameInput, { target: { value: DUMMY_TEXT_INPUT } });
		expect((nameInput as HTMLInputElement).value).toBe(DUMMY_TEXT_INPUT);

		fireEvent.change(emailInput, { target: { value: DUMMY_EMAIL_INPUT } });
		expect((emailInput as HTMLInputElement).value).toBe(DUMMY_EMAIL_INPUT);

		fireEvent.change(textarea, { target: { value: DUMMY_TEXT_INPUT } });
		expect((textarea as HTMLInputElement).value).toBe(DUMMY_TEXT_INPUT);

		const registerButton = await getByTestId('logForm.submitButton');
		expect(registerButton).toBeTruthy();

		await waitFor(() => {
			fireEvent.click(registerButton);
		});

		expect(ONSUBMIT_MOCK).toHaveBeenCalledWith(
			{
				name: DUMMY_TEXT_INPUT,
				email: DUMMY_EMAIL_INPUT,
				log: DUMMY_TEXT_INPUT
			} as ILogRequest,
			expect.any(Function)
		);

		expect(ONSUBMIT_MOCK).toBeCalledTimes(1);
	});

	it('Should not be able to submit a form, whenever required inputs arent filled', async () => {
		const { getByTestId } = render(<LogForm onSubmit={ONSUBMIT_MOCK} isLoading={DUMMY_ISLOADING} />);
		const nameInput = getByTestId('logForm.nameInput');
		expect(nameInput).toBeTruthy();

		const emailInput = getByTestId('logForm.emailInput');
		expect(emailInput).toBeTruthy();

		const textarea = getByTestId('logForm.textarea');
		expect(textarea).toBeTruthy();

		fireEvent.change(nameInput, { target: { value: '' } });
		expect((nameInput as HTMLInputElement).value).toBe('');

		fireEvent.change(emailInput, { target: { value: '' } });
		expect((emailInput as HTMLInputElement).value).toBe('');

		fireEvent.change(textarea, { target: { value: '' } });
		expect((textarea as HTMLInputElement).value).toBe('');

		const registerButton = await getByTestId('logForm.submitButton');
		expect(registerButton).toBeTruthy();

		await waitFor(() => {
			fireEvent.click(registerButton);
		});

		expect(ONSUBMIT_MOCK).toBeCalledTimes(0);
	});

	it('Should not be able to submit a form if email is in the wrong format', async () => {
		const { getByTestId } = render(<LogForm onSubmit={ONSUBMIT_MOCK} isLoading={DUMMY_ISLOADING} />);
		const nameInput = getByTestId('logForm.nameInput');
		expect(nameInput).toBeTruthy();

		const emailInput = getByTestId('logForm.emailInput');
		expect(emailInput).toBeTruthy();

		const textarea = getByTestId('logForm.textarea');
		expect(textarea).toBeTruthy();

		fireEvent.change(nameInput, { target: { value: DUMMY_TEXT_INPUT } });
		expect((nameInput as HTMLInputElement).value).toBe(DUMMY_TEXT_INPUT);

		fireEvent.change(emailInput, { target: { value: '' } });
		expect((emailInput as HTMLInputElement).value).toBe('');

		fireEvent.change(textarea, { target: { value: DUMMY_TEXT_INPUT } });
		expect((textarea as HTMLInputElement).value).toBe(DUMMY_TEXT_INPUT);

		const registerButton = await getByTestId('logForm.submitButton');
		expect(registerButton).toBeTruthy();

		await waitFor(() => {
			fireEvent.click(registerButton);
		});

		expect(ONSUBMIT_MOCK).toBeCalledTimes(0);
	});

	it('Should not be able to interact with form whenever form is disabled(submiting)', async () => {
		DUMMY_ISLOADING = true;

		const { getByTestId } = render(<LogForm onSubmit={ONSUBMIT_MOCK} isLoading={DUMMY_ISLOADING} />);
		const nameInput = getByTestId('logForm.nameInput');
		expect(nameInput).toBeTruthy();

		const emailInput = getByTestId('logForm.emailInput');
		expect(emailInput).toBeTruthy();

		const textarea = getByTestId('logForm.textarea');
		expect(textarea).toBeTruthy();

		fireEvent.change(nameInput, { target: { value: DUMMY_TEXT_INPUT } });
		expect((nameInput as HTMLInputElement).value).toBe(DUMMY_TEXT_INPUT);

		fireEvent.change(emailInput, { target: { value: DUMMY_EMAIL_INPUT } });
		expect((emailInput as HTMLInputElement).value).toBe(DUMMY_EMAIL_INPUT);

		fireEvent.change(textarea, { target: { value: DUMMY_EMAIL_INPUT } });
		expect((textarea as HTMLInputElement).value).toBe(DUMMY_EMAIL_INPUT);

		const registerButton = await getByTestId('logForm.submitButton');
		expect(registerButton).toBeTruthy();

		await waitFor(() => {
			fireEvent.click(registerButton);
		});

		expect(ONSUBMIT_MOCK).toBeCalledTimes(0);
	});
});
