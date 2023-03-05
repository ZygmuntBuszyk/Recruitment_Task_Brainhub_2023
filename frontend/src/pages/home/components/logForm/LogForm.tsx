import React from 'react';
import styles from './LogForm.module.scss';
import { Button, Input, Form } from 'antd';
import { FormRequestType, ILogRequest } from '@/services/api/apiModels/log';

interface ILogFormProps {
	onSubmit: (values: ILogRequest, callback: Function) => void;
	isLoading?: boolean;
}

function LogForm({ onSubmit, isLoading }: ILogFormProps) {
	const [form] = Form.useForm();

	return (
		<Form
			form={form}
			disabled={isLoading}
			layout='vertical'
			requiredMark={false}
			className={styles['form']}
			onFinish={(values: ILogRequest) => onSubmit(values, form.resetFields)}
		>
			<Form.Item
				className={styles['form__item']}
				label={FormRequestType.NAME.toUpperCase()}
				name={FormRequestType.NAME}
				rules={[
					{
						required: true,
						message: 'Name is required.'
					}
				]}
				hasFeedback
			>
				<Input data-testid='logForm.nameInput' className={styles['form__item-input']} placeholder={'Enter your Name'} />
			</Form.Item>

			<Form.Item
				className={styles['form__item']}
				label={FormRequestType.EMAIL.toUpperCase()}
				name={FormRequestType.EMAIL}
				rules={[
					{
						required: true,
						message: 'Email is required.'
					},
					{
						type: 'email',
						message: 'Email should be valid.'
					}
				]}
				hasFeedback
			>
				<Input data-testid='logForm.emailInput' placeholder={'Enter your email'} />
			</Form.Item>

			<Form.Item
				className={styles['form__item']}
				label={FormRequestType.LOG.toUpperCase()}
				name={FormRequestType.LOG}
				rules={[
					{
						required: true,
						message: 'Log is required.'
					}
				]}
				hasFeedback
			>
				<textarea data-testid='logForm.textarea' placeholder={'Enter your log'} disabled={isLoading} />
			</Form.Item>

			<Form.Item className={styles['form__item']}>
				<Button data-testid='logForm.submitButton' type='primary' htmlType='submit'>
					Process Log
				</Button>
			</Form.Item>
		</Form>
	);
}

export default LogForm;
