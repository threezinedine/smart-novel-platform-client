interface DropdownItemData {
	text: string;
	testId?: string;
	to?: string;
	callback?: () => void;
}

interface DropdownProps {
	children: React.ReactNode;
	items?: DropdownItemData[];
	gap?: number;
}

export type { DropdownProps };
