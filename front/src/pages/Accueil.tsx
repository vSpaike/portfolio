import Particles from '../components/Particules';
import NavBar from '../components/NavBar';

function Background() {
  return (  
    <div className="fixed inset-0 z-0 bg-black">
    <Particles
      stars={[
        {
        position: [0.25, -0.35, 0],
        size: 50,
        title: "Mon étoile 1",
        onClick: () => console.log("Étoile 1 cliquée")
        },
        {
          position: [-0.3, 0.4, 0],
          size: 30,
          title: "Mon étoile 2",
          onClick: () => console.log("Étoile 2 cliquée")
        }
      ]}
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
