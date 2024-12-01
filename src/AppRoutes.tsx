import {ErrorBoundary} from "react-error-boundary";
import NotFound from "./page/NotFound";
import Login from "./page/Login";
import Register from "./page/Register";
import Calendar from "./page/Calendar";
import {Route, Routes} from "react-router-dom";


const AppRoutes = () => {
    return (
        <ErrorBoundary fallback={<NotFound />}>
            <Routes>
                <Route path={"/"} element={<Calendar />} />
                <Route path={"*"} element={<NotFound />} />
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/registry"} element={<Register/>}/>
            </Routes>
        </ErrorBoundary>
    )
}

export default AppRoutes;