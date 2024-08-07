import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage";
import Main from "../layouts/Main";
import NotFound from "../pages/notFound";
import CreateTask from "../pages/create/createTask";
import Updatetask from "../pages/update/updatetask";


const MainRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Main />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/create" element={<CreateTask />} />
					<Route path="/update/:id" element={<Updatetask />} />
				</Route>

				<Route
					path="*"
					element={
						<NotFound />
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default MainRoutes;
