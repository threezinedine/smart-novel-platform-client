import React from "react";
import { LangTextProps } from "./Props";
import useLanguageStore from "../store/store";
import languageData from "../data/data";

const LangText: React.FC<LangTextProps> = ({ text }) => {
	const language = useLanguageStore((state) => state.language);
	return <span>{languageData[text] && languageData[text][language]}</span>;
};

export default LangText;
