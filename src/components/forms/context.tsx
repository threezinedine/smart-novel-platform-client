import { create } from "zustand";
import { Data, ErrorType } from "./Props";

type FormError = { [key: string]: ErrorType };

type FormState = {
	data: Data;
	error: FormError;
};

type FormActions = {
	setup: (inputs: string[]) => void;
	changeData: (key: string, value: string, error: ErrorType) => void;
};

const useFormData = create<FormState & FormActions>((set) => ({
	data: {},
	error: {},
	setup: (inputs) =>
		set((state) => {
			state.data = inputs.reduce((acc, input) => {
				acc[input] = "";
				return acc;
			}, {} as Data);
			state.error = inputs.reduce((acc, input) => {
				acc[input] = null;
				return acc;
			}, {} as FormError);
			return JSON.parse(JSON.stringify(state));
		}),
	changeData: (key, value, error) =>
		set((state) => {
			state.data[key] = value;
			state.error[key] = error;
			return JSON.parse(JSON.stringify(state));
		}),
}));

export default useFormData;
