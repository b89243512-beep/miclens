export function Logo({ size = 32 }: { size?: number }) {
  const fontSize = Math.round(size * 0.6);
  return (
    <span
      className="rounded-lg inline-flex items-center justify-center font-black text-white shrink-0 relative overflow-hidden"
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 35% 30%, #FB923C 0%, #EA580C 55%, #9A3412 100%)",
        fontSize,
        lineHeight: 1,
      }}
      aria-label="Mic Lens"
    >
      <span className="relative z-10">L</span>
      <span
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 0 0 4px rgba(255,255,255,0.0)",
        }}
      />
    </span>
  );
}
