import LocalStorage from "utils/localstorage";

class ThemeLocalStorage {
	static setTheme(isDark: boolean): void {
		LocalStorage.setItem("theme", isDark);
	}

	static loadTheme(): boolean {
		return LocalStorage.loadItem("theme", false);
	}
}

export default ThemeLocalStorage;
