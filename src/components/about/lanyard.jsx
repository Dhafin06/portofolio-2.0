import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

import cardGLB from "../../assets/models/card.glb";
import lanyardTexture from "../../assets/images/lanyard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const FRONT_UV_RECT = {
  x: 0,
  y: 0,
  w: 0.5,
  h: 0.755,
};

const BACK_UV_RECT = {
  x: 0.5,
  y: 0,
  w: 0.5,
  h: 0.757,
};

function Band({
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = lanyardTexture,
  lanyardWidth = 1,
  isMobile = false,
}) {
  const band = useRef();
  const fixed = useRef();
  const joint1 = useRef();
  const joint2 = useRef();
  const joint3 = useRef();
  const card = useRef();

  const vec = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();

  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB);

  const lanyardTextureSource = useTexture(lanyardImage);

  const lanyardTexture = useMemo(() => {
    const texture = lanyardTextureSource.clone();

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    return texture;
  }, [lanyardTextureSource]);

  const frontTexture = useTexture(frontImage || BLANK_PIXEL);
  const backTexture = useTexture(backImage || BLANK_PIXEL);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;

    if (!frontImage && !backImage) {
      return baseMap;
    }

    const baseImage = baseMap.image;

    const canvas = document.createElement("canvas");

    canvas.width = baseImage.width;
    canvas.height = baseImage.height;

    const context = canvas.getContext("2d");

    if (!context) {
      return baseMap;
    }

    context.drawImage(
      baseImage,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const drawImage = (image, rect) => {
      if (!image) return;

      const x = rect.x * canvas.width;
      const y = rect.y * canvas.height;
      const width = rect.w * canvas.width;
      const height = rect.h * canvas.height;

      const fit = imageFit === "contain" ? Math.min : Math.max;

      const scale = fit(
        width / image.width,
        height / image.height
      );

      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;

      const drawX = x + (width - drawWidth) / 2;
      const drawY = y + (height - drawHeight) / 2;

      context.save();

      context.beginPath();
      context.rect(x, y, width, height);
      context.clip();

      context.drawImage(
        image,
        drawX,
        drawY,
        drawWidth,
        drawHeight
      );

      context.restore();
    };

    if (frontImage && frontTexture.image) {
      drawImage(frontTexture.image, FRONT_UV_RECT);
    }

    if (backImage && backTexture.image) {
      drawImage(backTexture.image, BACK_UV_RECT);
    }

    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = baseMap.flipY;
    texture.anisotropy = 16;
    texture.needsUpdate = true;

    return texture;
  }, [
    frontImage,
    backImage,
    imageFit,
    frontTexture,
    backTexture,
    materials.base.map,
  ]);

  const curve = useRef(
    new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ],
      false,
      "chordal"
    )
  );

  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);

  useRopeJoint(
    fixed,
    joint1,
    [[0, 0, 0], [0, 0, 0], 1]
  );

  useRopeJoint(
    joint1,
    joint2,
    [[0, 0, 0], [0, 0, 0], 1]
  );

  useRopeJoint(
    joint2,
    joint3,
    [[0, 0, 0], [0, 0, 0], 1]
  );

  useSphericalJoint(
    joint3,
    card,
    [
      [0, 0, 0],
      [0, 1.5, 0],
    ]
  );

  useEffect(() => {
    document.body.style.cursor = hovered
      ? dragged
        ? "grabbing"
        : "grab"
      : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec
        .set(state.pointer.x, state.pointer.y, 0.5)
        .unproject(state.camera);

      dir
        .copy(vec)
        .sub(state.camera.position)
        .normalize();

      vec.add(
        dir.multiplyScalar(state.camera.position.length())
      );

      [
        card,
        joint1,
        joint2,
        joint3,
        fixed,
      ].forEach((ref) => {
        ref.current?.wakeUp();
      });

      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current) return;

    [joint1, joint2].forEach((ref) => {
      if (!ref.current.lerped) {
        ref.current.lerped = new THREE.Vector3().copy(
          ref.current.translation()
        );
      }

      const distance = Math.max(
        0.1,
        Math.min(
          1,
          ref.current.lerped.distanceTo(
            ref.current.translation()
          )
        )
      );

      ref.current.lerped.lerp(
        ref.current.translation(),
        delta * (distance * 50)
      );
    });

    curve.current.points[0].copy(
      joint3.current.translation()
    );

    curve.current.points[1].copy(
      joint2.current.lerped
    );

    curve.current.points[2].copy(
      joint1.current.lerped
    );

    curve.current.points[3].copy(
      fixed.current.translation()
    );

    band.current.geometry.setPoints(
      curve.current.getPoints(isMobile ? 16 : 32)
    );

    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());

    card.current.setAngvel({
      x: ang.x,
      y: ang.y - rot.y * 0.25,
      z: ang.z,
    });
  });

  return (
    <>
      {/* Physics chain */}
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type="fixed"
          position={[0, 0.6, 0]}
        />

        <RigidBody
          position={[0.5, 0, 0]}
          ref={joint1}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[1, 0, 0]}
          ref={joint2}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[1.5, 0, 0]}
          ref={joint3}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Card */}
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider
            args={[0.8, 1.125, 0.01]}
          />

          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(event) => {
              event.target.releasePointerCapture(
                event.pointerId
              );

              setDragged(false);
            }}
            onPointerDown={(event) => {
              event.target.setPointerCapture(
                event.pointerId
              );

              setDragged(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(
                    vec.copy(
                      card.current.translation()
                    )
                  )
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>

            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />

            <mesh
              geometry={nodes.clamp.geometry}
              material={materials.metal}
            />
          </group>
        </RigidBody>
      </group>

      {/* Visual lanyard */}
      <mesh ref={band}>
        <meshLineGeometry />

        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={
            isMobile
              ? [1000, 2000]
              : [1000, 1000]
          }
          useMap
          map={lanyardTexture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

function Scene({
  frontImage,
  backImage,
  lanyardImage,
  lanyardWidth,
  isMobile,
}) {
  return (
    <>
      <ambientLight intensity={Math.PI} />

      <Physics
        gravity={[0, -40, 0]}
        timeStep={isMobile ? 1 / 30 : 1 / 60}
      >
        <Band
          frontImage={frontImage}
          backImage={backImage}
          lanyardImage={lanyardImage}
          lanyardWidth={lanyardWidth}
          isMobile={isMobile}
        />
      </Physics>

      <Environment blur={0.75}>
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />

        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />

        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />

        <Lightformer
          intensity={10}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </>
  );
}

function Lanyard({
  frontImage = null,
  backImage = null,
  lanyardImage = lanyardTexture,
  lanyardWidth = 1,
}) {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 25],
          fov: 20,
        }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          alpha: true,
          antialias: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(
            new THREE.Color(0x000000),
            0
          );
        }}
      >
        <Scene
          frontImage={frontImage}
          backImage={backImage}
          lanyardImage={lanyardImage}
          lanyardWidth={lanyardWidth}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(cardGLB);

export default Lanyard;