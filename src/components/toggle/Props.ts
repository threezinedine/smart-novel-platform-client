import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ToggleProps {
	value?: boolean;
	onChange?: (value: boolean) => void;
	testId?: string;
	onIcon?: IconDefinition;
	offIcon?: IconDefinition;
	className?: string;
}

export type { ToggleProps };
