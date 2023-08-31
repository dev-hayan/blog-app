import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute"
import Home from "../pages/Home"
import RootLayout from "../layout/RootLayout"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Profile from "../pages/Profile"

const Routes = () => {
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/updateProfile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },

        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]

  const router = createBrowserRouter([...routesForAuthenticatedOnly])

  return <RouterProvider router={router} />
}

export default Routes
