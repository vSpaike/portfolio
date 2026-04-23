import Background from '../components/Background';
import NavBar from '../components/NavBar';
import DrawerLeft from '../components/AboutMe';
import { useState } from 'react';

function BackgroundWithStar({isDrawerOpen, onOpenDrawer}: {isDrawerOpen: boolean; onOpenDrawer: () => void;}) {
  return (  
      <Background
        particlesInteractive={!isDrawerOpen}
        backgroundStar={[
        {
          position: [0.5, -1.5, -3],
          size: 36,
          title: "Mercure",
          onClick: () => console.log("Mercure cliquée"),
          background: "rgba(210,200,190,1) 0%, rgba(173,163,152,0.95) 45%, rgba(120,112,102,0.45) 75%, rgba(120,112,102,0) 100%"
        },
        {
          position: [-2, -0.6, 3],
          size: 48,
          title: "Vénus",
          onClick: () => console.log("Vénus cliquée"),
          background: "rgba(240,210,140,1) 0%, rgba(214,176,108,0.95) 45%, rgba(168,130,76,0.5) 75%, rgba(168,130,76,0) 100%"
        },
        {
          // My Project
          position: [1.3, 0.2, 6],
          size: 52,
          title: "Terre",
          onClick: onOpenDrawer,
          background: "rgba(78,148,255,1) 0%, rgba(58,124,224,0.95) 35%, rgba(74,178,109,0.65) 65%, rgba(74,178,109,0) 100%"        
        },
        {
          // Contact
          position: [-0.3, 2.3, -10],
          size: 42,
          title: "Mars",
          onClick: () => console.log("Mars cliquée"),
          background: "rgba(218,107,77,1) 0%, rgba(192,83,56,0.95) 45%, rgba(143,52,36,0.5) 75%, rgba(143,52,36,0) 100%"
        }
      ]}
      />
  )
}

function Home(){
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="relative min-h-screen ">
      <BackgroundWithStar
        isDrawerOpen={isDrawerOpen}
        onOpenDrawer={handleOpenDrawer}
      />
      <DrawerLeft isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      <div className="relative z-20">
        {/* <a className="text-white px-4 inline-block py-5 text-2xl hover:text-gray-400" href="./">vSpyke</a> */}
        <NavBar />
      </div>
    </div>
  )
}

export default Home;
