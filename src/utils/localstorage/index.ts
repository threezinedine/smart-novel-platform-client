class LocalStorage {
	static loadItem<T>(key: string, defaultValue: T): T {
		const item = localStorage.getItem(key);

		if (typeof item === "string") {
			return item as T;
		}
		if (item) {
			return JSON.parse(item);
		}
		return defaultValue;
	}

	static setItem<T>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static clear(): void {
		localStorage.clear();
	}

	static contains(key: string): boolean {
		if (localStorage.getItem(key)) {
			return true;
		}
		return false;
	}

	static deleteItem(key: string): void {
		localStorage.removeItem(key);
	}
}

export default LocalStorage;
