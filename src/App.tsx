import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CommonLayout from "layout/common";
import Home from "pages/Home";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <CommonLayout page={<Login />} />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
