import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import Item from "./Item";
import DragItem from "./DragItem";
import { createRoot } from "react-dom/client";

const loader = new CssLoader(styles);

class List {
	private list: HTMLDivElement;
	private item: Item | null = null;
	private rect: DOMRect;
	private itemHeight: number;
	private onChange: () => void;

	constructor(
		list: HTMLDivElement,
		itemHeight: number,
		onChange: () => void = () => {}
	) {
		this.list = list;
		this.rect = list.getBoundingClientRect();
		this.itemHeight = itemHeight;
		this.onChange = onChange;
	}

	isMouseIn(mouseX: number, mouseY: number) {
		const isIn =
			mouseX >= this.rect.left &&
			mouseX <= this.rect.right &&
			mouseY >= this.rect.top &&
			mouseY <= this.rect.bottom;

		if (!isIn) {
			this.reset();
		}

		if (isIn) {
			this.addTemp();
		}

		return isIn;
	}

	setItem(item: Item) {
		this.item = item;
	}

	addTemp() {
		const existedTemp = this.list.querySelector(`#${loader.load("temp")}`);

		if (existedTemp) {
			return;
		}

		const temp = document.createElement("div");
		temp.id = loader.load("temp");
		temp.style.height = `${this.itemHeight}px`;
		this.list.appendChild(temp);
	}

	removeTemp() {
		const temp = this.list.querySelector(`#${loader.load("temp")}`);

		if (temp) {
			this.list.removeChild(temp);
		}
	}

	reset() {
		const itemElements = this.list.querySelectorAll(
			`.${loader.load("item")}`
		);

		const items = Array.from(itemElements).map(
			(item) => new Item(item as HTMLDivElement)
		);

		items.forEach((i) => {
			i.translate(0);
		});

		this.item = null;

		this.removeTemp();
	}

	onMouseIn(item: Item, mouseX: number, mouseY: number) {
		if (!this.isMouseIn(mouseX, mouseY)) {
			return;
		}
		this.setItem(item);
		const itemElements = this.list.querySelectorAll(
			`.${loader.load("item")}`
		);
		const items = Array.from(itemElements).map(
			(item) => new Item(item as HTMLDivElement)
		);

		const lowerItems = items.filter(
			(i) => !i.isUpperByMouse(mouseY) && i.id !== item.id
		);

		const upperItems = items.filter(
			(i) => i.isUpperByMouse(mouseY) && i.id !== item.id
		);

		lowerItems.forEach((i) => {
			i.translate(0);
		});

		upperItems.forEach((i) => {
			i.translate(i.height);
		});
	}

	drop(mouseX: number, mouseY: number) {
		if (!this.isMouseIn(mouseX, mouseY)) {
			return;
		}

		if (this.item === null) {
			return;
		}

		this.item.removeFromParent();

		// query the latest item which less than mouseY
		const itemElements = this.list.querySelectorAll(
			`.${loader.load("item")}`
		);

		const items = Array.from(itemElements).map(
			(item) => new Item(item as HTMLDivElement)
		);

		const upperItems = items.filter(
			(i) => i.isUpperByMouse(mouseY) && i.id !== this.item?.id
		);

		const newItem = document.createElement("div");
		newItem.className = loader.load("item-container");
		newItem.id = this.item.id;
		const root = createRoot(newItem);
		// React.createElement(DragItem, { data: this.item.itemData });
		root.render(
			<DragItem data={this.item.itemData} onChange={this.onChange} />
		);

		if (upperItems.length === 0) {
			this.list.appendChild(newItem);
		} else {
			this.list.insertBefore(
				newItem,
				document.getElementById(upperItems[0].id) as Node
			);
		}

		this.onChange();
	}
}

export default List;
