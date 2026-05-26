import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import Projects from '../pages/Projects/Projects';
import ProjectPage from '../pages/Projects/ProjectPage';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Press from '../pages/Press/Press';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'work', element: <Projects /> },
      { path: 'work/:slug', element: <ProjectPage /> },
      { path: 'about', element: <About /> },
      { path: 'press', element: <Press /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);
