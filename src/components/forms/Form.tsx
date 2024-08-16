import React, { useRef, useState } from "react";
import FormProps, {
	ErrorType,
	InputComponentRef,
	ValueType,
	Data,
} from "./Props";
import Input from "./Input";

interface InputState {
	name: string;
	value: ValueType;
	error: ErrorType;
}

interface InputStateDict {
	[key: string]: InputState;
}

const Form: React.FC<FormProps> = ({ inputs, submitFunc }) => {
	const [states, setStates] = useState<InputStateDict>(
		inputs.reduce((acc, input) => {
			acc[input.name] = {
				name: input.name,
				value: "",
				error: null,
			};
			return acc;
		}, {} as InputStateDict)
	);

	const inputRefs = useRef<Array<InputComponentRef | null>>(
		Array(inputs.length).fill(null)
	);

	const onSubmit = () => {
		inputRefs.current.forEach((inputRef) => {
			if (inputRef) {
				inputRef.validateFunction();
			}
		});

		if (Object.values(states).every((input) => input.error == null)) {
			submitFunc &&
				submitFunc(
					Object.values(states).reduce((acc, input) => {
						acc[input.name] = input.value;
						return acc;
					}, {} as Data)
				);
		}
	};

	return (
		<div>
			{inputs.map((input, index) => {
				return (
					<Input
						key={index}
						{...input}
						ref={(el) => (inputRefs.current[index] = el)}
						value={states[input.name].value}
						setValue={(value) => {
							states[input.name].value = value;
							setStates({ ...states });
						}}
						error={states[input.name].error}
						setError={(error) => {
							states[input.name].error = error;
							setStates({ ...states });
						}}
					/>
				);
			})}

			<div data-testid="submit" onClick={onSubmit}>
				Submit
			</div>
		</div>
	);
};

export default Form;
