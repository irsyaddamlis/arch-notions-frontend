import { createElement, useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const LOGO_IMAGE = "/static/arch-notions-logo.png";

const MENU_ITEMS = [
  { label: "About", href: "/profile.html" },
  { label: "Solution", href: "/solution.html" },
];

function NavBar({ current = "Home" }) {
  return (
    <nav className="flex gap-4">
      {MENU_ITEMS.map((item) => {
        const isActive = item.label === current || item.href === window.location.pathname;

        return isActive ? (
          <span 
            key={item.label} 
            className="cursor-default font-bold text-white px-3 py-1 bg-blue-600 rounded-full"
          >
            {item.label}
          </span>
        ) : (
          <a
            key={item.label}
            href={item.href}
            className="text-slate-300 hover:text-white px-3 py-1"
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

const CONTACT = {
  email: "weready@arch-notions.com",
  whatsapp: "+62-85555553261",
  waLink: "https://wa.me/6285555553261",
};

const ITEM_W    = 130;
const THRESHOLD = 60;

const styles = {
  root: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    minHeight: 520,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Georgia, serif",
    userSelect: "none",
    background: "#05050a",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "block",
    zIndex: 1,
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(5, 5, 10, 0.4)",
    zIndex: 2,
    pointerEvents: "none"
  },
  logoWrap: {
    position: "absolute",
    top: "45%",
    left: "50%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    transform: "translate(-50%,-50%)",
    zIndex: 3,
  },
  logoImg: {
    width: "min(90vw, 800px)",
    height: "auto",
    display: "block",
    filter: "drop-shadow(0 0 14px rgba(90,160,90,0.2))",
  },
  carouselZone: (cursor) => ({
    position: "absolute",
    bottom: 100,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 520,
    height: 90,
    zIndex: 4,
    cursor,
  }),
  track: (offsetPx, isDragging) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "flex",
    alignItems: "center",
    transform: `translateY(-50%) translateX(calc(-50% + ${offsetPx}px))`,
    pointerEvents: "auto",
    transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  }),
  menuItem: (state) => ({
    color:
      state === "active"
        ? "#e8e8e0"
        : state === "near"
        ? "rgba(232,232,224,0.72)"
        : "rgba(232,232,224,0.42)",
    fontSize: state === "active" ? 12 : 11,
    letterSpacing: state === "active" ? "3.5px" : "3px",
    textTransform: "uppercase",
    padding: "10px 0",
    border:
      state === "active"
        ? "0.5px solid rgba(90,170,110,0.65)"
        : "0.5px solid rgba(90,170,110,0.12)",
    background:
      state === "active"
        ? "rgba(8,18,12,0.72)"
        : "rgba(8,18,12,0.35)",
    whiteSpace: "nowrap",
    flexShrink: 0,
    width: ITEM_W,
    textAlign: "center",
    boxSizing: "border-box",
    opacity: state === "active" ? 1 : state === "near" ? 0.72 : 0.42,
    transform: state === "active" ? "scale(1.1)" : state === "near" ? "scale(0.93)" : "scale(0.84)",
    transition: "color 0.35s, border-color 0.35s, background 0.35s, opacity 0.35s, transform 0.35s",
    textDecoration: "none",
  }),
  activeLine: {
    position: "absolute",
    bottom: 88,
    left: "50%",
    transform: "translateX(-50%)",
    width: 28,
    height: 1,
    background: "#5aaa6e",
    zIndex: 5,
  },
  dotsRow: {
    position: "absolute",
    bottom: 70,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 8,
    zIndex: 5,
  },
  dot: (active) => ({
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: active ? "#5aaa6e" : "rgba(90,170,110,0.28)",
    transform: active ? "scale(1.4)" : "scale(1)",
    transition: "background 0.3s, transform 0.3s",
  }),
  hint: (visible) => ({
    position: "absolute",
    bottom: 196,
    left: "50%",
    transform: "translateX(-50%)",
    color: "rgba(255,255,255,0.18)",
    fontSize: 9,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    zIndex: 4,
    pointerEvents: "none",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.6s",
    whiteSpace: "nowrap",
  }),
  contactBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(12, 16, 24, 0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    padding: "12px 24px",
    zIndex: 6,
    flexWrap: "wrap",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  contactLink: {
    fontSize: 13,
    color: "#F8F8FF",
    textDecoration: "none",
    letterSpacing: "0.5px",
    transition: "color 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  contactDivider: {
    width: 1,
    height: 16,
    background: "rgba(248,248,255,0.2)",
  },
};

function getItemState(index, current, floatIndex) {
  const ref = floatIndex !== null ? floatIndex : current;
  const d = Math.abs(index - ref);
  if (d < 0.55) return "active";
  if (d < 1.4)  return "near";
  return "idle";
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    const numStars = 150;
    let stars = [];

    function setupStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width,
        });
      }
    }

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      setupStars();
    }

    handleResize();

    function animate() {
      if (canvas.width === 0 || canvas.height === 0 || width === 0) {
        handleResize();
      }

      ctx.fillStyle = "rgba(5, 5, 10, 0.25)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ffffff";
      
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        if (!star) continue;

        star.z -= 2; 
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + width / 2;
        const py = star.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * 3;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={styles.canvas} />;
}

export default function HomePage() {
  const [current, setCurrent]         = useState(0);
  const [liveOffset, setLiveOffset]   = useState(0);
  const [floatIndex, setFloatIndex]   = useState(null);
  const [cursor, setCursorStyle]      = useState("pointer");
  const [hintVisible, setHintVisible] = useState(true);
  const [hoveredContact, setHoveredContact] = useState(null);

  const lastX       = useRef(null);
  const lastWheel   = useRef(0);
  const accumulated = useRef(0);
  const currentRef  = useRef(0);

  currentRef.current = current;

  function trackOffset(live = 0) {
    const base = -currentRef.current * ITEM_W;
    return base + live + (MENU_ITEMS.length / 2 - 0.5) * ITEM_W;
  }

  const onMouseEnter = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    lastX.current       = e.clientX - r.left;
    accumulated.current = 0;
    setHintVisible(false);
    setCursorStyle("pointer");
  }, []);

  const onMouseDown = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    lastX.current       = e.clientX - r.left;
    accumulated.current = 0;
  }, []);

  const onMouseMove = useCallback((e) => {
    if (lastX.current === null) return;
    const r     = e.currentTarget.getBoundingClientRect();
    const x     = e.clientX - r.left;
    const delta = x - lastX.current;
    lastX.current = x;
    accumulated.current += delta;

    if (delta < -1.5)     setCursorStyle("w-resize");
    else if (delta > 1.5) setCursorStyle("e-resize");
    else                  setCursorStyle("pointer");

    if (accumulated.current < -THRESHOLD && currentRef.current < MENU_ITEMS.length - 1) {
      setCurrent(c => c + 1);
      accumulated.current = 0;
      setLiveOffset(0);
      setFloatIndex(null);
      return;
    }
    if (accumulated.current > THRESHOLD && currentRef.current > 0) {
      setCurrent(c => c - 1);
      accumulated.current = 0;
      setLiveOffset(0);
      setFloatIndex(null);
      return;
    }

    const live = clamp(accumulated.current * 0.3, -ITEM_W * 0.55, ITEM_W * 0.55);
    setLiveOffset(live);
    const base = -currentRef.current * ITEM_W;
    setFloatIndex(-(base + live) / ITEM_W);
  }, []);

  const onMouseLeave = useCallback(() => {
    lastX.current       = null;
    accumulated.current = 0;
    setLiveOffset(0);
    setFloatIndex(null);
    setCursorStyle("pointer");
  }, []);

  const onTouchStart = useCallback((e) => {
    lastX.current       = e.touches[0].clientX;
    accumulated.current = 0;
  }, []);

  const onTouchMove = useCallback((e) => {
    if (e.cancelable) e.preventDefault();
    const x     = e.touches[0].clientX;
    const delta = x - lastX.current;
    lastX.current = x;
    accumulated.current += delta;

    if (accumulated.current < -THRESHOLD && currentRef.current < MENU_ITEMS.length - 1) {
      setCurrent(c => c + 1);
      accumulated.current = 0;
      setLiveOffset(0);
      setFloatIndex(null);
      return;
    }
    if (accumulated.current > THRESHOLD && currentRef.current > 0) {
      setCurrent(c => c - 1);
      accumulated.current = 0;
      setLiveOffset(0);
      setFloatIndex(null);
      return;
    }

    const live = clamp(accumulated.current * 0.3, -ITEM_W * 0.55, ITEM_W * 0.55);
    setLiveOffset(live);
    const base = -currentRef.current * ITEM_W;
    setFloatIndex(-(base + live) / ITEM_W);
  }, []);

  const onTouchEnd = useCallback(() => {
    lastX.current       = null;
    accumulated.current = 0;
    setLiveOffset(0);
    setFloatIndex(null);
  }, []);

  const onWheel = useCallback((e) => {
    const now = Date.now();
    if (now - lastWheel.current < 300) return;
    if (Math.abs(e.deltaY) < 10) return;
    if (e.deltaY > 0 && currentRef.current < MENU_ITEMS.length - 1) {
      setCurrent(c => c + 1);
      lastWheel.current = now;
    } else if (e.deltaY < 0 && currentRef.current > 0) {
      setCurrent(c => c - 1);
      lastWheel.current = now;
    }
  }, []);

  return (
    <div style={styles.root}>
      <Starfield /> 
      <div style={styles.bgOverlay} />
      
      <div style={styles.logoWrap}>
        <img src={LOGO_IMAGE} alt="arch-notions" style={styles.logoImg} />
      </div>

      <div style={styles.hint(hintVisible)}>move mouse left · right over menu</div>

      <div
        style={styles.carouselZone(cursor)}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseLeave}
        onMouseLeave={onMouseLeave}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div style={styles.track(trackOffset(liveOffset), lastX.current !== null)}>
          {MENU_ITEMS.map((item, i) => {
            const state = getItemState(i, current, floatIndex);
            return (
              <a
                key={item.label}
                href={item.href}
                style={styles.menuItem(state)}
                onClick={(e) => {
                  if (state !== "active") {
                    e.preventDefault();
                    setCurrent(i);
                    setLiveOffset(0);
                    setFloatIndex(null);
                    return;
                  }
                  if (Math.abs(accumulated.current) > 6) {
                    e.preventDefault();
                  }
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      <div style={styles.activeLine} />

      <div style={styles.dotsRow}>
        {MENU_ITEMS.map((_, i) => (
          <div
            key={i}
            style={styles.dot(i === current)}
            onClick={() => { setCurrent(i); setLiveOffset(0); setFloatIndex(null); }}
          />
        ))}
      </div>

      {/* Revised Contact Bar */}
      <footer style={styles.contactBar}>
        {/* Email Link */}
        <a
          href={`mailto:${CONTACT.email}`}
          title="Email Us"
          style={{
            ...styles.contactLink,
            color: hoveredContact === "email" ? "#25D366" : "#F8F8FF",
          }}
          onMouseEnter={() => setHoveredContact("email")}
          onMouseLeave={() => setHoveredContact(null)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="whitesmoke">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span>{CONTACT.email}</span>
        </a>

        <div style={styles.contactDivider} />

        {/* WhatsApp Link */}
        <a
          href={CONTACT.waLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          style={{
            ...styles.contactLink,
            color: hoveredContact === "wa" ? "#25D366" : "#F8F8FF",
          }}
          onMouseEnter={() => setHoveredContact("wa")}
          onMouseLeave={() => setHoveredContact(null)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.002l-1.416 5.17 5.289-1.387c1.463.797 3.111 1.216 4.782 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.039-5.176-2.927-7.065A9.927 9.927 0 0 0 12.012 2zm0 18.232h-.003c-1.5 0-2.97-.403-4.252-1.164l-.305-.181-3.162.829.843-3.082-.199-.316a8.28 8.28 0 0 1-1.272-4.333c.001-4.57 3.719-8.287 8.291-8.287 2.214 0 4.296.863 5.86 2.428a8.23 8.23 0 0 1 2.427 5.862c0 4.571-3.718 8.288-8.288 8.288zm4.542-6.208c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.792 6.792 0 0 1-2.001-1.233c-.76-.677-1.273-1.513-1.422-1.762-.149-.249-.016-.384.108-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.042-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.486-.408-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311s-.871.851-.871 2.076c0 1.224.892 2.407 1.016 2.573.125.166 1.756 2.682 4.254 3.761.594.257 1.058.41 1.42.526.597.19 1.141.163 1.57.099.479-.071 1.472-.602 1.679-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
          </svg>
          <span>{CONTACT.whatsapp}</span>
        </a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(createElement(HomePage));