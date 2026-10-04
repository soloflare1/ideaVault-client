
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Ideas from "../pages/Ideas";
import IdeaDetails from "../pages/IdeaDetails";
import AddIdea from "../pages/AddIdea";
import MyIdeas from "../pages/MyIdeas"; 
import MyInteractions from "../pages/MyInteractions";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/ideas", element: <Ideas /> },
      { path: "/ideas/:id", element: <IdeaDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/add-idea",
        element: (
          <PrivateRoute>  
            <AddIdea />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-ideas",
        element: (
          <PrivateRoute>
            <MyIdeas />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-interactions",
        element: (
          <PrivateRoute>
            <MyInteractions />
          </PrivateRoute>
        ),
      },
      {
        path: "my-activity",
        element: (
          <PrivateRoute>
            <MyInteractions />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

