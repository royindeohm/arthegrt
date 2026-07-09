import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

function AppWithRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      const base = import.meta.env.BASE_URL.replace(/\/$/, '');
      let path = redirect;
      if (path.startsWith(base)) {
        path = path.substring(base.length);
      }
      if (path && path !== '/') {
        navigate(path, { replace: true });
      }
    }
  }, [navigate]);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <AppWithRedirect />
    </BrowserRouter>
  </StrictMode>
);
