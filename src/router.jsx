import { createBrowserRouter } from 'react-router'

import CreateAccount from './pages/CreateAccount'
import SignUp from './pages/SignUp'

const routes = createBrowserRouter([
  {
    path: '/Create',
    element: <CreateAccount />,
  },
  {
    path: '/Login',
    element: <SignUp />,
  },
])

export default routes
