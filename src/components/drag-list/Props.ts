interface DragListItemData {
	id: string;
	node: React.ReactNode;
}

interface DragListItemProps {
	data: DragListItemData;
	setSelectedData?: (data: DragListItemData | null) => void;
	onDrop?: () => void;
}

interface DragListProps {
	items: DragListItemData[];
	className?: string;
}

export type { DragListProps, DragListItemData, DragListItemProps };
