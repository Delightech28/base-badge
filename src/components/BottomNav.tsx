import { FaHome, FaBullseye, FaUser } from "react-icons/fa";

const baseBlue = "#001f3f";
const baseLight = "#3b82f6"; // Base light blue for highlight

const icons = [
  { key: "dashboard", label: "Dashboard", icon: <FaHome size={26} /> },
  { key: "tasks", label: "Tasks", icon: <FaBullseye size={26} /> },
  { key: "profile", label: "Profile", icon: <FaUser size={26} /> },
];

export default function BottomNav({ active, onChange }: {
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        background: baseBlue,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 60,
        boxShadow: "0 -2px 16px rgba(0,0,0,0.08)",
        borderTop: `1px solid ${baseLight}`,
      }}
    >
      {icons.map((item) => (
        <button
          key={item.key}
          aria-label={item.label}
          onClick={() => onChange(item.key)}
          style={{
            background: active === item.key ? "rgba(255,255,255,0.15)" : "transparent",
            color: "white",
            border: "none",
            borderRadius: 16,
            padding: 10,
            fontSize: 28,
            outline: "none",
            transition: "background 0.2s, color 0.2s",
            cursor: "pointer",
            margin: 0,
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
          onMouseOut={e => (e.currentTarget.style.background = active === item.key ? "rgba(255,255,255,0.15)" : "transparent")}
        >
          {item.icon}
        </button>
      ))}
    </nav>
  );
} 