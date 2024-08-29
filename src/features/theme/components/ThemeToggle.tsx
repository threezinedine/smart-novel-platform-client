import React, { useEffect, useState } from "react";
import Toggle from "components/toggle";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import styles from "./ThemeToggle.module.scss";
import CssLoader from "utils/cssloader";
import ThemeLocalStorage from "../utils/ThemeLocalStorage";

const loader = new CssLoader(styles);

const ThemToggle: React.FC = () => {
	const [isDark, setIsDark] = useState(ThemeLocalStorage.loadTheme());

	useEffect(() => {
		document
			.querySelector("body")
			?.setAttribute("data-theme", isDark ? "dark" : "light");
		ThemeLocalStorage.setTheme(isDark);
	}, [isDark]);

	return (
		<Toggle
			testId="theme-toggle"
			className={loader.load("toggle")}
			value={isDark}
			onChange={setIsDark}
			onIcon={faMoon}
			offIcon={faSun}
		/>
	);
};

export default ThemToggle;
