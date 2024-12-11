// NODE MODULES...
import { createBrowserRouter } from 'react-router-dom';

// COMPONENTS...
import App from '../App';
import Register from '../pages/Register';

// ACTIONS...
import registerAction from './actions/registerAction';

// ROUTER...
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction,
  },
]);

export default router;
