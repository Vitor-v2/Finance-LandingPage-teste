import { createBrowserRouter, RouterProvider } from 'react-router'

import { AuthContextProvider } from './context/auth'
import CreateAccount from './pages/CreateAccount'
import HomePage from './pages/HomePage'
import Login from './pages/Login'

const routes = createBrowserRouter([
  {
    element: <AuthContextProvider />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/Create',
        element: <CreateAccount />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={routes} />
}

export default App
