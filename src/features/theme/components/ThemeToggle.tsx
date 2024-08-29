import React from "react";
import Toggle from "components/toggle";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemToggle: React.FC = () => {
	const onChange = (value: boolean) => {
		if (value) {
			document.querySelector("body")?.setAttribute("data-theme", "dark");
		} else {
			document.querySelector("body")?.setAttribute("data-theme", "light");
		}
	};

	return (
		<Toggle
			testId="theme-toggle"
			onChange={onChange}
			onIcon={faMoon}
			offIcon={faSun}
		/>
	);
};

export default ThemToggle;
