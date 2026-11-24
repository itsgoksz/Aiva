/**
 * Aiva3DPlanet — Real WebGL 3D Celestial Planet (Active Theory / Namma Universe Engine)
 * 
 * Directly matches the iconic 3D planets from the Namma Universe products section:
 * 1. Procedural 3D GLSL Energy Shader: Fractal Brownian Motion (fbm) energy currents and lava veins.
 * 2. Atmospheric Fresnel Rim Glow: Luminous magenta/rose corona fading softly into deep space.
 * 3. Dual Concentric Orbital Rings: Majestic tilted rings with counter-rotating celestial speed.
 * 4. Orbital Stardust Swarm: 3D point cloud orbiting the planetary body.
 * 5. Interactive Spatial Parallax: Responsive 3D mouse tilt and stage metamorphosis pulse.
 */

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Aiva3DPlanetProps {
  stageIndex?: number;
  className?: string;
}

// ─── Procedural Planet Core Shaders ─────────────────────────

const planetVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vObjPos;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vObjPos = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const planetFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uSecondaryColor;
  uniform float uTime;
  uniform float uPulse;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vObjPos;
  varying vec3 vViewPosition;

  // Simplex 3D Noise Functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 4; ++i) {
      v += a * snoise(x);
      x = x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
    float smoothRim = smoothstep(0.42, 1.0, rim);

    vec3 spherePos = normalize(vObjPos) * 4.2;

    // Dynamic swirling energy streams on the planetary surface
    float energyFlow = fbm(spherePos * 1.35 - uTime * 0.12);
    float energyMask = smoothstep(0.32, 0.68, abs(energyFlow));

    vec3 baseCore = uSecondaryColor * 0.28;
    vec3 energyVeins = uColor * (1.0 - energyMask) * 2.6 * uPulse;
    vec3 atmosphereHalo = uColor * smoothRim * 2.3;

    vec3 finalColor = baseCore + energyVeins + atmosphereHalo;
    
    // Smooth atmospheric alpha falloff on planet edges
    float alpha = smoothstep(0.0, 0.42, dot(viewDir, vNormal));

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// ─── Planet Mesh Component ───────────────────────────────────

function PlanetMesh({ stageIndex = 0 }: { stageIndex: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const { clock, mouse } = useThree();

  const pulseRef = useRef(1.0);
  const prevStageRef = useRef(stageIndex);

  // Trigger an energy burst when stage changes
  if (prevStageRef.current !== stageIndex) {
    prevStageRef.current = stageIndex;
    pulseRef.current = 1.7; // Flare on stage metamorphosis
  }

  useFrame((_, delta) => {
    const time = clock.elapsedTime;

    // Decay the stage pulse back to resting 1.0
    pulseRef.current += (1.0 - pulseRef.current) * 0.05;

    // Rotate the planetary body
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.0012;
    }

    // Outer atmosphere breathing
    if (atmosphereRef.current) {
      const breath = 1.0 + Math.sin(time * 1.5) * 0.03;
      atmosphereRef.current.scale.set(breath, breath, breath);
    }

    // Counter-rotating orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.004;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.0025;
    }

    // Interactive mouse parallax tilt
    if (groupRef.current) {
      const targetRotX = (mouse.y * 0.18) + (stageIndex * 0.08);
      const targetRotY = (mouse.x * 0.22);
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * (delta * 3.5);
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * (delta * 3.5);
    }

    // Update GLSL shader uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uPulse.value = pulseRef.current;
    }
  });

  // Orbital Ring Points
  const ring1Geometry = useMemo(() => new THREE.RingGeometry(2.35, 2.48, 64), []);
  const ring2Geometry = useMemo(() => new THREE.RingGeometry(2.65, 2.74, 64), []);

  // Orbital Stardust Swarm (60 floating nodes)
  const stardustGeometry = useMemo(() => {
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.1 + (i % 7) * 0.15;
      const yOffset = ((i % 5) - 2) * 0.18;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = yOffset;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── 1. The Core Glowing 3D Planetary Sphere ── */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.65, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          uniforms={{
            uColor: { value: new THREE.Color("#E65C8E") },
            uSecondaryColor: { value: new THREE.Color("#A66B8E") },
            uTime: { value: 0 },
            uPulse: { value: 1.0 },
          }}
          vertexShader={planetVertexShader}
          fragmentShader={planetFragmentShader}
        />
      </mesh>

      {/* ── 2. Outer Atmospheric Corona Halo ── */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.88, 32, 32]} />
        <meshBasicMaterial
          color="#E65C8E"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ── 3. Inner Concentric Luminous Orbital Ring ── */}
      <mesh 
        ref={ring1Ref} 
        geometry={ring1Geometry} 
        rotation={[Math.PI / 2.8, 0.25, 0]}
      >
        <meshBasicMaterial
          color="#E65C8E"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ── 4. Outer Concentric Luminous Orbital Ring ── */}
      <mesh 
        ref={ring2Ref} 
        geometry={ring2Geometry} 
        rotation={[Math.PI / 2.8, 0.25, 0]}
      >
        <meshBasicMaterial
          color="#A66B8E"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ── 5. Orbital Stardust Node Swarm ── */}
      <points 
        geometry={stardustGeometry} 
        rotation={[Math.PI / 2.8, 0.25, 0]}
      >
        <pointsMaterial
          color="#FFFFFF"
          size={0.06}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ─── Main Exported Component ─────────────────────────────────

export default function Aiva3DPlanet({ stageIndex = 0, className = "" }: Aiva3DPlanetProps) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      {/* Background Volumetric Nebula Glow behind the 3D Planet */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[80px] sm:blur-[110px] pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle at center, rgba(230, 92, 142, 0.35) 0%, rgba(166, 107, 142, 0.15) 50%, transparent 75%)",
        }}
      />

      {/* Three.js 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        <PlanetMesh stageIndex={stageIndex} />
      </Canvas>
    </div>
  );
}
