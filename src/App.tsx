import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CommonLayout from "layout/common";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import Dashboard from "pages/Dashboard";
import Register from "pages/Register/Register";
import Admin from "pages/Admin";
import About from "pages/About/About";
import Profile from "pages/Profile/Profile";
import Todo from "pages/Todo";

const router = createBrowserRouter([
	{
		path: "/",
		element: <CommonLayout page={<Home />} />,
	},
	{
		path: "/login",
		element: <CommonLayout registerForm page={<Login />} />,
	},
	{
		path: "/dashboard",
		element: <CommonLayout auth page={<Dashboard />} />,
	},
	{
		path: "/register",
		element: <CommonLayout registerForm page={<Register />} />,
	},
	{
		path: "/admin",
		element: <CommonLayout auth roles={["admin"]} page={<Admin />} />,
	},
	{
		path: "/profile",
		element: <CommonLayout auth page={<Profile />} />,
	},
	{
		path: "/about",
		element: <CommonLayout page={<About />} />,
	},
	{
		path: "/todo",
		element: <CommonLayout auth page={<Todo />} />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
