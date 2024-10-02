import React, { useEffect } from "react";
import { DropdownProps } from "./Props";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import { useNavigate } from "react-router-dom";

const loader = new CssLoader(styles);
const menuMinWidth = window.innerWidth / 8;

const Dropdown: React.FC<DropdownProps> = ({ children, items, gap }) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const onStart = (event: MouseEvent) => {
		const menu = ref.current?.querySelector(
			`.${loader.load("menu")}`
		) as HTMLDivElement;
		const trigger = ref.current?.querySelector(
			`.${loader.load("trigger")}`
		) as HTMLDivElement;

		if (trigger && trigger.contains(event.target as HTMLElement)) {
			if (!menu) return;
			if (menu.classList.contains(loader.load("show"))) {
				menu.classList.remove(loader.load("show"));
			} else {
				menu.classList.add(loader.load("show"));

				const triggerRect = trigger?.getBoundingClientRect();
				const menuRect = menu?.getBoundingClientRect();
				gap = gap || 3;

				if (!menu || !trigger) return;

				if (
					triggerRect.bottom + gap + menuRect.height <
					window.innerHeight
				) {
					menu.style.top = `${gap + triggerRect.height}px`;
				} else {
					menu.style.top = `${-gap - menuRect.height}px`;
				}

				if (
					triggerRect.left + triggerRect.width / 2 + menuRect.width >
					window.innerWidth
				) {
					menu.style.left = `${
						triggerRect.width / 2 - menuRect.width
					}px`;
				} else {
					menu.style.left = `${triggerRect.width / 2}px`;
				}
			}
		} else if (menu && !menu.contains(event.target as HTMLElement)) {
			menu?.classList.remove(loader.load("show"));
		}
	};

	const setup = () => {
		const menu = ref.current?.querySelector(
			`.${loader.load("menu")}`
		) as HTMLDivElement;

		const trigger = ref.current?.querySelector(
			`.${loader.load("trigger")}`
		) as HTMLDivElement;

		if (!menu || !trigger) return;
		menu.style.minWidth = `${menuMinWidth}px`;
	};

	useEffect(() => {
		document.removeEventListener("click", onStart);
		document.addEventListener("click", onStart);
		setup();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={loader.load("dropdown")} ref={ref}>
			<div className={loader.load("menu")} data-testid="dropdown-menu">
				{items?.map((item, index) => (
					<div key={index} className={loader.load("item")}>
						<div
							className={loader.load("item-content")}
							data-testid={item.testId}
							onClick={() => {
								item.callback && item.callback();
								item.to && navigate(item.to);
							}}
						>
							{item.text}
						</div>
					</div>
				))}
			</div>
			<div className={loader.load("trigger")}>{children}</div>
		</div>
	);
};

export default Dropdown;
