import React from "react";
import styles from "./Home.module.scss";
import CssLoader from "utils/cssloader";
import DragBoard from "components/drag-board";
import Modal from "components/modal";
import Calendar from "components/calendar";
import Dropdown from "components/dropdown";
import Button from "components/buttons";

const loader = new CssLoader(styles);

const Home: React.FC = () => {
	const onChange = (ids: string[][]) => {
		console.log(ids);
	};

	const [chosenDate, setChosenDate] = React.useState<Date | null>(new Date());

	return (
		<div className={loader.load("home")}>
			Home page
			<div className={loader.load("test-drag-list")}>
				<DragBoard
					data={[
						[
							{ id: "item-1", node: <div>Item 1</div> },
							{ id: "item-2", node: <div>Item 2</div> },
							{ id: "item-3", node: <div>Item 3</div> },
							{ id: "item-4", node: <div>Item 4</div> },
						],
						[
							{ id: "item-5", node: <div>Item 5</div> },
							{ id: "item-6", node: <div>Item 6</div> },
							{ id: "item-7", node: <div>Item 7</div> },
						],
						[{ id: "test", node: <div>Test</div> }],
					]}
					onChange={onChange}
				/>
			</div>
			<Modal btnText="Open modal" btnSecondary>
				<div>{chosenDate?.toString()}</div>
				<Calendar
					date={chosenDate}
					onDateChange={(date: Date) => {
						setChosenDate(date);
					}}
				/>
			</Modal>
			<Dropdown
				items={[
					{
						to: "/",
						text: "Home",
					},
					{
						to: "/dashboard",
						text: "Dashboard",
					},
				]}
			>
				<Button />
			</Dropdown>
		</div>
	);
};

export default Home;
