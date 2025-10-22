import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import NewBlog from "./components/NewBlog.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <div>Admin Home</div> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "blog",
        element: <ProtectedRoutes />,
        children: [{ path: "create", element: <NewBlog /> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  </StrictMode>
);
