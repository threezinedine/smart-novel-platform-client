import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const renderWithMemoryRoute = (element: JSX.Element) => {
	render(
		<MemoryRouter initialEntries={["/"]}>
			<Routes>
				<Route path="/" element={element} />
				<Route path="/dashboard" element={<div>Dashboard</div>} />
			</Routes>
		</MemoryRouter>
	);
};

export default renderWithMemoryRoute;
