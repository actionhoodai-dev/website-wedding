'use client';

export function CoupleSilhouette() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center 60%, #3a1518 0%, #20080b 60%, #120406 100%)',
        borderRadius: '8px',
      }}
    >
      {/* Sacred Arch & Glowing Halo */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.28) 0%, rgba(184, 134, 11, 0.12) 50%, transparent 75%)',
          filter: 'blur(16px)',
          pointerEvents: 'none',
        }}
      />

      {/* Exquisite SVG Artistic Couple & Temple Silhouette */}
      <svg
        viewBox="0 0 400 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '440px',
          display: 'block',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
        }}
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2a8" />
            <stop offset="30%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#aa7c11" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>

          {/* Warm Temple Glow */}
          <radialGradient id="templeGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#ffd27d" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#99582a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Deep Silhouette with Golden Rim Light */}
          <linearGradient id="silhouetteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#321217" />
            <stop offset="60%" stopColor="#1e0a0d" />
            <stop offset="100%" stopColor="#100507" />
          </linearGradient>

          {/* Garland Jasmine & Gold Gradient */}
          <linearGradient id="garlandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbe0" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>
        </defs>

        {/* Background Sacred Gopuram in soft silhouette */}
        <g opacity="0.25">
          {/* Temple base */}
          <rect x="130" y="70" width="140" height="130" fill="url(#goldSheen)" opacity="0.3" rx="4" />
          <path d="M140 70 L150 20 L250 20 L260 70 Z" fill="url(#goldSheen)" opacity="0.4" />
          <path d="M160 20 L170 -10 L230 -10 L240 20 Z" fill="url(#goldSheen)" opacity="0.5" />
          {/* Kalasam finials */}
          <circle cx="185" cy="-14" r="3" fill="#ffe082" />
          <circle cx="200" cy="-17" r="4" fill="#ffd700" />
          <circle cx="215" cy="-14" r="3" fill="#ffe082" />
          {/* Arch framing */}
          <path
            d="M80 340 C80 140 320 140 320 340"
            stroke="url(#goldSheen)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
        </g>

        {/* Ambient Diya / Floral Lanterns */}
        <g opacity="0.7">
          <circle cx="70" cy="180" r="3" fill="#ffdd59" filter="drop-shadow(0 0 6px #ff9f1a)" />
          <path d="M66 182 Q70 190 74 182 Z" fill="#b8860b" />
          <line x1="70" y1="120" x2="70" y2="180" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="2 3" />

          <circle cx="330" cy="180" r="3" fill="#ffdd59" filter="drop-shadow(0 0 6px #ff9f1a)" />
          <path d="M326 182 Q330 190 334 182 Z" fill="#b8860b" />
          <line x1="330" y1="120" x2="330" y2="180" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="2 3" />
        </g>

        {/* Sacred Mandap Archway */}
        <path
          d="M60 420 L60 260 Q60 160 200 130 Q340 160 340 260 L340 420"
          stroke="url(#goldSheen)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M75 420 L75 265 Q75 175 200 148 Q325 175 325 265 L325 420"
          stroke="url(#goldSheen)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.6"
        />

        {/* ─── GROOM SILHOUETTE (Left) ─── */}
        <g id="groom-figure">
          {/* Head & Traditional Hair Contour with Tilak & Kondai */}
          <path
            d="M152 175 C146 160 156 142 172 142 C186 142 195 152 194 167 C194 180 184 190 170 190 C158 190 152 184 152 175 Z"
            fill="url(#silhouetteGrad)"
            stroke="url(#goldSheen)"
            strokeWidth="1.2"
          />
          {/* Subtle Golden Tilak & Vibhuti on forehead profile */}
          <path d="M178 152 Q183 152 186 153" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="182" cy="157" r="1" fill="#dc2626" />

          {/* Neck & Broad Shoulders */}
          <path
            d="M162 188 L154 206 C138 212 118 226 112 250 L108 340 L166 340 L176 250 Z"
            fill="url(#silhouetteGrad)"
            stroke="url(#goldSheen)"
            strokeWidth="1"
          />

          {/* Silk Angavastram (Golden Stole Draped over Shoulder) */}
          <path
            d="M125 218 Q140 240 146 295 Q148 340 144 380 L130 380 Q134 330 118 280 Z"
            fill="url(#goldSheen)"
            opacity="0.85"
          />
          {/* Golden Zari Border on Angavastram */}
          <path
            d="M126 219 Q141 241 147 296"
            stroke="#ffe57f"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Groom's Kalyana Maalai (Wedding Garland) */}
          <path
            d="M145 208 Q165 255 174 310 Q168 312 160 270 Q145 230 135 215"
            fill="url(#garlandGrad)"
            stroke="#b8860b"
            strokeWidth="0.8"
          />
          {/* Flower texture beads */}
          <circle cx="152" cy="235" r="3" fill="#ffe082" />
          <circle cx="158" cy="255" r="3.2" fill="#ef4444" />
          <circle cx="164" cy="275" r="3.4" fill="#ffe082" />
          <circle cx="168" cy="295" r="3.8" fill="#f59e0b" />
        </g>

        {/* ─── BRIDE SILHOUETTE (Right) ─── */}
        <g id="bride-figure">
          {/* Traditional Bridal Hair Braid & Ornate Gajra (Jasmine Flowers) */}
          <path
            d="M246 178 C254 163 245 145 228 145 C214 145 206 156 206 170 C206 182 216 192 229 192 C240 192 246 186 246 178 Z"
            fill="url(#silhouetteGrad)"
            stroke="url(#goldSheen)"
            strokeWidth="1.2"
          />

          {/* Ornate Gold Nethi Chutti / Maang Tikka */}
          <line x1="228" y1="145" x2="223" y2="156" stroke="#ffd700" strokeWidth="1.2" />
          <circle cx="223" cy="157" r="2" fill="#ffd700" filter="drop-shadow(0 0 3px #ffe082)" />

          {/* Traditional Jasmine Gajra Garland crowning hair */}
          <path
            d="M236 155 Q248 165 248 182 Q248 196 242 208"
            stroke="#fffbe0"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.95"
            strokeDasharray="2 3"
          />

          {/* Long Traditional Jadai (Bridal Plait with Gold Hair Ornaments) */}
          <path
            d="M244 198 Q252 230 256 280 Q258 320 254 360"
            stroke="#1a060a"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M244 198 Q252 230 256 280 Q258 320 254 360"
            stroke="url(#goldSheen)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />

          {/* Bride Torso & Kanchipuram Saree Drape */}
          <path
            d="M236 190 L245 208 C260 216 278 230 285 255 L292 340 L232 340 L222 252 Z"
            fill="url(#silhouetteGrad)"
            stroke="url(#goldSheen)"
            strokeWidth="1"
          />

          {/* Rich Golden Zari Pallu draped across the bride */}
          <path
            d="M232 210 Q242 245 230 300 Q225 340 218 380 L238 380 Q250 330 260 270 Q265 235 250 212 Z"
            fill="url(#goldSheen)"
            opacity="0.88"
          />
          {/* Intricate Brocade / Zari Lines */}
          <path
            d="M234 225 Q245 250 238 290"
            stroke="#ffe57f"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Bride's Kalyana Maalai (Wedding Garland) */}
          <path
            d="M225 210 Q212 255 204 310 Q212 312 220 270 Q230 230 238 215"
            fill="url(#garlandGrad)"
            stroke="#b8860b"
            strokeWidth="0.8"
          />
          {/* Flower texture beads */}
          <circle cx="221" cy="235" r="3" fill="#ffe082" />
          <circle cx="216" cy="255" r="3.2" fill="#ef4444" />
          <circle cx="211" cy="275" r="3.4" fill="#ffe082" />
          <circle cx="206" cy="295" r="3.8" fill="#f59e0b" />

          {/* Traditional Gold Jhumka (Earrings) silhouette */}
          <path d="M224 172 L223 177 L226 177 Z" fill="#ffd700" />
          <circle cx="224.5" cy="179" r="1.5" fill="#ffd700" />
        </g>

        {/* ─── SACRED THIRUMANGALYAM / MANGALSUTRA KNOT MOMENT ─── */}
        <g id="sacred-union">
          {/* Hands meeting in ceremonial blessing (Hasthamelap) */}
          <path
            d="M176 270 Q200 278 222 270"
            stroke="url(#goldSheen)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Glowing Divine Union Sparkle */}
          <circle cx="199" cy="274" r="5" fill="#fff9d2" filter="drop-shadow(0 0 8px #ffd700)" />
          <path
            d="M199 265 L199 283 M190 274 L208 274"
            stroke="#ffd700"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* Lower Silk Drapes Flowing to the Floor */}
        <path
          d="M95 340 C110 390 145 420 195 425 C255 425 285 390 305 340 Z"
          fill="url(#silhouetteGrad)"
          stroke="url(#goldSheen)"
          strokeWidth="1.2"
        />
        {/* Intricate gold borders along bottom hem */}
        <path
          d="M108 360 Q195 395 292 360"
          stroke="url(#goldSheen)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M118 375 Q195 410 282 375"
          stroke="url(#goldSheen)"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          fill="none"
        />

        {/* Floating Sacred Akshata & Rose Petals */}
        <g opacity="0.8">
          <circle cx="130" cy="150" r="1.5" fill="#ffe082" />
          <circle cx="270" cy="140" r="1.5" fill="#fca5a5" />
          <circle cx="110" cy="210" r="2" fill="#ffd700" />
          <circle cx="290" cy="205" r="1.8" fill="#f87171" />
          <circle cx="140" cy="300" r="1.5" fill="#ffe082" />
          <circle cx="260" cy="310" r="2" fill="#fca5a5" />
          <circle cx="199" cy="160" r="1.2" fill="#ffd700" />
        </g>
      </svg>
    </div>
  );
}
