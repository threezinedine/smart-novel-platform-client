import React from "react";
import { DragBoardProps } from "./Props";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import DragList from "./DragList";

const loader = new CssLoader(styles);

const DragBoard: React.FC<DragBoardProps> = ({ data, onChange }) => {
	const changeFunc = () => {
		if (!onChange) return;

		const ids: string[][] = [];

		const dragLists = Array.from(
			document.querySelectorAll(`.${loader.load("drag-list")}`)
		) as HTMLDivElement[];

		for (const dragList of dragLists) {
			const idsList: string[] = [];

			const items = Array.from(
				dragList.querySelectorAll(`.${loader.load("item-container")}`)
			) as HTMLDivElement[];

			for (const item of items) {
				idsList.push(item.id);
			}

			ids.push(idsList);
		}

		onChange(ids);
	};

	return (
		<div className={loader.load("drag-board")}>
			{data.map((items, index) => {
				return (
					<DragList key={index} items={items} onChange={changeFunc} />
				);
			})}
		</div>
	);
};

export default DragBoard;
