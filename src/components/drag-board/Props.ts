import React from "react";

interface ItemData {
	id: string;
	node: React.ReactNode;
}

interface DragItemProps {
	data: ItemData;
	onChange: () => void;
}

interface DragListProps {
	items: ItemData[];
	className?: string;
	onChange: () => void;
}

interface DragBoardProps {
	data: ItemData[][];
	onChange?: (ids: string[][]) => void;
}

export type { ItemData, DragItemProps, DragListProps, DragBoardProps };
