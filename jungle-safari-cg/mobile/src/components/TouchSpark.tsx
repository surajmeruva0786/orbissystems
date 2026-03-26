/**
 * TouchSpark — port of the web ClickSpark component.
 * Uses requestAnimationFrame + react-native-svg (no Reanimated).
 * Works on Expo Go (Old Architecture).
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';

// ── Types ────────────────────────────────────────────────────────────────────

interface SparkLine {
  x1: number; y1: number;
  x2: number; y2: number;
}

interface BurstData {
  id: number;
  x: number;
  y: number;
}

// ── SparkBurst — one tap's worth of animated lines ───────────────────────────

interface SparkBurstProps extends BurstData {
  sparkColor: string;
  sparkSize: number;
  sparkRadius: number;
  sparkCount: number;
  duration: number;
  onDone: () => void;
}

function SparkBurst({
  x, y, sparkColor, sparkSize, sparkRadius, sparkCount, duration, onDone,
}: SparkBurstProps) {
  const [lines, setLines] = useState<SparkLine[]>([]);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  // Pre-compute angles once
  const angles = useRef(
    Array.from({ length: sparkCount }, (_, i) => (2 * Math.PI * i) / sparkCount)
  ).current;

  useEffect(() => {
    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;

      if (elapsed >= duration) {
        setLines([]);
        onDone();
        return;
      }

      const t = elapsed / duration;
      const eased = t * (2 - t);             // ease-out — matches web default
      const distance = eased * sparkRadius;
      const lineLength = sparkSize * (1 - eased);

      setLines(
        angles.map(angle => ({
          x1: x + distance * Math.cos(angle),
          y1: y + distance * Math.sin(angle),
          x2: x + (distance + lineLength) * Math.cos(angle),
          y2: y + (distance + lineLength) * Math.sin(angle),
        }))
      );

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      {lines.map((l, i) => (
        <Line
          key={i}
          x1={l.x1} y1={l.y1}
          x2={l.x2} y2={l.y2}
          stroke={sparkColor}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

// ── TouchSpark — wrap any tree to get sparks on every tap ────────────────────

interface TouchSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  children: React.ReactNode;
}

export function TouchSpark({
  sparkColor = '#7C3AED',
  sparkSize = 10,
  sparkRadius = 25,
  sparkCount = 8,
  duration = 600,
  children,
}: TouchSparkProps) {
  const [bursts, setBursts] = useState<BurstData[]>([]);
  const idRef = useRef(0);
  const { width, height } = Dimensions.get('window');

  const handleTouch = useCallback((e: any) => {
    const { pageX, pageY } = e.nativeEvent;
    const id = ++idRef.current;
    setBursts(prev => [...prev, { id, x: pageX, y: pageY }]);
  }, []);

  const removeBurst = useCallback((id: number) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  }, []);

  return (
    <View style={styles.container} onTouchStart={handleTouch}>
      {children}

      {/* Fullscreen SVG overlay — never intercepts touches */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width={width} height={height}>
          {bursts.map(b => (
            <SparkBurst
              key={b.id}
              {...b}
              sparkColor={sparkColor}
              sparkSize={sparkSize}
              sparkRadius={sparkRadius}
              sparkCount={sparkCount}
              duration={duration}
              onDone={() => removeBurst(b.id)}
            />
          ))}
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
