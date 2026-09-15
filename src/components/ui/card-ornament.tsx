import { useId } from "react";

const paisley = "M 53 286 C 59 222 9 184 15 112 C 20 43 75 12 123 34 C 180 59 177 132 140 175 C 111 209 66 224 53 286 Z";

/** Tonal, vector-drawn paisley ornaments inspired by traditional botanical linework. */
export default function CardOrnament({ variant }: { variant: number }) {
  const id = useId().replace(/:/g, "");
  const motif = `${id}-motif`;
  const pattern = `${id}-pattern`;
  const clip = `${id}-clip`;

  return (
    <svg className={`adat-hero-pattern adat-hero-pattern-${variant}`} viewBox="0 0 300 360" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={pattern} width="44" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <path d="M2 26C2 3 39 2 39 24C39 45 10 46 10 27C10 13 31 13 31 26C31 35 18 35 18 27C18 23 24 23 24 27M-9 49C4 34 10 49 20 49S36 39 48 49M0 0L8 7L16 0M30 0L38 7L46 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M1 13L5 10M39 37L43 34M3 48L7 51M27 46L30 50" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </pattern>
        <clipPath id={clip}><path d={paisley} /></clipPath>
        <g id={motif}>
          <path d={paisley} fill={`url(#${pattern})`} stroke="currentColor" strokeWidth="2" />
          <g clipPath={`url(#${clip})`}>
            {[0.92, 0.82, 0.72].map((scale, index) => (
              <path key={scale} d={paisley} transform={`translate(${80 * (1 - scale)} ${148 * (1 - scale)}) scale(${scale})`} stroke="currentColor" strokeWidth={index === 1 ? 5 : 2} strokeDasharray={index === 1 ? "1 7" : undefined} strokeLinecap="round" />
            ))}
            <path d="M54 266C82 187 139 170 144 111C148 69 115 49 90 62C58 79 70 115 95 112C115 109 115 84 99 84C87 84 85 99 96 100" stroke="currentColor" strokeWidth="3" />
            <path d="M48 219C32 187 34 153 48 133C75 150 76 177 48 219ZM48 206L49 146M48 183L37 165M49 175L60 158" stroke="currentColor" strokeWidth="2" />
          </g>
        </g>
      </defs>
      {variant === 1 ? (
        <g transform="translate(150 175) rotate(24)">
          <use href={`#${motif}`} transform="translate(-8 -140) rotate(-24) scale(.62 .58)" />
          <use href={`#${motif}`} transform="translate(8 -140) rotate(24) scale(-.62 .58)" />
          <use href={`#${motif}`} transform="translate(-9 116) rotate(155) scale(.45 .47)" />
          <use href={`#${motif}`} transform="translate(9 116) rotate(-155) scale(-.45 .47)" />
          <path d="M0-55C-8-20-7 35 0 72C7 35 8-20 0-55ZM-2-50Q-23-92-42-87M2-50Q23-92 42-87" stroke="currentColor" strokeWidth="2" />
        </g>
      ) : variant === 4 ? (
        <g>
          <use href={`#${motif}`} transform="translate(65 -85) rotate(40 80 140) scale(.85)" />
          <use href={`#${motif}`} transform="translate(184 140) rotate(35) scale(.42)" />
          <use href={`#${motif}`} transform="translate(55 140) rotate(-60) scale(.38)" />
        </g>
      ) : (
        <g transform={variant === 2 ? "translate(50 -15) rotate(12 100 180)" : variant === 3 ? "translate(40 -85) rotate(-32 100 180) scale(1.25)" : "translate(15 5) scale(1.25)"}>
          <use href={`#${motif}`} />
          <path d="M55 295C105 230 180 237 191 154C198 108 177 65 161 45M65 286C125 240 195 232 204 157" stroke="currentColor" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}
