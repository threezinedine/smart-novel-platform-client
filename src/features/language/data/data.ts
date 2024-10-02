import { Language } from "../types/types";

type LanguageData = {
	[key: string]: { [key in Language]: string };
};

const languageData: LanguageData = {
	home: {
		en: "Home",
		vi: "Trang chủ",
	},
};

export type { LanguageData };
export default languageData;
