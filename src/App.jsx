import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  const route = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
