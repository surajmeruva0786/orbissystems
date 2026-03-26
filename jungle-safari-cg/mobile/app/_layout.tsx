import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { OrbisLogoOnDark, OrbisAppIcon } from '../src/components/OrbisLogo';

const { width, height } = Dimensions.get('window');

type Phase = 'lottie' | 'logo' | 'app';

export default function RootLayout() {
  const [phase, setPhase] = useState<Phase>('lottie');

  // Opacities for cross-fade transitions
  const lottieOpacity = useRef(new Animated.Value(1)).current;
  const logoOpacity  = useRef(new Animated.Value(0)).current;
  const appOpacity   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // ── Phase 1: Lottie plays for 3 s then fades out ──────────────────────
    const lottieTimer = setTimeout(() => {
      Animated.timing(lottieOpacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        setPhase('logo');

        // ── Phase 2: Orbis logo fades in, holds 2.5 s, fades out ──────────
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          const logoHold = setTimeout(() => {
            Animated.timing(logoOpacity, {
              toValue: 0,
              duration: 700,
              useNativeDriver: true,
            }).start(() => {
              setPhase('app');

              // ── Phase 3: App fades in ──────────────────────────────────
              Animated.timing(appOpacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }).start();
            });
          }, 2500);

          return () => clearTimeout(logoHold);
        });
      });
    }, 3000);

    return () => clearTimeout(lottieTimer);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style={phase === 'logo' ? 'light' : 'dark'} />

      {/* ── Phase 3: Main app stack (always mounted, fades in last) ── */}
      <Animated.View style={[styles.fill, { opacity: appOpacity }]}
        pointerEvents={phase === 'app' ? 'auto' : 'none'}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="dashboard" />
        </Stack>
      </Animated.View>

      {/* ── Phase 1: Lottie welcome animation ── */}
      {phase === 'lottie' && (
        <Animated.View style={[styles.splash, styles.lottieBg, { opacity: lottieOpacity }]}>
          <LottieView
            source={require('../assets/welcome.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </Animated.View>
      )}

      {/* ── Phase 2: Orbis full-screen brand splash ── */}
      {phase === 'logo' && (
        <Animated.View style={[styles.splash, styles.logoBg, { opacity: logoOpacity }]}>

          {/* Decorative concentric orbit rings */}
          <Svg style={StyleSheet.absoluteFillObject} viewBox={`0 0 ${width} ${height}`} fill="none">
            <Defs>
              <LinearGradient id="arcGlow" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
                <Stop offset="50%" stopColor="#A78BFA" stopOpacity="0.5" />
                <Stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            {/* Outer ring */}
            <Circle
              cx={width / 2} cy={height / 2}
              r={height * 0.40}
              stroke="#7C3AED" strokeWidth={1} opacity={0.14}
            />
            {/* Mid ring */}
            <Circle
              cx={width / 2} cy={height / 2}
              r={height * 0.30}
              stroke="#7C3AED" strokeWidth={1} opacity={0.10}
            />
            {/* Inner ring */}
            <Circle
              cx={width / 2} cy={height / 2}
              r={height * 0.20}
              stroke="#A78BFA" strokeWidth={1} opacity={0.08}
            />
            {/* Decorative arc — top */}
            <Path
              d={`M ${width * 0.08},${height * 0.28} A ${height * 0.40},${height * 0.40} 0 0,1 ${width * 0.92},${height * 0.28}`}
              stroke="#A78BFA"
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.22}
              fill="none"
            />
            {/* Decorative arc — bottom */}
            <Path
              d={`M ${width * 0.15},${height * 0.75} A ${height * 0.35},${height * 0.35} 0 0,0 ${width * 0.85},${height * 0.75}`}
              stroke="#6D28D9"
              strokeWidth={1}
              strokeLinecap="round"
              opacity={0.15}
              fill="none"
            />
          </Svg>

          {/* Icon with layered glow */}
          <View style={styles.iconWrapper}>
            <View style={styles.glowOuter} />
            <View style={styles.glowInner} />
            <OrbisAppIcon size={116} />
          </View>

          {/* Wordmark */}
          <View style={styles.wordmarkWrap}>
            <OrbisLogoOnDark width={256} height={60} />
          </View>

          {/* Thin rule + tagline */}
          <View style={styles.taglineRow}>
            <View style={styles.taglineLine} />
            <Text style={styles.taglineText}>GOVERNMENT MANAGEMENT PLATFORM</Text>
            <View style={styles.taglineLine} />
          </View>

          {/* Bottom badge */}
          <View style={styles.bottomBadge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>SECURE  ·  AUTHORIZED  ·  OFFICIAL</Text>
          </View>

        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  fill: { ...StyleSheet.absoluteFillObject },

  splash: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  // Phase 1 — white background matching web welcome animation
  lottieBg: {
    backgroundColor: '#FFFFFF',
  },
  lottie: {
    width: width * 0.88,
    height: width * 0.88 * (123 / 428),
  },

  // Phase 2 — deep brand background
  logoBg: {
    backgroundColor: '#0C0714',
  },

  // Icon glow layers
  iconWrapper: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOuter: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#7C3AED',
    opacity: 0.10,
  },
  glowInner: {
    position: 'absolute',
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: '#A78BFA',
    opacity: 0.13,
  },

  // Wordmark
  wordmarkWrap: {
    marginTop: 20,
  },

  // Tagline divider
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 26,
    paddingHorizontal: 36,
    width: '100%',
  },
  taglineLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(139,92,246,0.28)',
  },
  taglineText: {
    fontSize: 8,
    fontWeight: '600',
    color: '#6D4FA0',
    letterSpacing: 1.8,
  },

  // Bottom security badge
  bottomBadge: {
    position: 'absolute',
    bottom: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#6D28D9',
    opacity: 0.6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#3D2566',
    letterSpacing: 2.2,
  },
});
