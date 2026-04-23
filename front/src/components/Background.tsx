import Particules from "./Particules";
import type { StarConfig } from "./Particules";

function Background({particlesInteractive, backgroundStar}: {particlesInteractive: boolean; backgroundStar?: StarConfig[]}) {
  return (  
    <div className="fixed inset-0 z-0 bg-black">
    <Particules
      interactionEnabled={particlesInteractive}
      stars={backgroundStar} 
    />
  </div>
  )
}

export default Background;
