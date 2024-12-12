// NODE MODULES...
import { createBrowserRouter } from 'react-router-dom';

// COMPONENTS...
import App from '../App';
import Register from '../pages/Register';
import Login from '../pages/Login';

// LOADERS...
import registerLoader from './loaders/registerLoader';
import loginLoader from './loaders/loginLoader';

// ACTIONS...
import registerAction from './actions/registerAction';
import loginAction from './actions/loginAction';

// ROUTER...
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />,
    loader: registerLoader,
    action: registerAction,
  },
  {
    path: '/login',
    element: <Login />,
    loader: loginLoader,
    action: loginAction,
  },
]);

export default router;
