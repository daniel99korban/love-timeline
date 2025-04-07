import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './common/Footer';
import { Header } from './common/Header';

function App() {
  const location = useLocation();

  const staticRoutes = ["/", "/form", "/about"];
  
  const isLoveStory = !staticRoutes.includes(location.pathname);

  return (
    <>
      {!isLoveStory && <Header />}
      <Outlet />
      {!isLoveStory && <Footer />}
    </>
  );
}

export default App;