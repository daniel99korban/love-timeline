import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Home } from './pages/Home.tsx';
import { Form } from './components/Form.tsx';
import { About } from './pages/About.tsx';
import { LoveStoryPage } from './pages/LoveStoryPage.tsx';
import { PrivacyPolicy } from './pages/PrivacyPolicy.tsx';
import { TermsOfUse } from './pages/TermsOfUse.tsx';

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
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/terms-of-use",
          element: <TermsOfUse />,
        }
      ],
    }
  ];
  
  const router = createBrowserRouter(routes);
  
  export default router;