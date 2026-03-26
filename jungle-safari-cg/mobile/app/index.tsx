import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { OrbisLogoLight, OrbisAppIcon } from '../src/components/OrbisLogo';

export default function LoginScreen() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    if (!employeeId || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/dashboard');
    }, 1200);
  }

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <OrbisAppIcon size={80} />
        <ActivityIndicator size="large" color="#7C3AED" style={{ marginTop: 24 }} />
        <Text style={styles.loadingTitle}>Signing you in...</Text>
        <Text style={styles.loadingSubtitle}>Please wait a moment</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header — Orbis logo + gov badge */}
          <View style={styles.appHeader}>
            <OrbisLogoLight width={180} height={43} />
            <View style={styles.govBadge}>
              <Text style={styles.govBadgeText}>Gov Portal</Text>
            </View>
          </View>

          {/* Hero — app icon + title */}
          <View style={styles.heroSection}>
            <OrbisAppIcon size={72} />
            <View style={styles.heroText}>
              <View style={styles.secureChip}>
                <View style={styles.secureChipDot} />
                <Text style={styles.secureChipText}>SECURE ACCESS PORTAL</Text>
              </View>
              <Text style={styles.pageTitle}>Jungle Safari Zoo{'\n'}Management</Text>
              <Text style={styles.pageSubtitle}>Zookeeper Portal</Text>
            </View>
          </View>

          {/* Login form */}
          <View style={styles.formCard}>
            {/* Form header */}
            <View style={styles.formHeader}>
              <View style={styles.formHeaderIcon}>
                <Ionicons name="people" size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.formTitle}>Zookeeper Login</Text>
                <Text style={styles.formSub}>Enter your credentials to continue</Text>
              </View>
            </View>

            {/* Employee ID */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Employee ID / Username</Text>
              <TextInput
                style={styles.textInput}
                value={employeeId}
                onChangeText={setEmployeeId}
                placeholder="Enter your employee ID"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotLink}>Forgot?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.passwordWrap}>
                <TextInput
                  style={[styles.textInput, { flex: 1, borderWidth: 0 }]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword((v) => !v)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={18}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign in button */}
            <TouchableOpacity
              style={[
                styles.signInBtn,
                (!employeeId || !password) && styles.signInBtnDisabled,
              ]}
              onPress={handleLogin}
              disabled={!employeeId || !password}
              activeOpacity={0.85}
            >
              <Text style={styles.signInBtnText}>Sign In to Dashboard</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Authorized Personnel Only</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Security notice */}
            <View style={styles.securityNotice}>
              <Ionicons name="warning" size={14} color="#92400E" />
              <Text style={styles.securityText}>
                <Text style={{ fontWeight: '700' }}>Security Notice: </Text>
                This is a government-authorized system. Unauthorized access is strictly prohibited.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>© 2024 Orbis Systems. All rights reserved.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PURPLE = '#7C3AED';
const ZOOKEEPER_BLUE = '#3B82F6';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F7FF' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 32 },

  // Loading
  loadingScreen: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F8F7FF', gap: 8,
  },
  loadingTitle: { fontSize: 16, fontWeight: '600', color: PURPLE, marginTop: 8 },
  loadingSubtitle: { fontSize: 13, color: '#6B7280' },

  // App header
  appHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 28,
  },
  govBadge: {
    backgroundColor: '#F3F4F6', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  govBadgeText: { fontSize: 11, fontWeight: '500', color: '#6B7280' },

  // Hero
  heroSection: {
    flexDirection: 'row', alignItems: 'center',
    gap: 16, marginBottom: 28,
    backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 18, borderWidth: 1, borderColor: '#EDE9FE',
    shadowColor: PURPLE, shadowOpacity: 0.06, shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  heroText: { flex: 1 },
  secureChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    marginBottom: 6,
  },
  secureChipDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: PURPLE },
  secureChipText: { fontSize: 9, fontWeight: '700', color: PURPLE, letterSpacing: 0.8 },
  pageTitle: { fontSize: 17, fontWeight: '700', color: '#0C0714', lineHeight: 24 },
  pageSubtitle: { fontSize: 12, color: PURPLE, fontWeight: '600', marginTop: 4 },

  // Form
  formCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 20, marginBottom: 20,
    borderWidth: 1, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  formHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  formHeaderIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: ZOOKEEPER_BLUE,
    alignItems: 'center', justifyContent: 'center',
  },
  formTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  formSub: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  fieldGroup: { marginBottom: 16 },
  fieldLabelRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 6,
  },
  fieldLabel: { fontSize: 13, fontWeight: '500', color: '#374151', marginBottom: 6 },
  forgotLink: { fontSize: 12, fontWeight: '600', color: PURPLE },
  textInput: {
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, color: '#111827',
  },
  passwordWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 10, paddingRight: 12,
  },
  eyeBtn: { padding: 4 },
  signInBtn: {
    backgroundColor: PURPLE, borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', marginBottom: 16,
    shadowColor: PURPLE, shadowOpacity: 0.3, shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }, elevation: 4,
  },
  signInBtnDisabled: { opacity: 0.5 },
  signInBtnText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },
  securityNotice: {
    flexDirection: 'row', gap: 8,
    backgroundColor: '#FFFBEB', borderWidth: 1, borderColor: '#FDE68A',
    borderRadius: 10, padding: 12,
  },
  securityText: { fontSize: 12, color: '#92400E', flex: 1, lineHeight: 18 },

  footer: { fontSize: 11, color: '#D1D5DB', textAlign: 'center' },
});
