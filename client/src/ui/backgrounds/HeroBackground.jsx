const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#09090b]">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-175 h-175 rounded-full bg-orange-500/8 blur-[140px]" />

      <div className="absolute top-1/3 -left-32 w-87.5 h-87.5 rounded-full bg-orange-500/6 blur-[120px]" />

      <div className="absolute bottom-20 -right-24 w-75 h-75 rounded-full bg-orange-600/5 blur-[120px]" />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03), transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(249,115,22,0.04), transparent 30%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              white 0px,
              white 1px,
              transparent 1px,
              transparent 24px
            )
          `,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              rgba(0,0,0,0.15) 50%,
              rgba(0,0,0,0.45) 100%
            )
          `,
        }}
      />
    </div>
  );
};

export default HeroBackground;
