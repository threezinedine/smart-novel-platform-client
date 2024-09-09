import React from "react";
import { DragListItemData, DragListProps } from "./Props";
import styles from "./DragList.module.scss";
import CssLoader from "utils/cssloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

const loader = new CssLoader(styles);

const DragList: React.FC<DragListProps> = ({ items, className }) => {
	const [sortedItems, setSortedItems] =
		React.useState<DragListItemData[]>(items);
	const [draggingIndex, setDraggingIndex] = React.useState<number | null>(
		null
	);
	const containerRef = React.useRef<HTMLDivElement>(null);

	const onDragStart = (
		event: React.PointerEvent<HTMLDivElement>,
		index: number
	) => {
		if (event.button !== 0) return;
		const container = containerRef.current;
		if (container === null) return;

		const draggedItem = container?.children[index] as HTMLDivElement;
		const elements = Array.from(
			container?.children ?? []
		) as HTMLDivElement[];
		const remainingItems = elements.filter((_, i) => i > index);
		const nonSelectedItems = elements.filter((_, i) => i !== index);

		let items = [...sortedItems];
		items.splice(index, 1);
		let placedIndex = index;

		let gap = 0;

		if (container.childElementCount > 1) {
			const firstChild = container.children[0] as HTMLDivElement;
			const secondChild = container.children[1] as HTMLDivElement;

			gap =
				secondChild.getBoundingClientRect().top -
				firstChild.getBoundingClientRect().bottom;
		}

		const signElement = draggedItem.children[0] as HTMLDivElement;
		const signPaddingX = signElement.getBoundingClientRect().width / 2;
		const signPaddingY = signElement.getBoundingClientRect().height / 2;
		// const offsetX = e.clientX - draggedItem.getBoundingClientRect().left;
		const offsetX =
			event.clientX -
			signElement.getBoundingClientRect().left +
			signPaddingX / 2;
		// const offsetY = e.clientY - draggedItem.getBoundingClientRect().top;
		const offsetY =
			event.clientY -
			signElement.getBoundingClientRect().top +
			signPaddingY;
		const width = draggedItem.offsetWidth;
		const height = draggedItem.offsetHeight;

		setDraggingIndex(index);
		draggedItem.style.width = `${width}px`;
		draggedItem.style.height = `${height}px`;
		draggedItem.style.left = `${event.clientX - offsetX}px`;
		draggedItem.style.top = `${event.clientY - offsetY}px`;

		remainingItems.forEach((item) => {
			const itemElement = item as HTMLDivElement;
			itemElement.style.transform = `translateY(${height + gap}px)`;
		});

		const createTempElement = () => {
			const existedTempElements = container?.querySelector("#temp");
			if (existedTempElements) return;

			const tempElement = document.createElement("div");
			tempElement.id = "temp";
			tempElement.style.width = `${width}px`;
			tempElement.style.height = `${height + gap}px`;
			container?.appendChild(tempElement);
		};

		const removeTempElement = () => {
			if (container) {
				const tempElement = container.querySelector("#temp");
				if (tempElement && tempElement.parentNode === container) {
					container.removeChild(tempElement);
				}

				nonSelectedItems.forEach((element) => {
					const elementElement = element as HTMLDivElement;
					elementElement.style.transform = "";
				});
			}
		};

		createTempElement();

		document.onmousemove = (e) => {
			draggedItem.style.left = `${e.clientX - offsetX}px`;
			draggedItem.style.top = `${e.clientY - offsetY}px`;

			const containerRect = container.getBoundingClientRect();
			if (
				e.clientY < containerRect.top ||
				e.clientY > containerRect.bottom ||
				e.clientX < containerRect.left ||
				e.clientX > containerRect.right
			) {
				removeTempElement();
				return;
			}

			createTempElement();

			if (e.clientY > event.clientY) {
				const changedElements = nonSelectedItems.filter((element) => {
					const rect = element.getBoundingClientRect();
					return rect.top < e.clientY;
				});

				const unChangedElements = nonSelectedItems.filter((element) => {
					const rect = element.getBoundingClientRect();
					return rect.top >= e.clientY;
				});

				changedElements.forEach((element) => {
					const elementElement = element as HTMLDivElement;
					elementElement.style.transform = "";
				});

				placedIndex = changedElements.length;

				unChangedElements.forEach((element) => {
					const elementElement = element as HTMLDivElement;
					elementElement.style.transform = `translateY(${
						height + gap
					}px)`;
				});
			} else {
				const changedElements = nonSelectedItems.filter((element) => {
					const rect = element.getBoundingClientRect();
					return rect.bottom < e.clientY;
				});

				const unChangedElements = nonSelectedItems.filter((element) => {
					const rect = element.getBoundingClientRect();
					return rect.bottom >= e.clientY;
				});

				changedElements.forEach((element) => {
					const elementElement = element as HTMLDivElement;
					elementElement.style.transform = "";
				});

				placedIndex = changedElements.length;

				unChangedElements.forEach((element) => {
					const elementElement = element as HTMLDivElement;
					elementElement.style.transform = `translateY(${
						height + gap
					}px)`;
				});
			}
		};

		document.onpointerup = () => {
			setDraggingIndex(null);

			removeTempElement();

			document.onmousemove = null;

			items.splice(placedIndex, 0, sortedItems[index]);
			// remove all duplicates ids from items
			items = items.filter(
				(item, i) => items.findIndex((t) => t.id === item.id) === i
			);
			setSortedItems(items);
		};
	};

	return (
		<div className={loader.load("drag-list", className)} ref={containerRef}>
			{sortedItems.map((item: DragListItemData, index: number) => (
				<div
					key={index}
					id={item.id.toString()}
					className={loader.load(
						"item",
						draggingIndex === index ? "dragging" : ""
					)}
				>
					<div
						className={loader.load("sign")}
						onPointerDown={(e) => onDragStart(e, index)}
					>
						<FontAwesomeIcon icon={faGripVertical} />
					</div>
					<div className={loader.load("content")} draggable={false}>
						{item.node}
					</div>
				</div>
			))}
		</div>
	);
};

export default DragList;
