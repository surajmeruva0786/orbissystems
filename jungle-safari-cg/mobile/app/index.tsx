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

type RoleId = 'zookeeper' | 'vet' | 'forest-officer' | 'admin';

interface Role {
  id: RoleId;
  title: string;
  titleHindi: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
}

const roles: Role[] = [
  {
    id: 'zookeeper',
    title: 'Zookeeper',
    titleHindi: 'चिड़ियाघर कर्मी',
    description: 'Daily monitoring & animal care',
    icon: 'people',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
  },
  {
    id: 'vet',
    title: 'Veterinarian',
    titleHindi: 'पशु चिकित्सक',
    description: 'Medical records & treatment',
    icon: 'medkit',
    color: '#10B981',
    bgColor: '#ECFDF5',
  },
  {
    id: 'forest-officer',
    title: 'Forest Officer',
    titleHindi: 'वन अधिकारी',
    description: 'Analytics & inventory management',
    icon: 'leaf',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
  },
  {
    id: 'admin',
    title: 'Administrator',
    titleHindi: 'प्रशासक',
    description: 'System-wide management',
    icon: 'shield-checkmark',
    color: '#F97316',
    bgColor: '#FFF7ED',
  },
];

export default function LoginScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentRole = roles.find((r) => r.id === selectedRole);

  function handleLogin() {
    if (!selectedRole || !employeeId || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === 'zookeeper') {
        router.replace('/dashboard');
      }
      // Other roles would route elsewhere
    }, 1200);
  }

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text style={styles.loadingTitle}>Signing you in...</Text>
          <Text style={styles.loadingSubtitle}>Please wait a moment</Text>
        </View>
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
          {/* Header */}
          <View style={styles.appHeader}>
            <View style={styles.logoMark}>
              <Ionicons name="leaf" size={22} color="#7C3AED" />
            </View>
            <View>
              <Text style={styles.logoText}>Jungle Safari Zoo</Text>
              <Text style={styles.logoTag}>Management System</Text>
            </View>
            <View style={styles.govBadge}>
              <Text style={styles.govBadgeText}>Gov Portal</Text>
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleSection}>
            <View style={styles.secureChip}>
              <View style={styles.secureChipDot} />
              <Text style={styles.secureChipText}>SECURE ACCESS PORTAL</Text>
            </View>
            <Text style={styles.pageTitle}>Select your role to sign in</Text>
          </View>

          {/* Role cards */}
          <View style={styles.rolesSection}>
            <Text style={styles.sectionLabel}>Select Your Role</Text>
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <TouchableOpacity
                  key={role.id}
                  style={[styles.roleCard, isSelected && styles.roleCardSelected]}
                  onPress={() => setSelectedRole(role.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.roleIcon,
                      { backgroundColor: isSelected ? role.color : '#F3F4F6' },
                    ]}
                  >
                    <Ionicons
                      name={role.icon}
                      size={20}
                      color={isSelected ? '#FFFFFF' : '#6B7280'}
                    />
                  </View>
                  <View style={styles.roleTextWrap}>
                    <Text style={styles.roleTitle}>{role.title}</Text>
                    <Text style={styles.roleDesc}>{role.description}</Text>
                  </View>
                  {isSelected ? (
                    <View style={styles.checkCircle}>
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    </View>
                  ) : (
                    <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Login form */}
          {selectedRole ? (
            <View style={styles.formCard}>
              {/* Form header */}
              <View style={styles.formHeader}>
                <View
                  style={[
                    styles.formHeaderIcon,
                    { backgroundColor: currentRole?.color ?? '#7C3AED' },
                  ]}
                >
                  <Ionicons name={currentRole?.icon ?? 'person'} size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.formTitle}>{currentRole?.title} Login</Text>
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
          ) : (
            <View style={styles.placeholderCard}>
              <Ionicons name="shield-checkmark-outline" size={36} color="#D1D5DB" />
              <Text style={styles.placeholderTitle}>Select Your Role</Text>
              <Text style={styles.placeholderSub}>
                Choose your designated role above to access the login form
              </Text>
            </View>
          )}

          {/* Footer */}
          <Text style={styles.footer}>© 2024 Orbis Systems. All rights reserved.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PURPLE = '#7C3AED';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F7FF' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },

  // Loading
  loadingScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F7FF' },
  loadingBox: { alignItems: 'center', gap: 12 },
  loadingTitle: { fontSize: 16, fontWeight: '600', color: PURPLE },
  loadingSubtitle: { fontSize: 13, color: '#6B7280' },

  // App header
  appHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24,
  },
  logoMark: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontSize: 15, fontWeight: '700', color: '#111827' },
  logoTag: { fontSize: 11, color: '#6B7280' },
  govBadge: {
    marginLeft: 'auto',
    backgroundColor: '#F3F4F6', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  govBadgeText: { fontSize: 11, fontWeight: '500', color: '#6B7280' },

  // Title
  titleSection: { alignItems: 'center', marginBottom: 24 },
  secureChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#F5F3FF', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5, marginBottom: 10,
  },
  secureChipDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: PURPLE },
  secureChipText: { fontSize: 10, fontWeight: '700', color: PURPLE, letterSpacing: 0.8 },
  pageTitle: { fontSize: 22, fontWeight: '700', color: '#111827', textAlign: 'center' },

  // Roles
  rolesSection: { marginBottom: 20 },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 10 },
  roleCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 14,
    padding: 14, marginBottom: 10,
    borderWidth: 1.5, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  roleCardSelected: {
    borderColor: PURPLE,
    shadowColor: PURPLE, shadowOpacity: 0.12, shadowRadius: 8,
    elevation: 3,
  },
  roleIcon: {
    width: 42, height: 42, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  roleTextWrap: { flex: 1 },
  roleTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  roleDesc: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  checkCircle: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: PURPLE, alignItems: 'center', justifyContent: 'center',
  },

  // Form
  formCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 20, marginBottom: 20,
    borderWidth: 1, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  formHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  formHeaderIcon: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  formTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  formSub: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  fieldGroup: { marginBottom: 16 },
  fieldLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
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
    shadowColor: PURPLE, shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
    elevation: 4,
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

  // Placeholder
  placeholderCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    borderWidth: 2, borderColor: '#E5E7EB', borderStyle: 'dashed',
    padding: 40, alignItems: 'center', marginBottom: 20,
  },
  placeholderTitle: { fontSize: 16, fontWeight: '700', color: '#374151', marginTop: 12, marginBottom: 6 },
  placeholderSub: { fontSize: 13, color: '#9CA3AF', textAlign: 'center', lineHeight: 20 },

  footer: { fontSize: 11, color: '#D1D5DB', textAlign: 'center' },
});
