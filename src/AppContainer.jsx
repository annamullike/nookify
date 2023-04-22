import React from "react";
import App from "./App"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  link,
} from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/secret",
    element: <div>HEY BITCH</div>,
  },
  {
    path: "/",
    element: <App/>,
  }
]);

function AppContainer() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default AppContainer;
