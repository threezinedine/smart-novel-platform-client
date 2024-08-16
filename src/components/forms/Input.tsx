import React, { useImperativeHandle, forwardRef } from "react";
import { InputComponentProps, InputComponentRef } from "./Props";

const Input = forwardRef<InputComponentRef, InputComponentProps>(
	({ type, value, setValue, error, setError, testId, validations }, ref) => {
		const validate: () => void = () => {
			const err = validations
				?.map((validation) => validation(value))
				.filter((error) => error)[0];

			setError(err);
		};

		useImperativeHandle(ref, () => ({
			validateFunction: validate,
		}));

		return (
			<div>
				<input
					type={type || "text"}
					data-testid={testId}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onBlur={validate}
				/>
				{error && <div data-testid="error">{error}</div>}
			</div>
		);
	}
);

export default Input;
