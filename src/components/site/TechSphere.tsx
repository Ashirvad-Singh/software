import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

const techStack = [
  "React", "Next.js", "TypeScript", "Tailwind", "Node.js",
  "MongoDB", "PostgreSQL", "Firebase", "Flutter", "React Native",
  "AWS", "Docker", "Figma", "GraphQL", "REST API",
  "WordPress", "Shopify", "Vite", "GSAP", "Three.js"
]

function Word({ children, position, ...props }: any) {
  const fontProps = {
    font: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false
  }
  const ref = useRef<any>(null)
  
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion)
    }
  })
  
  return (
    <Text ref={ref} position={position} {...props} {...fontProps} color="#3b82f6">
      {children}
    </Text>
  )
}

function Cloud({ count = 8, radius = 20 }) {
  const words = useMemo(() => {
    const temp = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    let itemIndex = 0
    
    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) {
        if (itemIndex >= techStack.length) itemIndex = 0 // loop text
        temp.push([
          new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)),
          techStack[itemIndex]
        ])
        itemIndex++
      }
    }
    return temp
  }, [count, radius])

  const groupRef = useRef<any>(null)
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
      groupRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos}>
          {word}
        </Word>
      ))}
    </group>
  )
}

export default function TechSphere() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 35], fov: 90 }}>
        <fog attach="fog" args={['#09090b', 0, 80]} />
        <ambientLight intensity={1} />
        <Cloud count={4} radius={18} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
