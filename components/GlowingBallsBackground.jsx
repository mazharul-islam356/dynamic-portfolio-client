export default function PurpleGlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-40">
      {/* Large glow blobs */}
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />
      <div className="glow glow-4" />

      {/* Moving light streak */}
      <div className="streak streak-1" />
      <div className="streak streak-2" />
    </div>
  );
}
