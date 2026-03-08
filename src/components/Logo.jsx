import styles from './Logo.module.css'

const Logo = ({ variant = 'light', size = 42 }) => {
  const isDark = variant === 'dark'
  const cream = 'rgba(245,239,230,'
  const gold = 'rgba(201,169,110,'
  const outerStroke = isDark ? `${cream}0.35)` : '#1C1510'
  const ringStroke = isDark ? `${gold}0.55)` : '#1C1510'
  const southFill = isDark ? `${cream}0.5)` : '#1C1510'
  const eastFill = isDark ? `${cream}0.5)` : '#1C1510'
  const westFill = isDark ? `${cream}0.5)` : '#1C1510'
  const ordinalFill = isDark ? `${cream}0.25)` : '#1C1510'
  const crosshairStroke = isDark ? `${cream}0.15)` : '#1C1510'
  const gFill = isDark ? `${cream}0.88)` : '#1C1510'
  const maskId = `ring-mask-${variant}-${Math.random().toString(36).slice(2, 7)}`

  return (
    <svg
      className={styles.logoWrap}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id={maskId}>
          <rect width="200" height="200" fill="white" />
          <polygon points="100,3 107,30 100,60 93,30" fill="black" />
          <polygon points="100,197 107,170 100,140 93,170" fill="black" />
          <polygon points="197,100 170,93 140,100 170,107" fill="black" />
          <polygon points="3,100 30,93 60,100 30,107" fill="black" />
          <polygon points="100,12 104.5,30 100,52 95.5,30" fill="black" transform="rotate(45,100,100)" />
          <polygon points="100,12 104.5,30 100,52 95.5,30" fill="black" transform="rotate(135,100,100)" />
          <polygon points="100,12 104.5,30 100,52 95.5,30" fill="black" transform="rotate(225,100,100)" />
          <polygon points="100,12 104.5,30 100,52 95.5,30" fill="black" transform="rotate(315,100,100)" />
        </mask>
      </defs>
      <g className={styles.compass} opacity="0.72">
        <circle cx="100" cy="100" r="95" stroke={outerStroke} strokeWidth="1.25" />
        <circle cx="100" cy="100" r="62" stroke={ringStroke} strokeWidth="0.85" strokeDasharray="2.5 5.5" opacity="0.55" mask={`url(#${maskId})`} />
        <polygon points="100,5 105,30 100,58 95,30" fill="#8C3B24" />
        <polygon points="100,195 105,170 100,142 95,170" fill={southFill} />
        <polygon points="195,100 170,95 142,100 170,105" fill={eastFill} />
        <polygon points="5,100 30,95 58,100 30,105" fill={westFill} />
        <polygon points="100,14 103.5,30 100,50 96.5,30" fill={ordinalFill} opacity="0.4" transform="rotate(45,100,100)" />
        <polygon points="100,14 103.5,30 100,50 96.5,30" fill={ordinalFill} opacity="0.4" transform="rotate(135,100,100)" />
        <polygon points="100,14 103.5,30 100,50 96.5,30" fill={ordinalFill} opacity="0.4" transform="rotate(225,100,100)" />
        <polygon points="100,14 103.5,30 100,50 96.5,30" fill={ordinalFill} opacity="0.4" transform="rotate(315,100,100)" />
        <line x1="100" y1="82" x2="100" y2="118" stroke={crosshairStroke} strokeWidth="0.6" opacity="0.09" />
        <line x1="82" y1="100" x2="118" y2="100" stroke={crosshairStroke} strokeWidth="0.6" opacity="0.09" />
        <circle cx="100" cy="100" r="2" fill={crosshairStroke} opacity="0.09" />
      </g>
      <text x="100" y="100" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="62" fontWeight="500" fill={gFill} textAnchor="middle" dominantBaseline="central">G</text>
    </svg>
  )
}

export default Logo
