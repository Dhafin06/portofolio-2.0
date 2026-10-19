
import { Mesh, Program, Renderer, Transform, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const VS = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FS = `
precision highp float;

uniform vec2 uR;
uniform float uT;
uniform vec2 uV;
uniform float uS;
uniform float uTw;
uniform float uDe;
uniform float uMs;
uniform float uB;
uniform int uIt;
uniform vec3 uColorLow;
uniform vec3 uColorHigh;
uniform vec3 uBgColor;
uniform vec4 uFadeShape;

float h(vec2 p) {
  return sin(p.x + sin(p.y + uT * uV.x))
       * sin(p.y * p.x * 0.1 + uT * uV.y);
}

float fadeAlpha(float d) {
  float t = clamp(1.0 - d, 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  vec2 frag = gl_FragCoord.xy / uR;
  vec2 p = frag - 0.5;

  p.x *= uR.x / uR.y;
  p *= uS;

  float ms = uT * uMs * 0.1;
  vec2 d = vec2(sin(ms), cos(ms)) * 0.1;
  float kt = uTw * 0.01;
  float kd = 1.0 / uDe;

  vec2 e = vec2(0.05, 0.0);
  vec2 r = vec2(0.0);

  for (int i = 0; i < 24; i++) {
    if (i >= uIt) break;

    float a = h(p);
    float b = h(p + e.xy);
    float c = h(p + e.yx);

    vec2 q = vec2(b - a, c - a) * 20.0;

    p += vec2(-q.y, q.x) * kt + q * kd + d;
    r = q;
  }

  float t = clamp(length(r) * 0.5, 0.0, 1.0);
  vec3 col = mix(uColorLow, uColorHigh, t) * uB;

  vec2 ndc = vec2(frag.x, 1.0 - frag.y);
  float aspect = uR.x / uR.y;

  float dx =
    ((ndc.x - uFadeShape.x) * aspect) / uFadeShape.z;

  float dy =
    (ndc.y - uFadeShape.y) / uFadeShape.w;

  float fa = fadeAlpha(sqrt(dx * dx + dy * dy));

  vec3 outColor = mix(uBgColor, col, fa);

  gl_FragColor = vec4(outColor, 1.0);
}
`;

const D = {
  flowSpeed: [0.1, 0.2],
  iterations: 14,
  scale: 6,
  brightness: 1,
  colorLowA: [0.18, 0.2, 0.3],
  colorHighA: [0.55, 0.38, 0.32],
  fadeRx: 1.4,
  fadeRy: 0.6,
  fadeCx: 0.5,
  fadeCy: 0.0,
};

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  s /= 100;
  l /= 100;

  const hueToRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  if (s === 0) return [l, l, l];

  const q = l < 0.5
    ? l * (1 + s)
    : l + s - l * s;

  const p = 2 * l - q;

  return [
    hueToRgb(p, q, h + 1 / 3),
    hueToRgb(p, q, h),
    hueToRgb(p, q, h - 1 / 3),
  ];
}

function parseColor(input) {
  const s = input.trim();

  if (!s) return null;

  if (s.startsWith("#")) {
    let hex = s.slice(1);

    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }

    if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;

    const n = parseInt(hex, 16);

    return [
      ((n >> 16) & 255) / 255,
      ((n >> 8) & 255) / 255,
      (n & 255) / 255,
    ];
  }

  const rgb = s.match(
    /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i
  );

  if (rgb) {
    return [
      Number(rgb[1]) / 255,
      Number(rgb[2]) / 255,
      Number(rgb[3]) / 255,
    ];
  }

  const hsl = s.match(
    /^hsla?\(\s*([\d.-]+)(?:deg)?[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i
  );

  if (hsl) {
    return hslToRgb(
      Number(hsl[1]),
      Number(hsl[2]),
      Number(hsl[3])
    );
  }

  // Mendukung CSS custom property berbentuk:
  // 220 15% 20% atau 0 0% 100%
  const tokens = s.match(
    /^([\d.-]+)\s+([\d.]+)%\s+([\d.]+)%$/
  );

  if (tokens) {
    return hslToRgb(
      Number(tokens[1]),
      Number(tokens[2]),
      Number(tokens[3])
    );
  }

  return null;
}

function readBgColor(el) {
  const styles = getComputedStyle(el);
  const varVal = styles.getPropertyValue("--background").trim();
  const parsed = parseColor(varVal);

  if (parsed) return parsed;

  const probe = document.createElement("div");

  probe.style.cssText = [
    "position:absolute",
    "width:1px",
    "height:1px",
    "visibility:hidden",
    "background-color:var(--background)",
  ].join(";");

  el.appendChild(probe);

  const raw = getComputedStyle(probe).backgroundColor;

  probe.remove();

  return parseColor(raw) ?? [1, 1, 1];
}

export function ShaderFlow(props) {
  const ref = useRef(null);
  const pr = useRef(props);

  useEffect(() => {
    pr.current = props;
  });

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    let renderer;
    let gl;
    let raf = 0;
    let running = false;
    let visible = document.visibilityState === "visible";
    let onScreen = false;
    let disposed = false;

    let ro;
    let io;
    let themeObserver;

    let visibilityHandler;
    let canvas;

    const cleanup = () => {
      disposed = true;

      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }

      running = false;

      ro?.disconnect();
      io?.disconnect();
      themeObserver?.disconnect();

      if (visibilityHandler) {
        document.removeEventListener(
          "visibilitychange",
          visibilityHandler
        );
      }

      if (canvas?.parentElement === el) {
        canvas.remove();
      }

      if (gl) {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };

    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 1),
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
      });

      gl = renderer.gl;
      canvas = gl.canvas;

      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";

      el.appendChild(canvas);

      const geo = new Triangle(gl);

      const program = new Program(gl, {
        vertex: VS,
        fragment: FS,
        uniforms: {
          uT: { value: 0 },
          uR: { value: [1, 1] },
          uV: { value: [...D.flowSpeed] },
          uS: { value: D.scale },
          uTw: { value: 50 },
          uDe: { value: 200 },
          uMs: { value: 2.5 },
          uB: { value: D.brightness },
          uIt: { value: D.iterations },
          uColorLow: { value: [...D.colorLowA] },
          uColorHigh: { value: [...D.colorHighA] },
          uBgColor: {
            value: readBgColor(document.documentElement),
          },
          uFadeShape: {
            value: [
              D.fadeCx,
              D.fadeCy,
              D.fadeRx,
              D.fadeRy,
            ],
          },
        },
      });

      if (!program.uniformLocations) {
        console.error("Shader link failed", {
          vertex: gl.getShaderInfoLog(program.vertexShader),
          fragment: gl.getShaderInfoLog(program.fragmentShader),
        });

        cleanup();
        return;
      }

      const mesh = new Mesh(gl, {
        geometry: geo,
        program,
      });

      const scene = new Transform();

      mesh.setParent(scene);

      const onResize = () => {
        if (disposed) return;

        const w = el.clientWidth;
        const h = el.clientHeight;

        if (w <= 0 || h <= 0) return;

        renderer.setSize(w, h);

        program.uniforms.uR.value = [
          gl.drawingBufferWidth,
          gl.drawingBufferHeight,
        ];
      };

      onResize();

      ro = new ResizeObserver(onResize);
      ro.observe(el);

      const syncBg = () => {
        if (disposed) return;

        program.uniforms.uBgColor.value =
          readBgColor(document.documentElement);
      };

      themeObserver = new MutationObserver(syncBg);

      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme", "style"],
      });

      syncBg();

      const sync = () => {
        const c = pr.current;

        program.uniforms.uV.value = [
          ...(c.flowSpeed ?? D.flowSpeed),
        ];

        program.uniforms.uS.value = c.scale ?? D.scale;
        program.uniforms.uB.value =
          c.brightness ?? D.brightness;
        program.uniforms.uIt.value =
          c.iterations ?? D.iterations;

        program.uniforms.uColorLow.value = [
          ...(c.colorLowA ?? D.colorLowA),
        ];

        program.uniforms.uColorHigh.value = [
          ...(c.colorHighA ?? D.colorHighA),
        ];

        program.uniforms.uFadeShape.value = [
          c.fadeCx ?? D.fadeCx,
          c.fadeCy ?? D.fadeCy,
          c.fadeRx ?? D.fadeRx,
          c.fadeRy ?? D.fadeRy,
        ];
      };

      const stop = () => {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }

        running = false;
      };

      const tick = (now) => {
        raf = 0;

        if (disposed || !visible || !onScreen) {
          stop();
          return;
        }

        program.uniforms.uT.value = now / 1000;

        sync();

        renderer.render({ scene });

        raf = requestAnimationFrame(tick);
      };

      const start = () => {
        if (
          disposed ||
          running ||
          !visible ||
          !onScreen
        ) {
          return;
        }

        running = true;
        raf = requestAnimationFrame(tick);
      };

      visibilityHandler = () => {
        visible = document.visibilityState === "visible";

        if (visible) {
          start();
        } else {
          stop();
        }
      };

      document.addEventListener(
        "visibilitychange",
        visibilityHandler
      );

      io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          onScreen = entry.isIntersecting;
        }

        if (onScreen) {
          start();
        } else {
          stop();
        }
      }, {
        rootMargin: "100px",
      });

      io.observe(el);
    } catch (error) {
      console.error("ShaderFlow initialization failed", error);
      cleanup();
    }

    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={
        props.className ??
        "absolute inset-0 h-full w-full grayscale"
      }
    />
  );
}
