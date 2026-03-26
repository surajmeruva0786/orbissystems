import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { mockAnimals, mockInstructions, mockReminders } from '../src/data/mockData';
import { InstructionsPanel } from '../src/components/InstructionsPanel';
import { DailyLogModal } from '../src/components/DailyLogModal';
import { Animal } from '../src/types';

type LogShift = 'morning' | 'evening';

const HEALTH_COLORS: Record<string, { bg: string; text: string }> = {
  Excellent: { bg: '#DCFCE7', text: '#15803D' },
  Good:      { bg: '#DBEAFE', text: '#1D4ED8' },
  Fair:      { bg: '#FEF9C3', text: '#A16207' },
  Poor:      { bg: '#FEE2E2', text: '#B91C1C' },
  Critical:  { bg: '#FEE2E2', text: '#7F1D1D' },
};

function getShiftLabel() {
  const h = new Date().getHours();
  return h >= 6 && h < 14 ? 'Morning' : 'Evening';
}

function isMorningShift() {
  const h = new Date().getHours();
  return h >= 6 && h < 14;
}

export default function ZookeeperDashboard() {
  const router = useRouter();
  const [logModal, setLogModal] = useState<{ animal: Animal; shift: LogShift } | null>(null);
  const [remindersVisible, setRemindersVisible] = useState(false);
  const [loggedIds, setLoggedIds] = useState<Set<string>>(new Set());

  const currentShift = getShiftLabel();
  const morning = isMorningShift();

  const pendingCount = mockAnimals.filter((a) =>
    morning ? a.morningLogStatus !== 'completed' : a.eveningLogStatus !== 'completed',
  ).length;

  const criticalCount = mockAnimals.filter(
    (a) => a.health === 'Critical' || a.health === 'Poor',
  ).length;

  function openLog(animal: Animal, shift: LogShift) {
    setLogModal({ animal, shift });
  }

  function handleLogSubmit(data: any) {
    if (logModal) {
      setLoggedIds((prev) => new Set(prev).add(logModal.animal.id + logModal.shift));
    }
    setLogModal(null);
  }

  function getStatus(animal: Animal, shift: LogShift) {
    const isLogged = loggedIds.has(animal.id + shift);
    if (isLogged) return 'completed';
    return shift === 'morning' ? animal.morningLogStatus : animal.eveningLogStatus;
  }

  function renderLogButton(animal: Animal, shift: LogShift) {
    const status = getStatus(animal, shift);
    if (status === 'completed') {
      return (
        <View style={styles.logCompleted}>
          <Ionicons name="checkmark" size={13} color="#15803D" />
          <Text style={styles.logCompletedText}>Logged</Text>
        </View>
      );
    }
    const isOverdue = status === 'overdue';
    return (
      <TouchableOpacity
        style={[styles.logBtn, isOverdue && styles.logBtnOverdue]}
        onPress={() => openLog(animal, shift)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={13} color="#FFFFFF" />
        <Text style={styles.logBtnText}>{isOverdue ? 'Log Now' : 'Add Log'}</Text>
      </TouchableOpacity>
    );
  }

  function renderStatusIcon(status: string) {
    if (status === 'completed') return <Ionicons name="checkmark-circle" size={14} color="#15803D" />;
    if (status === 'overdue') return <Ionicons name="alert-circle" size={14} color="#B91C1C" />;
    return <Ionicons name="time" size={14} color="#F97316" />;
  }

  function renderAnimalCard({ item }: { item: Animal }) {
    const morningStatus = getStatus(item, 'morning');
    const eveningStatus = getStatus(item, 'evening');
    const needsAttention =
      morningStatus === 'overdue' ||
      eveningStatus === 'overdue' ||
      item.health === 'Critical' ||
      item.health === 'Poor';
    const hc = HEALTH_COLORS[item.health] ?? HEALTH_COLORS.Fair;

    return (
      <View style={[styles.animalCard, needsAttention && styles.animalCardAlert]}>
        {/* Top row: image + info */}
        <View style={styles.animalHeader}>
          <Image source={{ uri: item.image }} style={styles.animalImage} />
          <View style={styles.animalInfo}>
            <Text style={styles.animalName}>{item.name}</Text>
            <Text style={styles.animalNameHindi}>{item.nameHindi}</Text>
            <Text style={styles.animalSpecies}>{item.species} • {item.enclosure}</Text>
            <View style={[styles.healthBadge, { backgroundColor: hc.bg }]}>
              <Text style={[styles.healthText, { color: hc.text }]}>{item.health}</Text>
            </View>
          </View>
          {needsAttention && (
            <Ionicons name="alert-circle" size={18} color="#EF4444" style={{ marginTop: 2 }} />
          )}
        </View>

        {/* Log status row */}
        <View style={styles.logRow}>
          {/* Morning */}
          <View style={styles.logCell}>
            <View style={styles.logLabelRow}>
              {renderStatusIcon(morningStatus)}
              <Text style={styles.logLabel}>Morning</Text>
            </View>
            {renderLogButton(item, 'morning')}
          </View>

          <View style={styles.logDivider} />

          {/* Evening */}
          <View style={styles.logCell}>
            <View style={styles.logLabelRow}>
              {renderStatusIcon(eveningStatus)}
              <Text style={styles.logLabel}>Evening</Text>
            </View>
            {renderLogButton(item, 'evening')}
          </View>
        </View>
      </View>
    );
  }

  const ListHeader = () => (
    <View>
      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{mockAnimals.length}</Text>
          <Text style={styles.statLabel}>Total Animals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, pendingCount > 0 && { color: '#F97316' }]}>
            {pendingCount}
          </Text>
          <Text style={styles.statLabel}>Pending Logs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, criticalCount > 0 && { color: '#EF4444' }]}>
            {criticalCount}
          </Text>
          <Text style={styles.statLabel}>Health Alerts</Text>
        </View>
      </View>

      {/* Instructions */}
      <InstructionsPanel instructions={mockInstructions} />

      {/* Animals title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Animals — Daily Logs</Text>
        <Text style={styles.sectionSub}>
          Morning: 11 AM–1 PM  |  Evening: 4–6 PM
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.nameText}>Hello, Zookeeper! 👋</Text>
          <Text style={styles.shiftText}>
            Current Shift: <Text style={styles.shiftBold}>{currentShift}</Text>
          </Text>
        </View>

        {/* Reminders bell */}
        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => setRemindersVisible(true)}
        >
          <Ionicons name="notifications" size={22} color="#374151" />
          {mockReminders.length > 0 && (
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>{mockReminders.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="log-out-outline" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Animal list */}
      <FlatList
        data={mockAnimals}
        keyExtractor={(item) => item.id}
        renderItem={renderAnimalCard}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Daily Log Modal */}
      {logModal && (
        <DailyLogModal
          visible={!!logModal}
          onClose={() => setLogModal(null)}
          onSubmit={handleLogSubmit}
          animalName={logModal.animal.name}
          shift={logModal.shift.charAt(0).toUpperCase() + logModal.shift.slice(1)}
        />
      )}

      {/* Reminders Modal */}
      <Modal
        visible={remindersVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setRemindersVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setRemindersVisible(false)}>
          <Pressable style={styles.remindersSheet}>
            <View style={styles.remindersHeader}>
              <View>
                <Text style={styles.remindersTitle}>Log Reminders</Text>
                <Text style={styles.remindersSub}>Action required for these animals</Text>
              </View>
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingBadgeText}>{mockReminders.length} pending</Text>
              </View>
            </View>

            {mockReminders.map((r, idx) => (
              <View
                key={r.id}
                style={[styles.reminderItem, idx < mockReminders.length - 1 && styles.reminderBorder]}
              >
                <View style={[styles.reminderIcon, { backgroundColor: r.urgent ? '#FEE2E2' : '#FEF3C7' }]}>
                  <Ionicons
                    name="warning"
                    size={18}
                    color={r.urgent ? '#B91C1C' : '#D97706'}
                  />
                </View>
                <View style={styles.reminderContent}>
                  <View style={styles.reminderNameRow}>
                    <Text style={styles.reminderAnimal}>{r.animalName}</Text>
                    {r.urgent && (
                      <View style={styles.urgentBadge}>
                        <Text style={styles.urgentBadgeText}>Urgent</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.reminderShift}>{r.shift} shift log missing</Text>
                  <View style={styles.reminderTimeRow}>
                    <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                    <Text style={styles.reminderTime}>{r.time}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.logNowBtn}
                  onPress={() => {
                    const animal = mockAnimals.find((a) => a.name === r.animalName);
                    if (animal) {
                      setRemindersVisible(false);
                      openLog(animal, r.shift.toLowerCase() as LogShift);
                    }
                  }}
                >
                  <Text style={styles.logNowText}>Log Now</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.closeReminders}
              onPress={() => setRemindersVisible(false)}
            >
              <Text style={styles.closeRemindersText}>Close</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFBFC' },

  // Top bar
  topBar: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingHorizontal: 16, paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
    gap: 10,
  },
  welcomeText: { fontSize: 11, color: '#9CA3AF' },
  nameText: { fontSize: 20, fontWeight: '700', color: '#111827' },
  shiftText: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  shiftBold: { fontWeight: '700', color: '#7C3AED' },
  bellBtn: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    alignItems: 'center', justifyContent: 'center',
  },
  bellBadge: {
    position: 'absolute', top: -4, right: -4,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center',
  },
  bellBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  logoutBtn: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    alignItems: 'center', justifyContent: 'center',
  },

  // List
  listContent: { paddingHorizontal: 12, paddingTop: 14, paddingBottom: 30 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E5E7EB',
  },
  statValue: { fontSize: 22, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },

  // Section header
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  sectionSub: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },

  // Animal card
  animalCard: {
    backgroundColor: '#FFFFFF', borderRadius: 14,
    borderWidth: 1, borderColor: '#E5E7EB',
    marginBottom: 12, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  animalCardAlert: { borderColor: '#FECACA', backgroundColor: '#FFFBFB' },
  animalHeader: { flexDirection: 'row', padding: 14, gap: 12 },
  animalImage: { width: 62, height: 62, borderRadius: 10 },
  animalInfo: { flex: 1 },
  animalName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  animalNameHindi: { fontSize: 11, color: '#9CA3AF', marginTop: 1 },
  animalSpecies: { fontSize: 12, color: '#6B7280', marginTop: 2, marginBottom: 6 },
  healthBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  healthText: { fontSize: 11, fontWeight: '600' },

  // Log row
  logRow: {
    flexDirection: 'row',
    borderTopWidth: 1, borderTopColor: '#F3F4F6',
  },
  logCell: { flex: 1, padding: 12, gap: 8 },
  logDivider: { width: 1, backgroundColor: '#F3F4F6' },
  logLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  logLabel: { fontSize: 12, fontWeight: '500', color: '#6B7280' },
  logBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#6366F1', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start',
  },
  logBtnOverdue: { backgroundColor: '#EF4444' },
  logBtnText: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
  logCompleted: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  logCompletedText: { fontSize: 12, fontWeight: '500', color: '#15803D' },

  // Reminders modal
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  remindersSheet: {
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingTop: 4, paddingBottom: 24,
  },
  remindersHeader: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  remindersTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  remindersSub: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  pendingBadge: {
    backgroundColor: '#FEE2E2', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  pendingBadgeText: { fontSize: 12, fontWeight: '600', color: '#B91C1C' },
  reminderItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14, gap: 12,
  },
  reminderBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  reminderIcon: {
    width: 40, height: 40, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  reminderContent: { flex: 1 },
  reminderNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 },
  reminderAnimal: { fontSize: 14, fontWeight: '600', color: '#111827' },
  urgentBadge: { backgroundColor: '#FEE2E2', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  urgentBadgeText: { fontSize: 10, fontWeight: '600', color: '#B91C1C' },
  reminderShift: { fontSize: 12, color: '#6B7280', marginBottom: 3 },
  reminderTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reminderTime: { fontSize: 11, color: '#9CA3AF' },
  logNowBtn: {
    backgroundColor: '#6366F1', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  logNowText: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
  closeReminders: {
    marginHorizontal: 20, marginTop: 8,
    paddingVertical: 10, alignItems: 'center',
    borderRadius: 10, backgroundColor: '#F9FAFB',
  },
  closeRemindersText: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
});
