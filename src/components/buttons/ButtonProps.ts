import React from "react";

interface ButtonProps {
	text?: string | React.ReactElement;
	onClick?: () => void;
	to?: string;
	testId?: string;
	className?: string;
	secondary?: boolean;
}

export type { ButtonProps };
