import Navbar from "../components/Navbar";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

export function RootLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner" />}
      <div className={`container ${isLoading && "loading"}`}>
        <Outlet />
      </div>
    </>
  );
}
