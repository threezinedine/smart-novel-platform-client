import React from "react";
import FormProps from "./Props";
import { FormData, FormError } from "./types";
import CssLoader from "utils/cssloader";
import styles from "./Form.module.scss";
import Button from "components/buttons";

const loader = new CssLoader(styles);

const Form: React.FC<FormProps> = ({ title, inputs, submitFunc }) => {
	const [values, setValues] = React.useState(
		inputs.reduce(
			(acc, input) => ({ ...acc, [input.name]: "" }),
			{} as FormData
		)
	);
	const [errors, setErrors] = React.useState(
		inputs.reduce(
			(acc, input) => ({ ...acc, [input.name]: "" }),
			{} as FormError
		)
	);

	const onBlur = (name: string) => {
		const input = inputs.find((input) => input.name === name);

		const err = input?.validations
			?.map((validation) => validation(values[name], values))
			.filter((error) => error)[0];

		setErrors({ ...errors, [name]: err || "" });
	};

	const onSubmit = () => {
		const validatedErrors = JSON.parse(JSON.stringify(errors));
		inputs.forEach((input) => {
			validatedErrors[input.name] = input.validations
				?.map((validation) => validation(values[input.name], values))
				.filter((error) => error)[0];
		});

		if (
			Object.values(validatedErrors).every(
				(error) => error === null || error === undefined || error === ""
			)
		) {
			submitFunc && submitFunc(values);
		} else {
			setErrors(validatedErrors);
		}
	};

	return (
		<div className={loader.load("form")}>
			{title && (
				<div data-testid="form-title" className={loader.load("title")}>
					{title}
				</div>
			)}
			{inputs.map((input, index) => {
				return (
					<div key={index} className={loader.load("input")}>
						<label>{input.name}</label>
						<input
							data-testid={input.testId}
							type={input.type || "text"}
							value={values[input.name] || ""}
							placeholder={
								input.placeholder || "Enter this field"
							}
							onChange={(e) =>
								setValues({
									...values,
									[input.name]: e.target.value,
								})
							}
							onBlur={() => onBlur(input.name)}
						/>
						{errors[input.name] && (
							<div
								data-testid="error"
								className={loader.load("error")}
							>
								{errors[input.name]}
							</div>
						)}
					</div>
				);
			})}

			<Button
				text="Submit"
				testId="submit"
				onClick={onSubmit}
				className={loader.load("submit")}
				secondary
			/>
		</div>
	);
};

export default Form;
