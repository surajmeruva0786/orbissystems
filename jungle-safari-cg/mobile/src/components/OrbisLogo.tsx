import React from 'react';
import Svg, { Circle, Path, Text, Defs, LinearGradient, Stop, Rect, G } from 'react-native-svg';

// Full wordmark — dark-background variant (matches orbis-logo-dark.svg brand spec exactly)
// Circle: #A78BFA | Arc gradient: #C4B5FD→#8B5CF6 | ORBIS: white | SYSTEMS: #A78BFA
// ViewBox trimmed to content bounds (x=12..188, y=10..68) so the mark centers naturally.
export function OrbisLogoOnDark({ width = 220, height = 52 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="12 10 176 58" fill="none">
      <Defs>
        {/* gradient coords are absolute (G translate(40,40) + arc endpoints ±22,-18) */}
        <LinearGradient id="pD1" x1="18" y1="22" x2="62" y2="22">
          <Stop offset="0%" stopColor="#C4B5FD" />
          <Stop offset="100%" stopColor="#8B5CF6" />
        </LinearGradient>
      </Defs>
      {/* Icon mark */}
      <G transform="translate(40, 40)">
        <Circle cx={0} cy={0} r={26} stroke="#A78BFA" strokeWidth={4.5} fill="none" />
        <Path
          d="M-22,-18 A34,34 0 0,1 22,-18"
          stroke="url(#pD1)"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx={0} cy={0} r={4.5} fill="#A78BFA" />
      </G>
      {/* ORBIS — Instrument Sans Bold */}
      <Text
        x={84}
        y={33}
        fontFamily="serif"
        fontWeight="700"
        fontSize={30}
        fill="#FFFFFF"
      >
        ORBIS
      </Text>
      {/* SYSTEMS — DM Sans Medium, 0.22em letter-spacing at 14px ≈ 3.08px */}
      <Text
        x={84}
        y={56}
        fontFamily="sans-serif"
        fontWeight="500"
        fontSize={14}
        fill="#A78BFA"
        letterSpacing={3.08}
      >
        SYSTEMS
      </Text>
    </Svg>
  );
}

// Full wordmark — "ORBIS / SYSTEMS" with icon mark (light background variant)
export function OrbisLogoLight({ width = 220, height = 52 }: { width?: number; height?: number }) {
  const scale = width / 340;
  return (
    <Svg width={width} height={height} viewBox="0 0 340 80" fill="none">
      <Defs>
        <LinearGradient id="pL1" x1="18" y1="22" x2="62" y2="22">
          <Stop offset="0%" stopColor="#A78BFA" />
          <Stop offset="100%" stopColor="#6D28D9" />
        </LinearGradient>
      </Defs>
      {/* Icon mark */}
      <G transform="translate(40, 40)">
        <Circle cx={0} cy={0} r={26} stroke="#7C3AED" strokeWidth={4.5} fill="none" />
        <Path
          d="M-22,-18 A34,34 0 0,1 22,-18"
          stroke="url(#pL1)"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx={0} cy={0} r={4.5} fill="#7C3AED" />
      </G>
      {/* ORBIS */}
      <Text
        x={84}
        y={33}
        fontFamily="serif"
        fontWeight="700"
        fontSize={30}
        fill="#0C0714"
      >
        ORBIS
      </Text>
      {/* SYSTEMS */}
      <Text
        x={85}
        y={56}
        fontFamily="sans-serif"
        fontWeight="500"
        fontSize={13}
        fill="#7C3AED"
        letterSpacing={3.5}
      >
        SYSTEMS
      </Text>
    </Svg>
  );
}

// Icon mark only (small, for compact use)
export function OrbisIconMark({ size = 44 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        <LinearGradient id="iM" x1="10" y1="14" x2="54" y2="14">
          <Stop offset="0%" stopColor="#A78BFA" />
          <Stop offset="100%" stopColor="#6D28D9" />
        </LinearGradient>
      </Defs>
      <G transform="translate(32, 32)">
        <Circle cx={0} cy={0} r={26} stroke="#7C3AED" strokeWidth={4.5} fill="none" />
        <Path
          d="M-22,-18 A34,34 0 0,1 22,-18"
          stroke="url(#iM)"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx={0} cy={0} r={4.5} fill="#7C3AED" />
      </G>
    </Svg>
  );
}

// App icon style — gradient rounded square (for splash / large display)
export function OrbisAppIcon({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
      <Defs>
        <LinearGradient id="appBg" x1="0" y1="0" x2="512" y2="512">
          <Stop offset="0%" stopColor="#8B5CF6" />
          <Stop offset="100%" stopColor="#4C1D95" />
        </LinearGradient>
      </Defs>
      <Rect width={512} height={512} rx={112} fill="url(#appBg)" />
      <G transform="translate(256, 256)">
        <Circle cx={0} cy={0} r={136} stroke="white" strokeWidth={22} fill="none" />
        <Path
          d="M-112,-96 A176,176 0 0,1 112,-96"
          stroke="white"
          strokeWidth={20}
          strokeLinecap="round"
          fill="none"
          opacity={0.55}
        />
        <Circle cx={0} cy={0} r={26} fill="white" opacity={0.85} />
      </G>
    </Svg>
  );
}
