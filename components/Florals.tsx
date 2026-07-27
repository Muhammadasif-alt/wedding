// Chhote decorative SVGs — inhe change karne ki zaroorat nahi

export function Bloom({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="#b3a3c6">
      <circle cx="26" cy="26" r="12" />
      <circle cx="26" cy="26" r="5" fill="#8a789e" />
      <circle cx="48" cy="16" r="7" />
      <path d="M36 38 Q54 44 60 64 Q46 56 36 38" />
      <path d="M14 50 Q24 58 26 74 Q14 64 14 50" />
    </svg>
  );
}

export function FloraLarge() {
  return (
    <svg width="150" height="150" viewBox="0 0 100 100" fill="#b3a3c6">
      <circle cx="30" cy="30" r="11" />
      <circle cx="30" cy="30" r="4.5" fill="#a090b4" />
      <circle cx="52" cy="20" r="8" />
      <circle cx="52" cy="20" r="3" fill="#a090b4" />
      <circle cx="18" cy="52" r="8" />
      <circle cx="18" cy="52" r="3" fill="#a090b4" />
      <path d="M40 42 Q58 48 66 70 Q52 62 40 42" />
      <path d="M42 40 Q64 40 80 52 Q60 52 42 40" />
      <path d="M12 66 Q22 74 24 90 Q12 80 12 66" />
    </svg>
  );
}

export function FloraSmall() {
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" fill="#b3a3c6">
      <circle cx="30" cy="30" r="10" />
      <circle cx="30" cy="30" r="4" fill="#a090b4" />
      <circle cx="50" cy="18" r="7" />
      <path d="M40 42 Q58 48 66 70 Q52 62 40 42" />
      <path d="M14 60 Q26 68 28 86 Q14 76 14 60" />
    </svg>
  );
}

export function Garland() {
  return (
    <svg className="garland" viewBox="0 0 360 90" fill="#b3a3c6" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 55 Q90 20 180 45 Q270 70 350 40" stroke="#a090b4" strokeWidth="2" fill="none" />
      <circle cx="70" cy="38" r="9" />
      <circle cx="70" cy="38" r="3.6" fill="#9a89b0" />
      <circle cx="120" cy="38" r="12" />
      <circle cx="120" cy="38" r="5" fill="#9a89b0" />
      <circle cx="240" cy="56" r="12" />
      <circle cx="240" cy="56" r="5" fill="#9a89b0" />
      <circle cx="292" cy="46" r="9" />
      <circle cx="292" cy="46" r="3.6" fill="#9a89b0" />
      <path d="M150 40 Q166 26 186 28 Q170 40 150 40" />
      <path d="M198 46 Q214 34 232 38 Q216 48 198 46" />
      <path d="M40 48 Q52 36 66 38 Q54 48 40 48" />
      <path d="M310 44 Q324 34 340 38 Q326 46 310 44" />
      <circle cx="180" cy="44" r="5" />
      <circle cx="205" cy="50" r="4" />
      <circle cx="95" cy="36" r="4" />
    </svg>
  );
}

// Gallery mein jab tak asli photo na ho, uski jagah yeh illustration lagti hai.
// data/invitation.ts mein gallery ka src bhar do tou yeh apne aap hat jayegi.
function Leaf({ x, y, rot, s = 1, fill = "#c7b9d6" }: { x: number; y: number; rot: number; s?: number; fill?: string }) {
  return (
    <path
      d="M0 0 Q11 -8 24 0 Q11 8 0 0Z"
      fill={fill}
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
    />
  );
}

export function MomentArt({ i, initials }: { i: number; initials: string }) {
  const variant = i % 3;
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decorative floral illustration">
      <defs>
        <linearGradient id={`mg${i}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf5ef" />
          <stop offset="100%" stopColor="#ece2ee" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#mg${i})`} />

      {/* wreath + monogram */}
      {variant === 0 && (
        <>
          {Array.from({ length: 20 }).map((_, n) => {
            const a = (n / 20) * Math.PI * 2;
            return (
              <Leaf
                key={n}
                x={200 + Math.cos(a) * 82}
                y={150 + Math.sin(a) * 82}
                rot={(a * 180) / Math.PI + 90}
                s={n % 2 ? 0.85 : 1.15}
                fill={n % 3 === 0 ? "#d5bd8f" : "#c7b9d6"}
              />
            );
          })}
          <circle cx="200" cy="150" r="62" fill="none" stroke="#d3b78a" strokeWidth="1.2" opacity=".8" />
          <text
            x="200"
            y="166"
            textAnchor="middle"
            fontFamily="'Great Vibes', cursive"
            fontSize="46"
            fill="#7d6e8a"
          >
            {initials}
          </text>
        </>
      )}

      {/* do jurey huay chhalley */}
      {variant === 1 && (
        <>
          <circle cx="172" cy="146" r="48" fill="none" stroke="#c2a06a" strokeWidth="4" />
          <circle cx="232" cy="146" r="48" fill="none" stroke="#e0cba2" strokeWidth="4" />
          <circle cx="172" cy="98" r="5" fill="#efdcb8" />
          <circle cx="232" cy="98" r="4" fill="#efdcb8" />
          {[
            [118, 214, -22],
            [148, 226, -8],
            [252, 226, 188],
            [282, 214, 202],
          ].map(([x, y, r], n) => (
            <Leaf key={n} x={x} y={y} rot={r} s={1.25} fill={n % 2 ? "#c7b9d6" : "#d5bd8f"} />
          ))}
          <path d="M150 232 Q200 246 250 232" fill="none" stroke="#c7b9d6" strokeWidth="1.6" />
        </>
      )}

      {/* patton se bana dil */}
      {variant === 2 && (
        <>
          <path
            d="M200 236 C200 194 148 182 148 142 C148 112 178 100 200 126 C222 100 252 112 252 142 C252 182 200 194 200 236Z"
            fill="none"
            stroke="#c2a06a"
            strokeWidth="2.4"
          />
          {[
            [152, 128, -50],
            [166, 108, -28],
            [190, 100, -6],
            [234, 108, 202],
            [248, 128, 226],
            [162, 168, -66],
            [238, 168, 246],
          ].map(([x, y, r], n) => (
            <Leaf key={n} x={x} y={y} rot={r} s={n % 2 ? 0.95 : 1.2} fill={n % 3 === 0 ? "#d5bd8f" : "#c7b9d6"} />
          ))}
          <circle cx="200" cy="164" r="7" fill="#dcd1e6" />
          <circle cx="200" cy="164" r="3" fill="#b3a3c6" />
        </>
      )}
    </svg>
  );
}

export function VenueIllustration() {
  return (
    <svg viewBox="0 0 330 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="330" height="200" fill="#ece5ef" />
      <rect x="0" y="150" width="330" height="50" fill="#d9cfdd" />
      <rect x="30" y="60" width="60" height="90" fill="#c3b4cd" />
      <rect x="30" y="60" width="60" height="10" fill="#b0a0bd" />
      <rect x="120" y="40" width="90" height="110" fill="#cbbcd4" />
      <path d="M120 40 L165 14 L210 40 Z" fill="#b3a3c6" />
      <rect x="158" y="100" width="16" height="50" fill="#8a789e" />
      <rect x="240" y="70" width="55" height="80" fill="#c3b4cd" />
      <rect x="240" y="70" width="55" height="9" fill="#b0a0bd" />
      <g fill="#a090b4">
        <rect x="42" y="80" width="10" height="14" />
        <rect x="66" y="80" width="10" height="14" />
        <rect x="42" y="108" width="10" height="14" />
        <rect x="66" y="108" width="10" height="14" />
        <rect x="134" y="60" width="12" height="16" />
        <rect x="184" y="60" width="12" height="16" />
        <rect x="134" y="86" width="12" height="16" />
        <rect x="184" y="86" width="12" height="16" />
        <rect x="252" y="90" width="9" height="12" />
        <rect x="274" y="90" width="9" height="12" />
        <rect x="252" y="114" width="9" height="12" />
        <rect x="274" y="114" width="9" height="12" />
      </g>
      <circle cx="30" cy="150" r="18" fill="#9a89b0" />
      <rect x="27" y="150" width="6" height="24" fill="#83729a" />
      <circle cx="305" cy="148" r="20" fill="#9a89b0" />
      <rect x="302" y="148" width="6" height="26" fill="#83729a" />
      <circle cx="112" cy="152" r="12" fill="#ab9bbb" />
      <rect x="110" y="152" width="4" height="18" fill="#83729a" />
    </svg>
  );
}

export function SealHeart() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="#f3e6ec" strokeWidth="1.6" strokeLinecap="round">
      <path d="M30 44 C30 34 20 32 20 24 C20 18 25 15 30 19 C35 15 40 18 40 24 C40 32 30 34 30 44Z" />
      <path d="M30 44 C26 38 18 38 15 30" />
      <path d="M30 44 C34 38 42 38 45 30" />
      <circle cx="30" cy="25" r="3.4" />
    </svg>
  );
}
