import mountainBackground from './assets/mountain_background.jpg'

function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <img src={mountainBackground} alt="Background" className="h-full w-full object-cover" />
    </div>
  )
}

function App() {
  return (
    <>
      <Background />
      <div className="relative min-h-screen">
        <div className="glass absolute inset-y-20 left-1/2 -translate-x-1/2 w-5/6 rounded-lg text-white">
          <h1 className="p-64 text-4xl font-bold mb-4">Hi, I'm John Doe</h1>
        </div>
      </div>
    </>
  )
}

export default App
