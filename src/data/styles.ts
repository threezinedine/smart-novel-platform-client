type Styles = { [key: string]: string };
type JSONDict = { [key: string]: string | number | null };

interface StringValidationFunc {
	(value: string): string | null | undefined;
}

export type { Styles, StringValidationFunc, JSONDict };
