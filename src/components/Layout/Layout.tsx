import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.css';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on every navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="layout">
      <Header />
      <main className="layout__main page-enter" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
