import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ToggleProps {
	value?: boolean;
	onChange?: (value: boolean) => void;
	testId?: string;
	onIcon?: IconDefinition;
	offIcon?: IconDefinition;
}

export type { ToggleProps };
