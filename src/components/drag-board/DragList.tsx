import React from "react";
import { DragListProps } from "./Props";
import DragItem from "./DragItem";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

const DragList: React.FC<DragListProps> = ({ items, className, onChange }) => {
	return (
		<div
			className={loader.load("drag-list")}
			onChange={(e: React.ChangeEvent<HTMLDivElement>) => {
				console.log(e);
			}}
		>
			{items.map((item) => (
				<div
					key={item.id}
					id={item.id}
					className={loader.load("item-container")}
				>
					<DragItem data={item} onChange={onChange} />
				</div>
			))}
		</div>
	);
};

export default DragList;
