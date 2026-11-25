/**
 * AivaSolarSystemBackground — Namma Universe 3D Solar System & Planet-Flight Engine
 * 
 * Replicates the exact Namma Universe product section experience:
 * 1. Full 3D Solar System (Golden Sun, 7 delicate orbital rings, 7 glowing planetary orbs, deep starfield).
 * 2. Continuous Planet-to-Planet Camera Flight:
 *    - Tracks continuous scroll float (0.0 -> 6.0) as well as discrete stage targets.
 *    - Between modules, the camera pulls out cleanly along a parabolic space arc to reveal
 *      the full solar system, sweeps across the orbital plane, and dives into the next planet.
 * 3. Procedural 3D ActivePlanet (Exact Namma Universe Simplex Noise + Fresnel Rim Shader):
 *    - Smoothly transitions color and illuminates at the destination planet so cards visibly
 *      emerge directly out of the glowing 3D celestial body.
 * 4. Zero-GC & Mobile-First 60/120 FPS:
 *    - Pre-allocated Three.js scratch vectors, responsive particle/DPR budgets for mobile.
 */

import { useRef, useMemo, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AivaSolarSystemBackgroundProps {
  stageIndex: number;
  floatStageRef?: React.MutableRefObject<number>;
  className?: string;
  /** Pause WebGL render loop when offscreen to save GPU & battery */
  active?: boolean;
}

// ─── 7 Celestial Planets (One per Aiva Module, matching Namma Universe) ───
// Ordered evenly around the Sun (60° per orbit, decreasing theta = traveling right / clockwise revolution)
const ORBIT_STEP = (Math.PI * 2) / 6;
export const SOLAR_PLANETS = [
  { radius: 2.6, speed: 0.014, startAngle: Math.PI / 2 - ORBIT_STEP * 0, color: [0.95, 0.28, 0.52], baseSize: 15, name: "Aiva Core" },
  { radius: 4.0, speed: 0.014, startAngle: Math.PI / 2 - ORBIT_STEP * 1, color: [0.05, 0.88, 1.00], baseSize: 15, name: "Logic Matrix" },
  { radius: 5.5, speed: 0.014, startAngle: Math.PI / 2 - ORBIT_STEP * 2, color: [0.65, 0.42, 0.96], baseSize: 17, name: "Parity System" },
  { radius: 7.0, speed: 0.014, startAngle: Math.PI / 2 - ORBIT_STEP * 3, color: [0.10, 0.90, 0.48], baseSize: 15, name: "Telemetry Deck" },
  { radius: 8.5, speed: 0.014, startAngle: Math.PI / 2 - ORBIT_STEP * 4, color: [0.98, 0.44, 0.72], baseSize: 16, name: "28s Loop" },
  { radius: 10.0, speed: 0.014, startAngle: Math.PI / 2 - ORBIT_STEP * 5, color: [1.00, 0.78, 0.24], baseSize: 19, name: "Value ROI" },
  { radius: 11.6, speed: 0.014, startAngle: Math.PI / 2 - ORBIT_STEP * 6, color: [1.00, 0.36, 0.22], baseSize: 16, name: "Governance Shield" },
];

// Pre-allocated scratch vectors (Zero garbage collection in render loop)
const _activePos = new THREE.Vector3();
const _radialDir = new THREE.Vector3();
const _tangentDir = new THREE.Vector3();
const _camTargetPos = new THREE.Vector3();
const _camTargetLook = new THREE.Vector3();
const _color0 = new THREE.Color();
const _color1 = new THREE.Color();
const _blendedColor = new THREE.Color();
const _groupEuler = new THREE.Euler(-0.20, 0.08, 0.06, "XYZ");

function getPlanetOrbitPosition(
  planet: typeof SOLAR_PLANETS[number],
  elapsedTime: number,
  out: THREE.Vector3
) {
  const angle = planet.startAngle + elapsedTime * planet.speed;
  out.set(
    Math.cos(angle) * planet.radius,
    Math.sin(angle) * planet.radius * 0.15,
    Math.sin(angle) * planet.radius
  );
  return out;
}

// ─── GLSL Shaders (Exact Namma Universe Optical Core + Atmospheric Glow) ───

const celestialVertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aIsSun;
  attribute float aIsActive;

  varying vec3 vColor;
  varying float vIsSun;
  varying float vIsActive;

  uniform float uPixelRatio;

  void main() {
    vColor = aColor;
    vIsSun = aIsSun;
    vIsActive = aIsActive;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float dist = max(-mvPosition.z, 0.35);
    float sizeAttenuation = 150.0 / dist;

    gl_PointSize = aSize * sizeAttenuation * uPixelRatio * 0.5;
    if (aIsActive > 0.5) {
      gl_PointSize *= 1.18;
    }
    gl_PointSize = min(gl_PointSize, 520.0);
  }
`;

const celestialFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vIsSun;
  varying float vIsActive;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float core = 1.0 - smoothstep(0.0, vIsSun > 0.5 ? 0.18 : 0.13, dist);
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, vIsSun > 0.5 ? 2.2 : 2.8);

    // Active planet acts as soft outer atmospheric halo around the 3D ActivePlanetSphere
    float alpha = vIsActive > 0.5 ? (glow * 0.45) : mix(glow * 0.52, 1.0, core);
    vec3 color = mix(vColor, vec3(1.0), core * (vIsActive > 0.5 ? 0.35 : 0.85));

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── 1. Glowing Sun & Orbiting Celestial Orbs ────────────────

function CelestialBodies({
  stageIndex,
  smoothIndexRef,
}: {
  stageIndex: number;
  smoothIndexRef: React.MutableRefObject<number>;
}) {
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const lastActiveRef = useRef<number>(stageIndex);
  const { clock } = useThree();
  const totalBodies = SOLAR_PLANETS.length + 1;

  const { geometry } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(totalBodies * 3);
    const col = new Float32Array(totalBodies * 3);
    const siz = new Float32Array(totalBodies);
    const sunArr = new Float32Array(totalBodies);
    const activeArr = new Float32Array(totalBodies);

    // 0: Central Radiant Golden Sun
    pos[0] = 0;
    pos[1] = 0;
    pos[2] = 0;
    col[0] = 1.0;
    col[1] = 0.85;
    col[2] = 0.22;
    siz[0] = 56.0;
    sunArr[0] = 1.0;
    activeArr[0] = 0.0;

    // 1..7: Orbiting Planets
    SOLAR_PLANETS.forEach((planet, idx) => {
      const i = idx + 1;
      const angle = planet.startAngle;
      pos[i * 3] = Math.cos(angle) * planet.radius;
      pos[i * 3 + 1] = Math.sin(angle) * planet.radius * 0.15;
      pos[i * 3 + 2] = Math.sin(angle) * planet.radius;

      col[i * 3] = planet.color[0];
      col[i * 3 + 1] = planet.color[1];
      col[i * 3 + 2] = planet.color[2];

      siz[i] = planet.baseSize;
      sunArr[i] = 0.0;
      activeArr[i] = idx === stageIndex ? 1.0 : 0.0;
    });

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(siz, 1));
    geo.setAttribute("aIsSun", new THREE.BufferAttribute(sunArr, 1));
    geo.setAttribute("aIsActive", new THREE.BufferAttribute(activeArr, 1));

    return { geometry: geo };
  }, [totalBodies]);

  useFrame(() => {
    if (!geoRef.current) return;
    const elapsed = clock.elapsedTime;
    const posAttr = geoRef.current.attributes.position as THREE.BufferAttribute;
    const activeAttr = geoRef.current.attributes.aIsActive as THREE.BufferAttribute;
    const activeRounded = Math.round(smoothIndexRef.current);
    const activeChanged = activeRounded !== lastActiveRef.current;

    for (let idx = 0; idx < SOLAR_PLANETS.length; idx++) {
      const i = idx + 1;
      getPlanetOrbitPosition(SOLAR_PLANETS[idx], elapsed, _activePos);
      posAttr.setXYZ(i, _activePos.x, _activePos.y, _activePos.z);
      if (activeChanged) {
        activeAttr.setX(i, idx === activeRounded ? 1.0 : 0.0);
      }
    }

    posAttr.needsUpdate = true;
    if (activeChanged) {
      lastActiveRef.current = activeRounded;
      activeAttr.needsUpdate = true;
    }
  });

  const uniforms = useMemo(
    () => ({
      uPixelRatio: {
        value:
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2)
            : 1,
      },
    }),
    []
  );

  return (
    <points>
      <bufferGeometry ref={geoRef} {...geometry} />
      <shaderMaterial
        vertexShader={celestialVertexShader}
        fragmentShader={celestialFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── 2. Namma Universe Procedural 3D ActivePlanet Sphere ─────
// Exact Simplex 3D Noise FBM energy sphere from ParticleField.tsx so the focal
// planet feels physically alive as the camera zooms in and the card emerges out of it.

function ActivePlanetSphere({
  smoothIndexRef,
}: {
  smoothIndexRef: React.MutableRefObject<number>;
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { clock } = useThree();

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(...SOLAR_PLANETS[0].color) },
      uTime: { value: 0 },
      uOpacity: { value: 1.0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    const dt = Math.min(delta, 0.1);
    const elapsed = clock.elapsedTime;
    const idx = Math.max(0, Math.min(SOLAR_PLANETS.length - 1, smoothIndexRef.current));

    const idx0 = Math.floor(idx);
    const idx1 = Math.min(idx0 + 1, SOLAR_PLANETS.length - 1);
    const rawT = idx - idx0;

    // Fade cleanly to 0 across mid-flight (rawT = 0.5) before switching sphere to next planet,
    // eliminating any visible position pop/teleport on clockwise or anticlockwise transitions.
    const flightEnvelope = Math.max(0, 1.0 - Math.sin(rawT * Math.PI) * 1.45);
    const nearestIdx = Math.round(idx);
    const pNearest = SOLAR_PLANETS[nearestIdx];
    getPlanetOrbitPosition(pNearest, elapsed, _activePos);
    meshRef.current.position.copy(_activePos);

    // Smooth color blend between planets
    _color0.setRGB(...(SOLAR_PLANETS[idx0].color as [number, number, number]));
    _color1.setRGB(...(SOLAR_PLANETS[idx1].color as [number, number, number]));
    _blendedColor.copy(_color0).lerp(_color1, rawT);

    const targetScale = 0.92 + flightEnvelope * 0.28;
    meshRef.current.scale.setScalar(targetScale);

    meshRef.current.rotation.y += dt * 0.14;
    meshRef.current.rotation.x += dt * 0.05;

    materialRef.current.uniforms.uColor.value.copy(_blendedColor);
    materialRef.current.uniforms.uTime.value = elapsed;
    materialRef.current.uniforms.uOpacity.value = flightEnvelope;
  });

  const fragmentShaderSource = useMemo(
    () => `
          uniform vec3 uColor;
          uniform float uTime;
          uniform float uOpacity;
          varying vec3 vNormal;
          varying vec3 vObjPos;
          varying vec3 vViewPosition;

          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
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
            float v = 0.0; float a = 0.5; vec3 shift = vec3(100);
            for (int i = 0; i < ${isMobile ? 2 : 4}; ++i) { v += a * snoise(x); x = x * 2.0 + shift; a *= 0.5; }
            return v;
          }

          void main() {
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
            float smoothRim = smoothstep(0.45, 1.0, fresnel);

            vec3 spherePos = normalize(vObjPos) * 4.5;
            float cracks = fbm(spherePos * 1.4 - uTime * 0.09);
            float energyMask = smoothstep(0.35, 0.62, abs(cracks));

            vec3 baseColor = uColor * 0.18;
            vec3 energyColor = uColor * (1.0 - energyMask) * 2.1;
            vec3 rimColor = mix(uColor, vec3(1.0), 0.35) * smoothRim * 2.2;

            vec3 finalColor = baseColor + energyColor + rimColor;
            float alpha = smoothstep(0.0, 0.38, dot(viewDir, vNormal)) * uOpacity;

            gl_FragColor = vec4(finalColor, alpha);
          }
    `,
    [isMobile]
  );

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.42, isMobile ? 24 : 40, isMobile ? 24 : 40]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vObjPos;
          varying vec3 vViewPosition;
          void main() {
            vObjPos = position;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={fragmentShaderSource}
      />
    </mesh>
  );
}

// ─── 3. Delicate Concentric Orbital Rings ────────────────────

function SolarSystemRings({
  smoothIndexRef,
}: {
  smoothIndexRef: React.MutableRefObject<number>;
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const matRefs = useRef<(THREE.LineBasicMaterial | null)[]>([]);
  const ringData = useMemo(() => {
    const segments = isMobile ? 64 : 96;
    return SOLAR_PLANETS.map((planet) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(theta) * planet.radius,
            Math.sin(theta) * planet.radius * 0.15,
            Math.sin(theta) * planet.radius
          )
        );
      }
      return {
        geom: new THREE.BufferGeometry().setFromPoints(points),
        color: new THREE.Color(planet.color[0], planet.color[1], planet.color[2]),
      };
    });
  }, [isMobile]);

  useFrame(() => {
    const active = smoothIndexRef.current;
    for (let idx = 0; idx < matRefs.current.length; idx++) {
      const mat = matRefs.current[idx];
      if (!mat) continue;
      const proximity = Math.max(0, 1 - Math.abs(idx - active));
      mat.opacity = 0.08 + proximity * 0.26;
    }
  });

  return (
    <group>
      {ringData.map(({ geom, color }, idx) => (
        <line key={`orbit-${idx}`} geometry={geom}>
          <lineBasicMaterial
            ref={(el) => {
              matRefs.current[idx] = el;
            }}
            color={color}
            transparent
            opacity={idx === 0 ? 0.34 : 0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  );
}

// ─── 4. Twinkling Diamond Starfield ──────────────────────────

function SolarSystemStarfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const { positions, colors, sizes } = useMemo(() => {
    const count = isMobile ? 700 : 2400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const white = new THREE.Color("#FFFFFF");
    const warmGold = new THREE.Color("#FBBF24");
    const cyan = new THREE.Color("#38BDF8");
    const violet = new THREE.Color("#A66B8E");

    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.sqrt(Math.random()) * 34.0;
      const theta = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * (radius * 0.45 + 3.0);

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      const rand = Math.random();
      const chosenColor =
        rand < 0.65 ? white : rand < 0.82 ? warmGold : rand < 0.92 ? cyan : violet;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      siz[i] = rand < 0.9 ? 0.035 + Math.random() * 0.03 : 0.075 + Math.random() * 0.05;
    }

    return { positions: pos, colors: col, sizes: siz };
  }, [isMobile]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.78}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── 5. Namma Universe Planet-to-Planet Camera Flight Engine ─

function CameraFlightController({
  stageIndex,
  floatStageRef,
  smoothIndexRef,
}: {
  stageIndex: number;
  floatStageRef?: React.MutableRefObject<number>;
  smoothIndexRef: React.MutableRefObject<number>;
}) {
  const { camera, mouse, clock, size } = useThree();
  const smoothMouse = useRef({ x: 0, y: 0 });
  const isFirstFrame = useRef(true);
  const initialStageRef = useRef(stageIndex);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const elapsed = clock.elapsedTime;
    const isPortrait = size.width < size.height;
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(pointer: coarse)")?.matches || window.innerWidth < 768);

    // Single smooth orbital index filter: eliminates double-damped chord lag & reverse-scroll wobble
    const rawTarget = floatStageRef ? floatStageRef.current : initialStageRef.current;
    if (isFirstFrame.current) {
      smoothIndexRef.current = rawTarget;
    } else {
      const indexLerp = 1 - Math.exp(-10.5 * dt);
      smoothIndexRef.current += (rawTarget - smoothIndexRef.current) * indexLerp;
    }

    // Disable pointer parallax on touch screens so taps/swipes never jolt camera look/position
    if (isTouchDevice) {
      smoothMouse.current.x = 0;
      smoothMouse.current.y = 0;
    } else {
      const mouseLerp = 1 - Math.exp(-3.5 * dt);
      smoothMouse.current.x += (mouse.x - smoothMouse.current.x) * mouseLerp;
      smoothMouse.current.y += (mouse.y - smoothMouse.current.y) * mouseLerp;
    }

    const idx = Math.max(0, Math.min(SOLAR_PLANETS.length - 1, smoothIndexRef.current));
    const index0 = Math.floor(idx);
    const index1 = Math.min(index0 + 1, SOLAR_PLANETS.length - 1);
    const t = idx - index0;

    // Polar orbital interpolation moves clockwise (right) on scroll down, anticlockwise (left) on scroll up
    const p0 = SOLAR_PLANETS[index0];
    const p1 = SOLAR_PLANETS[index1];
    const angle0 = p0.startAngle + elapsed * p0.speed;
    const angle1 = p1.startAngle + elapsed * p1.speed;
    const smoothAngle = angle0 + (angle1 - angle0) * t;
    const smoothRadius = p0.radius + (p1.radius - p0.radius) * t;

    _camTargetLook
      .set(
        Math.cos(smoothAngle) * smoothRadius,
        Math.sin(smoothAngle) * smoothRadius * 0.15,
        Math.sin(smoothAngle) * smoothRadius
      )
      .applyEuler(_groupEuler);

    _radialDir
      .set(Math.cos(smoothAngle), 0, Math.sin(smoothAngle))
      .applyEuler(_groupEuler)
      .normalize();
    _tangentDir
      .set(Math.sin(smoothAngle), 0, -Math.cos(smoothAngle))
      .applyEuler(_groupEuler)
      .normalize();

    const baseDistZ = isPortrait ? 5.6 : 3.6;
    const flightArcPullback = Math.sin(t * Math.PI) * (isPortrait ? 5.6 : 4.8);
    const camDist = baseDistZ + flightArcPullback;
    const camHeightY = (isPortrait ? 1.85 : 0.55) + Math.sin(t * Math.PI) * 1.4;

    _camTargetPos
      .copy(_camTargetLook)
      .addScaledVector(_radialDir, camDist)
      .addScaledVector(_tangentDir, smoothMouse.current.x * 1.15);
    _camTargetPos.y += camHeightY + smoothMouse.current.y * 0.85;

    _camTargetLook.addScaledVector(_tangentDir, smoothMouse.current.x * 0.35);
    _camTargetLook.y += smoothMouse.current.y * 0.25;

    // Exact camera tracking on the damped polar curve ensures position and lookAt stay locked together
    camera.position.copy(_camTargetPos);
    camera.lookAt(_camTargetLook);
    isFirstFrame.current = false;
  });

  return null;
}

// ─── Main Exported Component ─────────────────────────────────

const AivaSolarSystemBackground = memo(
  function AivaSolarSystemBackground({
    stageIndex,
    floatStageRef,
    className = "",
    active = true,
  }: AivaSolarSystemBackgroundProps) {
    const smoothIndexRef = useRef<number>(stageIndex);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return (
      <div className={`w-full h-full pointer-events-none select-none overflow-hidden ${className}`}>
        {/* Soft deep-space vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 32%, rgba(10, 5, 8, 0.78) 100%)",
          }}
        />

        <Canvas
          frameloop={active ? "always" : "never"}
          onCreated={({ gl, scene, camera }) => {
            gl.compile(scene, camera);
            gl.render(scene, camera);
          }}
          camera={{ position: [0, 3.2, 16], fov: 48, near: 0.1, far: 90 }}
          dpr={
            typeof window !== "undefined"
              ? isMobile
                ? 1
                : Math.min(window.devicePixelRatio || 1, 1.5)
              : 1
          }
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full"
        >
          <CameraFlightController
            stageIndex={stageIndex}
            floatStageRef={floatStageRef}
            smoothIndexRef={smoothIndexRef}
          />
          <group rotation={[-0.20, 0.08, 0.06]}>
            <CelestialBodies stageIndex={stageIndex} smoothIndexRef={smoothIndexRef} />
            <ActivePlanetSphere smoothIndexRef={smoothIndexRef} />
            <SolarSystemRings smoothIndexRef={smoothIndexRef} />
          </group>
          <SolarSystemStarfield />
        </Canvas>
      </div>
    );
  },
  (prev, next) =>
    prev.active === next.active &&
    prev.floatStageRef === next.floatStageRef &&
    prev.className === next.className
);

export default AivaSolarSystemBackground;
