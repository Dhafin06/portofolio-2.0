import { useEffect, useRef, useState } from "react";

export function SpotlightImage({
  src,
  alt = "",
  className = "",
}) {
  const imageRef = useRef(null);
  const animationRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  const current = useRef({
    x: 50,
    y: 50,
    tiltX: 0,
    tiltY: 0,
    scale: 1,
    shadowX: 0,
    shadowY: 10,
    shadowBlur: 30,
    shadowOpacity: 0.1,
    opacity: 0,
  });

  const target = useRef({
    x: 50,
    y: 50,
    tiltX: 0,
    tiltY: 0,
    scale: 1,
    shadowX: 0,
    shadowY: 10,
    shadowBlur: 30,
    shadowOpacity: 0.1,
    opacity: 0,
  });

  const [style, setStyle] = useState({
    x: 50,
    y: 50,
    tiltX: 0,
    tiltY: 0,
    scale: 1,
    shadowX: 0,
    shadowY: 10,
    shadowBlur: 30,
    shadowOpacity: 0.1,
    opacity: 0,
  });

  useEffect(() => {
    const animate = () => {
      const currentValue = current.current;
      const targetValue = target.current;

      const positionSmoothing = 0.12;
      const tiltSmoothing = 0.1;
      const scaleSmoothing = 0.1;
      const shadowSmoothing = 0.1;
      const opacitySmoothing = 0.12;

      currentValue.x +=
        (targetValue.x - currentValue.x) * positionSmoothing;

      currentValue.y +=
        (targetValue.y - currentValue.y) * positionSmoothing;

      currentValue.tiltX +=
        (targetValue.tiltX - currentValue.tiltX) * tiltSmoothing;

      currentValue.tiltY +=
        (targetValue.tiltY - currentValue.tiltY) * tiltSmoothing;

      currentValue.scale +=
        (targetValue.scale - currentValue.scale) * scaleSmoothing;

      currentValue.shadowX +=
        (targetValue.shadowX - currentValue.shadowX) * shadowSmoothing;

      currentValue.shadowY +=
        (targetValue.shadowY - currentValue.shadowY) * shadowSmoothing;

      currentValue.shadowBlur +=
        (targetValue.shadowBlur - currentValue.shadowBlur) *
        shadowSmoothing;

      currentValue.shadowOpacity +=
        (targetValue.shadowOpacity - currentValue.shadowOpacity) *
        shadowSmoothing;

      currentValue.opacity +=
        (targetValue.opacity - currentValue.opacity) *
        opacitySmoothing;

      setStyle({
        ...currentValue,
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);

      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }

    target.current.opacity = 1;
    target.current.scale = 1.015;

    target.current.shadowBlur = 45;
    target.current.shadowOpacity = 0.16;
  };

  const handleMouseMove = (event) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    target.current.x = x;
    target.current.y = y;

    const normalizedX = (x - 50) / 50;
    const normalizedY = (y - 50) / 50;

    const maxTilt = 5;

    target.current.tiltX = normalizedY * -maxTilt;
    target.current.tiltY = normalizedX * maxTilt;

    const maxShadowOffset = 12;

    target.current.shadowX =
      normalizedX * -maxShadowOffset;

    target.current.shadowY =
      normalizedY * -maxShadowOffset + 15;
  };

  const handleMouseLeave = () => {
    target.current.x = 50;
    target.current.y = 50;

    target.current.tiltX = 0;
    target.current.tiltY = 0;

    target.current.scale = 1;

    target.current.shadowX = 0;
    target.current.shadowY = 10;
    target.current.shadowBlur = 30;
    target.current.shadowOpacity = 0.1;

    fadeTimeoutRef.current = setTimeout(() => {
      target.current.opacity = 0;
      fadeTimeoutRef.current = null;
    }, 250);
  };

  return (
    <div className="perspective-[1000px] h-full w-full">
      <div
        ref={imageRef}
        className={`relative h-full w-full overflow-hidden rounded-[1.5rem] ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `
            rotateX(${style.tiltX}deg)
            rotateY(${style.tiltY}deg)
            scale(${style.scale})
          `,
          transformStyle: "preserve-3d",
          boxShadow: `
            ${style.shadowX}px
            ${style.shadowY}px
            ${style.shadowBlur}px
            rgba(0, 0, 0, ${style.shadowOpacity})
          `,
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="h-full w-full select-none object-cover"
        />

        {/* White Spotlight */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: style.opacity,
            background: `
              radial-gradient(
                circle at ${style.x}% ${style.y}%,
                rgba(255, 255, 255, 0.38) 0%,
                rgba(255, 255, 255, 0.33) 6%,
                rgba(255, 255, 255, 0.26) 12%,
                rgba(255, 255, 255, 0.19) 20%,
                rgba(255, 255, 255, 0.13) 29%,
                rgba(255, 255, 255, 0.08) 38%,
                rgba(255, 255, 255, 0.045) 46%,
                rgba(255, 255, 255, 0.018) 52%,
                rgba(255, 255, 255, 0) 58%
              )
            `,
          }}
        />

        {/* Dimming */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: style.opacity,
            background: `
              radial-gradient(
                circle at ${style.x}% ${style.y}%,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.01) 10%,
                rgba(0, 0, 0, 0.035) 20%,
                rgba(0, 0, 0, 0.08) 32%,
                rgba(0, 0, 0, 0.15) 44%,
                rgba(0, 0, 0, 0.24) 56%,
                rgba(0, 0, 0, 0.35) 70%,
                rgba(0, 0, 0, 0.48) 84%,
                rgba(0, 0, 0, 0.60) 100%
              )
            `,
          }}
        />
      </div>
    </div>
  );
}