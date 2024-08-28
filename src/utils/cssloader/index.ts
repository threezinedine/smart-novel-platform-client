import { Styles } from "data/styles";

class CssLoader {
	private styles: Styles;

	constructor(styles: Styles) {
		this.styles = styles;
	}

	public load(...names: (string | null | undefined)[]): string {
		return names.reduce((acc: string, name: string | null | undefined) => {
			if (name === "" || name === null || name === undefined) return acc;
			if (this.styles[name] === undefined) {
				if (acc === "") {
					return name;
				}
				return `${acc} ${name}`;
			}
			if (acc === "") {
				return this.styles[name];
			}
			if (this.styles[name] === "") {
				return acc;
			}
			return `${acc} ${this.styles[name]}`;
		}, "");
	}
}

export default CssLoader;
