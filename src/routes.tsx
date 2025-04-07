import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Home } from './pages/Home.tsx';
import { Form } from './components/Form.tsx';
import { About } from './pages/About.tsx';
import { LoveStoryPage } from './pages/LoveStoryPage.tsx';

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
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/:slug",
          element: <LoveStoryPage />,
        }
      ],
    }
  ];
  
  const router = createBrowserRouter(routes);
  
  export default router;