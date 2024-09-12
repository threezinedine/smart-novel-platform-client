import React, { useRef } from "react";
import { DragItemProps } from "./Props";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";
import List from "./List";

const loader = new CssLoader(styles);

const DragItem: React.FC<DragItemProps> = ({ data, onChange }) => {
	const itemRef = useRef<HTMLDivElement>(null);

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.button !== 0) return;
		if (itemRef.current === null) return;
		const item = new Item(itemRef.current, data);
		const dragLists = document.querySelectorAll(
			`.${loader.load("drag-list")}`
		);

		const lists = Array.from(dragLists).map(
			(list) => new List(list as HTMLDivElement, item.height, onChange)
		);

		item.onDragStart(e.clientX, e.clientY);

		document.onmousemove = (pointerMoveEvent) => {
			item.onDragMove(pointerMoveEvent.clientX, pointerMoveEvent.clientY);
			const currentList = lists.find((list) =>
				list.isMouseIn(
					pointerMoveEvent.clientX,
					pointerMoveEvent.clientY
				)
			);

			if (currentList === undefined) return;

			currentList.onMouseIn(
				item,
				pointerMoveEvent.clientX,
				pointerMoveEvent.clientY
			);
		};

		document.onpointerup = (pointerDownEvent) => {
			document.onpointerup = null;
			document.onmousemove = null;

			item.onDragEnd();
			lists.forEach((list) => {
				list.drop(pointerDownEvent.clientX, pointerDownEvent.clientY);
				list.reset();
			});
		};
	};

	return (
		<div className={loader.load("item")} id={data.id} ref={itemRef}>
			<div
				className={loader.load("item-sign")}
				onPointerDown={onPointerDown}
			>
				<FontAwesomeIcon icon={faGripVertical} />
			</div>
			<div className={loader.load("item-content")}>{data.node}</div>
		</div>
	);
};

export default DragItem;
