import React from "react";
import { ButtonProps } from "./ButtonProps";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	to,
	testId,
	className,
}) => {
	if (!text) {
		text = "Button";
	}

	const navigate = useNavigate();

	const handleClick = () => {
		onClick && onClick();
		to && navigate(to);
	};

	return (
		<button
			data-testid={testId}
			onClick={handleClick}
			className={loader.load("button", className)}
		>
			{text}
		</button>
	);
};

export default Button;
