import React from "react";
import { ButtonProps } from "./ButtonProps";
import { useNavigate } from "react-router-dom";

const Button: React.FC<ButtonProps> = ({ text, onClick, to, testId }) => {
	if (!text) {
		text = "Button";
	}

	const navigate = useNavigate();

	const handleClick = () => {
		onClick && onClick();
		to && navigate(to);
	};

	return (
		<button data-testid={testId} onClick={handleClick}>
			{text}
		</button>
	);
};

export default Button;
