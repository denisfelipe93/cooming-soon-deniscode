<template>
  <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10">
    <!-- base -->
    <div class="absolute inset-0 bg-neutral-50 dark:bg-[#0e0e12]"></div>

    <!-- Aurora (3 véus) -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="aurora a1"></div>
      <div class="aurora a2"></div>
      <div class="aurora a3"></div>
      <div class="grain"></div>
    </div>
  </div>
</template>

<style scoped>
.aurora {
  position: absolute;
  inset: -20%;
  filter: blur(56px);
  opacity: .55;
  mix-blend-mode: screen;
}
:where(.dark) .aurora { opacity: .70; }

/* paleta neutra indigo/slate + acento sutil */
.a1 {
  background:
    radial-gradient(40% 60% at 20% 30%, rgba(88,104,242,.22), transparent 60%),
    radial-gradient(50% 50% at 80% 20%,  rgba(126,214,255,.12), transparent 60%);
  animation: drift1 38s ease-in-out infinite;
}
.a2 {
  background:
    radial-gradient(45% 55% at 70% 65%, rgba(65,71,93,.20),  transparent 60%),
    radial-gradient(55% 45% at 30% 80%,  rgba(156,222,204,.10), transparent 60%);
  animation: drift2 46s ease-in-out infinite;
}
.a3 {
  background:
    radial-gradient(35% 50% at 50% 50%, rgba(180,190,255,.12), transparent 60%),
    radial-gradient(40% 40% at 85% 75%,  rgba(127,72,228,.10), transparent 60%);
  animation: drift3 52s ease-in-out infinite;
}

/* movimento orgânico lento */
@keyframes drift1 {
  0% { transform: translate3d(-4%, -2%, 0) scale(1.05) }
  50% { transform: translate3d( 3%,  1%, 0) scale(1.10) }
  100%{ transform: translate3d(-4%, -2%, 0) scale(1.05) }
}
@keyframes drift2 {
  0% { transform: translate3d(2%, 3%, 0) scale(1.00) rotate(.5deg) }
  50%{ transform: translate3d(-3%, -1%,0) scale(1.07) rotate(-.5deg) }
  100%{transform: translate3d(2%, 3%, 0) scale(1.00) rotate(.5deg) }
}
@keyframes drift3 {
  0% { transform: translate3d(0%, -3%,0) scale(1.08) }
  50%{ transform: translate3d(-2%, 2%,0) scale(1.02) }
  100%{transform: translate3d(0%, -3%,0) scale(1.08) }
}

/* grão sutil */
.grain {
  position: absolute; inset: -10%;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.06'/></svg>");
  background-size: 220px 220px;
  mix-blend-mode: overlay;
  animation: grainmove 12s linear infinite;
}
@keyframes grainmove { from {transform:translate3d(0,0,0)} to {transform:translate3d(-120px,-120px,0)} }

@media (prefers-reduced-motion: reduce) {
  .aurora, .grain { animation: none !important; }
}
</style>
