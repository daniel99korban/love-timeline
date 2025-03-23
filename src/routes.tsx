import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Home } from './pages/Home.tsx';
import { Form } from './components/Form.tsx';

const routes = [
  
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/form",
          element: <Form />,
        }
      ],
    }
  ];
  
  const router = createBrowserRouter(routes);
  
  export default router;