import { ItemData } from "./Props";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

class Item {
	private item: HTMLDivElement;
	private signRect: DOMRect;
	private itemRect: DOMRect;
	private offsetX: number;
	private offsetY: number;
	private data: ItemData;
	private onChange: () => void;

	constructor(
		item: HTMLDivElement,
		data: ItemData = { id: "", node: <div></div> },
		onChange: () => void = () => {}
	) {
		this.item = item;
		const sign = item.querySelector(
			`.${loader.load("item-sign")}`
		) as HTMLDivElement;

		this.signRect = sign.getBoundingClientRect();
		this.itemRect = item.getBoundingClientRect();
		this.data = data;
		this.offsetX = 0;
		this.offsetY = 0;
		this.onChange = onChange;
	}

	get itemData(): ItemData {
		return this.data;
	}

	get id() {
		return this.item.id;
	}

	get height() {
		return this.itemRect.height;
	}

	moveByMouse(mouseX: number, mouseY: number) {
		this.item.style.left = `${mouseX - this.offsetX}px`;
		this.item.style.top = `${mouseY - this.offsetY}px`;
	}

	getOffset(mouseX: number, mouseY: number) {
		this.offsetX = mouseX - this.signRect.left + this.signRect.width / 2;
		this.offsetY = mouseY - this.signRect.top + this.signRect.height / 2;
	}

	translate(y: number) {
		this.item.style.transform = `translateY(${y}px)`;
	}

	isUpperByMouse(mouseY: number) {
		const rect = this.item.getBoundingClientRect();
		return mouseY < rect.top + rect.height / 2;
	}

	onDragStart(mouseX: number, mouseY: number) {
		this.item.classList.add(loader.load("dragging"));
		this.item.style.width = `${this.itemRect.width * 0.9}px`;
		this.item.style.height = `${this.itemRect.height * 0.9}px`;
		this.item.style.zIndex = "1000";
		this.getOffset(mouseX, mouseY);

		this.moveByMouse(mouseX, mouseY);
	}

	onDragMove(mouseX: number, mouseY: number) {
		this.moveByMouse(mouseX, mouseY);
	}

	onDragEnd() {
		this.item.classList.remove(loader.load("dragging"));

		this.item.style.width = "";
		this.item.style.height = "";
		this.item.style.transform = "";
		this.item.style.zIndex = "";
	}

	removeFromParent() {
		const parent = this.item.parentElement;
		if (parent === null) return;
		const grandfa = parent.parentElement;
		grandfa?.removeChild(parent);
	}
}

export default Item;
