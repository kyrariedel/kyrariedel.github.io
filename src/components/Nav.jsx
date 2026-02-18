import { useEffect, useState } from 'react';

const SECTIONS = ['about', 'experience', 'projects', 'mini-projects'];

export function Nav() {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const onScroll = () => {
      const headerOffset = 80;
      const scrollY = window.scrollY;
      let current = 'about';
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop - headerOffset;
        const height = el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          current = id;
          break;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="nav">
      <div className="nav-inner">
        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-link${active === id ? ' active' : ''}`}
            data-section={id}
          >
            {id === 'mini-projects' ? 'Mini-Projects' : id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
    </nav>
  );
}
