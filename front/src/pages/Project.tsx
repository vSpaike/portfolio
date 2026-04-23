import Background from "../components/Background"
import NavBar from "../components/NavBar"

function Projects(){
    return (
        <div className="relative min-h-screen ">
            <Background 
            particlesInteractive={false}
            />
            <NavBar />
            <div className="absolute inset-6 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl">
               <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                        Portfolio
                        </h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                        </div>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>       
    )
}
export default Projects;