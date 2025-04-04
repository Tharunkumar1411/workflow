import React from "react";
import useAuthStore from "../store/Auth";
import { Navigate, Outlet } from "react-router";
import { PAGES_ROUTES } from "./routes";

const PrivateLayout = () => {
    const {authDetails} = useAuthStore(state => state);

    return authDetails?.accessToken ? (
        <Outlet />
      ) : (
        <Navigate to={PAGES_ROUTES.LOGIN} />
      );
}

export default PrivateLayout;