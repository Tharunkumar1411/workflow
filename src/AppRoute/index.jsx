import { Route, Routes } from "react-router"
import { PAGES_ROUTES } from "./routes";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("../pages/Login"));
const DashboardPage = lazy(() => import("../pages/Dashboard"))

const AppRoute = () => {
    return(
        <Suspense fallback={<>Loading...</>}>
            <Routes>
                <Route path={PAGES_ROUTES.LOGIN} element={<LoginPage />}/>
                <Route path={PAGES_ROUTES.DASHBOARD} element={<DashboardPage />}/>
            </Routes>
        </Suspense>
    )
}

export default AppRoute;