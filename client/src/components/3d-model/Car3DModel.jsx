import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect } from "react";

function CarModel() {
  const { scene } = useGLTF("/3d-model/porsche.glb");

  useEffect(() => {
    const meshesToHide = [
      "Object_4",
      "Object_34",
      "Object_35",
      "Object_36",
      "Object_37",
      "Object_38",
      "Object_39",
      "Object_40",
    ];

    scene.traverse((child) => {
      if (child.isMesh) {
        if (meshesToHide.includes(child.name)) {
          child.visible = false;
          return;
        }

        child.castShadow = true;
        child.receiveShadow = false;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={1.35}
      rotation={[0, -Math.PI / 4.5, 0.08]}
      position={[0, -0.25, 0]}
    />
  );
}

export default function Car3DModel() {
  return (
    <div className="w-full h-105 md:h-140 overflow-hidden">
      <Canvas
        camera={{ position: [-2, 1.4, 6], fov: 42 }}
        gl={{
          alpha: true,
          toneMappingExposure: 1.35,
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.4} />

        <directionalLight position={[5, 6, 4]} intensity={1.1} />

        <directionalLight position={[-4, 3, -3]} intensity={0.5} />

        <pointLight position={[2, 2, 3]} intensity={0.6} color="#f97316" />

        <Suspense fallback={null}>
          <CarModel />
          <Environment preset="night" background={false} />
        </Suspense>

        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.25}
          scale={8}
          blur={2.5}
          far={3}
        />

        <OrbitControls
          autoRotate
          autoRotateSpeed={0.8}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/3d-model/porsche.glb");
