// ScrapQ reusable icon components using Material UI's Recycling icon
import RecyclingIcon from "@mui/icons-material/Recycling";

export function RecycleIconLight({ size = 31 }: { size?: number }) {
  return <RecyclingIcon sx={{ fontSize: size, color: "#ffffff" }} />;
}

export function RecycleIconDark({ size = 46 }: { size?: number }) {
  return <RecyclingIcon sx={{ fontSize: size, color: "#171411" }} />;
}

export function RecycleIconSmall({ size = 13 }: { size?: number }) {
  return <RecyclingIcon sx={{ fontSize: size, color: "currentcolor" }} />;
}

export function RecycleIconBlackLarge() {
  return <RecyclingIcon sx={{ fontSize: 80, color: "#171411" }} />;
}

export function DividerSvg() {
  return (
    <svg width="120" height="2" viewBox="0 0 120 2" fill="none">
      <line x1="0" y1="1" x2="120" y2="1" stroke="#171411" strokeWidth="1" strokeOpacity="0.25" />
    </svg>
  );
}