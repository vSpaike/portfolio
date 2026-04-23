import { useState } from 'react';


function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="inline-block">
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 right-4 z-50 px-4 py-3 text-4xl text-white"
      >
        {menuOpen ? '✕' : '☰'}
      </button>
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 flex flex-col items-center justify-center gap-8">
          <a href="#about" className="text-white text-3xl hover:text-primary">À propos</a>
          <a href="#projects" className="text-white text-3xl hover:text-primary">Projets</a>
          <a href="#contact" className="text-white text-3xl hover:text-primary">Contact</a>
        </div>
      )}
    </div>
  );
}


export default BurgerMenu;