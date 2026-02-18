import { Nav } from './components/Nav';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { MiniProjects } from './components/MiniProjects';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <About />
        <Experience />
        <Projects />
        <MiniProjects />
      </main>
      <footer className="site-footer">
        Built with React and Vite, deployed with GitHub Pages. Layout inspired by: <a href="https://brittanychiang.com/" target="_blank" rel="noopener noreferrer">https://brittanychiang.com/</a>.
      </footer>
    </>
  );
}
