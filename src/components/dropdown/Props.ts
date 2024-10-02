interface DropdownItemData {
	text: string;
	testId?: string;
	to?: string;
	callback?: () => void;
	divider?: boolean;
}

interface DropdownProps {
	children: React.ReactNode;
	items?: DropdownItemData[];
	gap?: number;
}

export type { DropdownProps };
