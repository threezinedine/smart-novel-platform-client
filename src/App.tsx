import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CommonLayout from "layout/common";
import Home from "pages/Home";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import Register from "pages/Register";
import Admin from "pages/Admin";
import { AuthenticateLayout } from "features/authenticate";

const router = createBrowserRouter([
	{
		path: "/",
		element: <CommonLayout page={<Home />} />,
	},
	{
		path: "/login",
		element: <CommonLayout page={<Login />} />,
	},
	{
		path: "/dashboard",
		element: (
			<CommonLayout
				page={
					<AuthenticateLayout>
						<Dashboard />
					</AuthenticateLayout>
				}
			/>
		),
	},
	{
		path: "/register",
		element: <CommonLayout page={<Register />} />,
	},
	{
		path: "/admin",
		element: (
			<CommonLayout
				page={
					<AuthenticateLayout roles={["admin"]}>
						<Admin />
					</AuthenticateLayout>
				}
			/>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
