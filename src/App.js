import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css'
import Three from './componentThree/Three';
import { Car, Model } from './componentThree/car';
function App() {



  return (
    <Canvas id="canvas" shadows >
      <Suspense fallback={<></>}>
        <Three />  
        <Car/>      
      </Suspense>
    </Canvas>
  )
}

export default App