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
    element: <div>Secret page</div>,
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
