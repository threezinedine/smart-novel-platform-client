import Styles from "../../data/styles";

class CssLoader {
	private styles: Styles;

	constructor(styles: Styles) {
		this.styles = styles;
	}

	public load(...names: (string | null)[]): string {
		return names.reduce((acc: string, name: string | null) => {
			if (name === "" || name === null) return acc;
			if (this.styles[name] === undefined) return acc;
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
