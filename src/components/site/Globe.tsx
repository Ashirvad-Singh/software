import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import ThreeGlobe from "three-globe"

// Custom Globe component using three-globe
function GlobeObject() {
  const globeRef = useRef<any>(null)

  useEffect(() => {
    if (!globeRef.current) return

    const Globe = new ThreeGlobe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#3b82f6")
      .atmosphereAltitude(0.15)

    // Add some random arcs to simulate data flow
    const N = 20
    const arcsData = [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: ['#3b82f6', '#60a5fa', '#93c5fd'][Math.floor(Math.random() * 3)]
    }))

    Globe.arcsData(arcsData)
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(4)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(1000)

    // Add globe to the ref
    globeRef.current.add(Globe)

    return () => {
      // Cleanup
      if (globeRef.current) {
        globeRef.current.remove(Globe)
      }
    }
  }, [])

  useFrame((_state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1
    }
  })

  return <group ref={globeRef} />
}

export default function Globe() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 300], fov: 45 }}>
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight position={[100, 100, 200]} intensity={2} color="#ffffff" />
        <GlobeObject />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
