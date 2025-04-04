import { Route, Routes } from "react-router"
import { PAGES_ROUTES } from "./routes";
import { lazy, Suspense } from "react";
import PrivateLayout from "./PrivateLayout";
import Loader from "../components/Loader";

const AuthPage = lazy(() => import("../pages/Login"));
const DashboardPage = lazy(() => import("../pages/Dashboard"))
const WorkFlowPage = lazy(() => import("../pages/WorfkFlow"))

const AppRoute = () => {
    return(
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={PAGES_ROUTES.LOGIN} element={<AuthPage />}/>

                <Route element={<PrivateLayout />}>
                    <Route path={PAGES_ROUTES.DASHBOARD} element={<DashboardPage />}/>
                    <Route path={`${PAGES_ROUTES.WORKFLOW}/:id`} element={<WorkFlowPage />}/>
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRoute;