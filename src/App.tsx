import { useState } from 'react'
import './App.css'
import Compile from "./Compile.tsx";
import Download from "./Download.tsx";

function App() {
  const [active, setActive] = useState<0 | 1>(0);


  return (
    <>
      <div className="tabs">
        <button
          className={active === 0 ? "active" : ""}
          onClick={() => setActive(0)}
        >
          Tab One
        </button>
        <button
          className={active === 1 ? "active" : ""}
          onClick={() => setActive(1)}
        >
          Tab Two
        </button>
      </div>

      <div className="content">
        {active === 0 && <Compile />}
        {active === 1 && <Download />}
      </div>
    </>
  )
}

export default App
