import React, { useEffect } from "react";
import Dropdown from "components/dropdown";
import { LanguageSelectionProps } from "./Props";
import LocalStorage from "utils/localstorage";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import { Language } from "../types/types";
import useLanguageStore from "../store/store";

const loader = new CssLoader(styles);

const LanguageSelection: React.FC<LanguageSelectionProps> = () => {
	const [language, setLanguage] = React.useState<Language>(
		LocalStorage.loadItem("language", "en")
	);
	const changeLanguage = useLanguageStore((state) => state.setLanguage);

	useEffect(() => {
		changeLanguage(language);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Dropdown
			items={[
				{
					text: "English",
					callback: () => {
						LocalStorage.setItem("language", "en");
						changeLanguage("en");
						setLanguage("en");
					},
				},
				{
					text: "Vietnamese",
					callback: () => {
						LocalStorage.setItem("language", "vi");
						changeLanguage("vi");
						setLanguage("vi");
					},
				},
			]}
		>
			<div className={loader.load("language")}>{language}</div>
		</Dropdown>
	);
};

export default LanguageSelection;
