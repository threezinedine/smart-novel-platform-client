import { create } from "zustand";
import { Language } from "../types/types";

interface LanguageState {
	language: Language;
}

interface LanguageActions {
	setLanguage: (language: Language) => void;
}

interface LanguageStore extends LanguageState, LanguageActions {}

const useLanguageStore = create<LanguageStore>((set) => ({
	language: "en",
	setLanguage: (language) => set({ language }),
}));

export default useLanguageStore;
