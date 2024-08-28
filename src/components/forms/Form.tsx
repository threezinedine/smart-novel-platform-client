import React from "react";
import FormProps from "./Props";
import { FormData, FormError } from "./types";

const Form: React.FC<FormProps> = ({ inputs, submitFunc }) => {
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
		<div>
			{inputs.map((input, index) => {
				return (
					<div key={index}>
						<input
							data-testid={input.testId}
							type={input.type || "text"}
							value={values[input.name] || ""}
							onChange={(e) =>
								setValues({
									...values,
									[input.name]: e.target.value,
								})
							}
							onBlur={() => onBlur(input.name)}
						/>
						{errors[input.name] && (
							<div data-testid="error">{errors[input.name]}</div>
						)}
					</div>
				);
			})}

			<div data-testid="submit" onClick={onSubmit}>
				Submit
			</div>
		</div>
	);
};

export default Form;
