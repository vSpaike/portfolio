import Particles from '../components/Particles';
import NavBar from '../components/NavBar';

function Background() {
  const specialStarPosition: [number, number, number] = [0.2, -0.45, 0.1];

  const handleSpecialStarClick = () => {
    window.open("/about", "_blank");
  };

  return (  
    <div className="fixed inset-0 z-0 bg-black">
    <Particles
      particleCount={300}
      particleSpread={10}
      speed={0.08}
      particleColors={["#ffffff"]}
      moveParticlesOnHover
      particleHoverFactor={1.2}
      alphaParticles={false}
      particleBaseSize={130}
      sizeRandomness={0.9}
      cameraDistance={44}
      disableRotation
      enableSpecialStar={true}
      specialStarPosition={specialStarPosition}
      specialStarSize={24}
      onSpecialStarClick={handleSpecialStarClick}
      specialStarTitle="About Me"
    />
  </div>
  )
}

function App(){
  return (
    <div className="relative min-h-screen ">
      <Background />
      <div className="relative z-20">
        <NavBar />
      </div>
      <div className="relative z-20 flex items-center justify-center gap-10 mt-20">
      </div>
    </div>
  )
}

export default App
