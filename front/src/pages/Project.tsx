import img_Portfolio from "../assets/portfolio_img.jpg"
import img_Button from "../assets/github-icon.svg"

import Background from "../components/Background"
import NavBar from "../components/NavBar"
import Card from "../components/Card"

function Projects(){
    return (
        <div className="relative min-h-screen ">
            <Background 
            particlesInteractive={false}
            />
            <NavBar />
            <div className="absolute inset-6 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-y-auto p-16">
                <div className="grid grid-cols-2 gap-x-32 gap-y-32 max-w-4xl mx-auto">                    
                    <Card 
                        img={img_Portfolio}
                        img_button={img_Button}
                        description=""
                        title="Multi-Agent pentest (en cours)"
                        list_badge={['test','deux']}
                        button_link="https://github.com/vSpaike/multi-agents-pentest"
                    />

                    <Card 
                        img={img_Portfolio}
                        img_button={img_Button}
                        description=""
                        title="Portfolio"
                        list_badge={['test','deux']}
                        button_link="https://github.com/vSpaike/portfolio"
                    />

                    <Card 
                        img={img_Portfolio}
                        alt_img="Blockchain"
                        img_button={img_Button}
                        description=""
                        title="Todo list blockchain"
                        list_badge={['test','deux']}
                        button_link="https://github.com/vSpaike/blockchain-todo-list"
                    />
                </div>
            </div>
        </div>       
    )
}
export default Projects;