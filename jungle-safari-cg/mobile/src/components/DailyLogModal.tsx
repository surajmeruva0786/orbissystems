import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { animalHealthQuestions, enclosureQuestions } from '../data/mockData';
import { DailyLogFormData } from '../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  animalName: string;
  shift: string;
}

const FEED_OPTIONS = ['25%', '50%', '75%', '100%'];
const ACTIVITY_OPTIONS = ['Very Active', 'Normal', 'Less Active', 'Very Dull'];

const defaultFormData: DailyLogFormData = {
  animalHealth: {
    feedConsumed: '50%',
    feedQuantity: '',
    waterNormal: true,
    digestionProblem: false,
    injuryNoticed: false,
    weaknessNoticed: false,
    activityLevel: 'Normal',
    alertResponsive: true,
    pestsNoticed: false,
    safetyRisks: false,
    additionalNotes: '',
  },
  enclosureReport: {
    cleaningTime: '',
    wasteRemoved: true,
    waterTroughCleaned: true,
    freshWaterAvailable: true,
    fencingSecure: true,
    allSecured: true,
    remarks: '',
  },
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function DailyLogModal({ visible, onClose, onSubmit, animalName, shift }: Props) {
  const [step, setStep] = useState<'recording' | 'review'>('recording');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentSection, setCurrentSection] = useState<'animal' | 'enclosure'>('animal');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingCompleted, setRecordingCompleted] = useState(false);
  const [formData, setFormData] = useState<DailyLogFormData>(defaultFormData);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestions = currentSection === 'animal' ? animalHealthQuestions : enclosureQuestions;
  const totalQuestions = animalHealthQuestions.length + enclosureQuestions.length;
  const currentGlobalIndex =
    currentSection === 'animal'
      ? currentQuestionIndex
      : animalHealthQuestions.length + currentQuestionIndex;
  const progress = ((currentGlobalIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    if (!visible) {
      resetModal();
    }
  }, [visible]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const next = prev + 1;
          if (next % 20 === 0) {
            advanceQuestion();
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, currentQuestionIndex, currentSection]);

  function advanceQuestion() {
    setCurrentQuestionIndex((idx) => {
      const questions = currentSection === 'animal' ? animalHealthQuestions : enclosureQuestions;
      if (idx < questions.length - 1) return idx + 1;
      if (currentSection === 'animal') {
        setCurrentSection('enclosure');
        return 0;
      }
      // All done
      setIsRecording(false);
      setRecordingCompleted(true);
      return idx;
    });
  }

  function handleNextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else if (currentSection === 'animal') {
      setCurrentSection('enclosure');
      setCurrentQuestionIndex(0);
    } else {
      setIsRecording(false);
      setRecordingCompleted(true);
    }
  }

  function handlePrevQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    } else if (currentSection === 'enclosure') {
      setCurrentSection('animal');
      setCurrentQuestionIndex(animalHealthQuestions.length - 1);
    }
  }

  async function handleRecordToggle() {
    if (isRecording) {
      // Stop recording
      try {
        await recordingRef.current?.stopAndUnloadAsync();
      } catch (_) {}
      recordingRef.current = null;
      setIsRecording(false);
    } else {
      // Request permissions and start recording
      try {
        const { granted } = await Audio.requestPermissionsAsync();
        if (!granted) {
          Alert.alert(
            'Microphone Permission Required',
            'Please allow microphone access to record animal observations.',
          );
          return;
        }
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
        );
        recordingRef.current = recording;
        setIsRecording(true);
      } catch (err) {
        Alert.alert('Recording Error', 'Could not start recording. Please try again.');
      }
    }
  }

  function resetModal() {
    setStep('recording');
    setIsRecording(false);
    setRecordingTime(0);
    setCurrentSection('animal');
    setCurrentQuestionIndex(0);
    setRecordingCompleted(false);
    setFormData(defaultFormData);
    if (timerRef.current) clearInterval(timerRef.current);
    recordingRef.current?.stopAndUnloadAsync().catch(() => {});
    recordingRef.current = null;
  }

  function handleSubmit() {
    onSubmit({ ...formData, recordingTime, shift, timestamp: new Date().toISOString() });
    onClose();
    resetModal();
  }

  function updateHealth<K extends keyof DailyLogFormData['animalHealth']>(
    key: K,
    value: DailyLogFormData['animalHealth'][K],
  ) {
    setFormData((f) => ({ ...f, animalHealth: { ...f.animalHealth, [key]: value } }));
  }

  function updateEnclosure<K extends keyof DailyLogFormData['enclosureReport']>(
    key: K,
    value: DailyLogFormData['enclosureReport'][K],
  ) {
    setFormData((f) => ({ ...f, enclosureReport: { ...f.enclosureReport, [key]: value } }));
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Daily Log — {animalName}</Text>
            <Text style={styles.headerSub}>
              {shift} Shift •{' '}
              {step === 'recording' ? 'Voice Recording' : 'Review & Submit'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => { onClose(); resetModal(); }}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {step === 'recording' ? (
            <RecordingStep
              currentGlobalIndex={currentGlobalIndex}
              totalQuestions={totalQuestions}
              progress={progress}
              currentSection={currentSection}
              currentQuestions={currentQuestions}
              currentQuestionIndex={currentQuestionIndex}
              recordingCompleted={recordingCompleted}
              isRecording={isRecording}
              recordingTime={recordingTime}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              onRecordToggle={handleRecordToggle}
              onProceedToReview={() => setStep('review')}
            />
          ) : (
            <ReviewStep
              formData={formData}
              recordingTime={recordingTime}
              updateHealth={updateHealth}
              updateEnclosure={updateEnclosure}
            />
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              if (step === 'review') setStep('recording');
              else { onClose(); resetModal(); }
            }}
          >
            <Text style={styles.cancelBtnText}>
              {step === 'review' ? 'Back' : 'Cancel'}
            </Text>
          </TouchableOpacity>
          {step === 'review' && (
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Submit Daily Log</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

// ── Recording Step ────────────────────────────────────────────────────────────

interface RecordingStepProps {
  currentGlobalIndex: number;
  totalQuestions: number;
  progress: number;
  currentSection: 'animal' | 'enclosure';
  currentQuestions: typeof animalHealthQuestions;
  currentQuestionIndex: number;
  recordingCompleted: boolean;
  isRecording: boolean;
  recordingTime: number;
  onNext: () => void;
  onPrev: () => void;
  onRecordToggle: () => void;
  onProceedToReview: () => void;
}

function RecordingStep({
  currentGlobalIndex, totalQuestions, progress,
  currentSection, currentQuestions, currentQuestionIndex,
  recordingCompleted, isRecording, recordingTime,
  onNext, onPrev, onRecordToggle, onProceedToReview,
}: RecordingStepProps) {
  return (
    <View style={rs.wrap}>
      {/* Progress */}
      <View style={rs.progressRow}>
        <Text style={rs.progressLabel}>
          Question {currentGlobalIndex + 1} of {totalQuestions}
        </Text>
        <Text style={rs.progressPct}>{Math.round(progress)}%</Text>
      </View>
      <View style={rs.progressBar}>
        <View style={[rs.progressFill, { width: `${progress}%` as any }]} />
      </View>

      {/* Section tabs */}
      <View style={rs.sectionRow}>
        <View style={[rs.sectionTab, currentSection === 'animal' && rs.sectionTabActive]}>
          <Text style={[rs.sectionTabText, currentSection === 'animal' && rs.sectionTabTextActive]}>
            Animal Health
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color="#D1D5DB" />
        <View style={[rs.sectionTab, currentSection === 'enclosure' && rs.sectionTabActive]}>
          <Text style={[rs.sectionTabText, currentSection === 'enclosure' && rs.sectionTabTextActive]}>
            Enclosure Report
          </Text>
        </View>
      </View>

      {/* Question card or completed state */}
      {!recordingCompleted ? (
        <View style={rs.questionCard}>
          <View style={rs.questionBadgeRow}>
            <View style={rs.qBadge}>
              <Text style={rs.qBadgeText}>Q{currentGlobalIndex + 1}</Text>
            </View>
            <Text style={rs.qSection}>
              {currentSection === 'animal' ? 'Animal Health' : 'Enclosure Report'}
            </Text>
          </View>
          <Text style={rs.questionText}>
            {currentQuestions[currentQuestionIndex].question}
          </Text>
          <Text style={rs.hintText}>
            {currentQuestions[currentQuestionIndex].hint}
          </Text>

          <View style={rs.navRow}>
            <TouchableOpacity
              style={[rs.navBtn, currentSection === 'animal' && currentQuestionIndex === 0 && rs.navBtnDisabled]}
              onPress={onPrev}
              disabled={currentSection === 'animal' && currentQuestionIndex === 0}
            >
              <Ionicons name="chevron-back" size={16} color="#374151" />
              <Text style={rs.navBtnText}>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity style={rs.navBtn} onPress={onNext}>
              <Text style={rs.navBtnText}>Next</Text>
              <Ionicons name="chevron-forward" size={16} color="#374151" />
            </TouchableOpacity>
          </View>
          {isRecording && (
            <Text style={rs.autoAdvance}>
              Auto-advance in {20 - (recordingTime % 20)}s
            </Text>
          )}
        </View>
      ) : (
        <View style={rs.completedCard}>
          <View style={rs.completedIcon}>
            <Ionicons name="checkmark" size={28} color="#FFFFFF" />
          </View>
          <Text style={rs.completedTitle}>Recording Completed</Text>
          <Text style={rs.completedSub}>
            Duration: {formatTime(recordingTime)}
          </Text>
          <TouchableOpacity style={rs.reviewBtn} onPress={onProceedToReview}>
            <Text style={rs.reviewBtnText}>Review Form</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Mic button */}
      <TouchableOpacity
        style={[
          rs.micButton,
          isRecording && rs.micButtonActive,
          recordingCompleted && rs.micButtonDone,
        ]}
        onPress={onRecordToggle}
        disabled={recordingCompleted}
        activeOpacity={0.8}
      >
        {recordingCompleted ? (
          <>
            <Ionicons name="volume-high" size={36} color="#9CA3AF" />
            <Text style={rs.micLabel}>Recording Saved — {formatTime(recordingTime)}</Text>
          </>
        ) : (
          <>
            <Ionicons
              name="mic"
              size={36}
              color={isRecording ? '#EF4444' : '#6B7280'}
            />
            <Text style={[rs.micLabel, isRecording && { color: '#EF4444' }]}>
              {isRecording ? 'Recording... Tap to Stop' : 'Tap to Start Recording'}
            </Text>
            {isRecording && (
              <View style={rs.liveRow}>
                <View style={rs.liveDot} />
                <Text style={rs.liveText}>LIVE • {formatTime(recordingTime)}</Text>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const rs = StyleSheet.create({
  wrap: { padding: 16 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 12, color: '#6B7280' },
  progressPct: { fontSize: 12, fontWeight: '600', color: '#7C3AED' },
  progressBar: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, marginBottom: 16 },
  progressFill: { height: 6, backgroundColor: '#7C3AED', borderRadius: 3 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionTab: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  sectionTabActive: { borderColor: '#7C3AED', backgroundColor: '#F5F3FF' },
  sectionTabText: { fontSize: 12, fontWeight: '600', color: '#9CA3AF' },
  sectionTabTextActive: { color: '#7C3AED' },
  questionCard: {
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 12, padding: 16, marginBottom: 16,
  },
  questionBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  qBadge: { backgroundColor: '#7C3AED', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  qBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  qSection: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
  questionText: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 },
  hintText: { fontSize: 13, color: '#6B7280', marginBottom: 14 },
  navRow: { flexDirection: 'row', gap: 10 },
  navBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 8,
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8,
  },
  navBtnDisabled: { opacity: 0.4 },
  navBtnText: { fontSize: 13, fontWeight: '500', color: '#374151' },
  autoAdvance: { fontSize: 11, color: '#9CA3AF', marginTop: 8 },
  completedCard: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 16,
  },
  completedIcon: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  completedTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4 },
  completedSub: { fontSize: 13, color: '#6B7280', marginBottom: 16 },
  reviewBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#7C3AED', borderRadius: 10,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  reviewBtnText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  micButton: {
    borderWidth: 2, borderColor: '#E5E7EB', borderStyle: 'dashed',
    borderRadius: 12, padding: 28, alignItems: 'center', gap: 10,
    backgroundColor: '#F9FAFB',
  },
  micButtonActive: { borderColor: '#EF4444', backgroundColor: '#FEF2F2' },
  micButtonDone: { opacity: 0.6 },
  micLabel: { fontSize: 14, fontWeight: '600', color: '#6B7280', textAlign: 'center' },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  liveText: { fontSize: 12, fontWeight: '700', color: '#EF4444' },
});

// ── Review Step ───────────────────────────────────────────────────────────────

interface ReviewStepProps {
  formData: DailyLogFormData;
  recordingTime: number;
  updateHealth: <K extends keyof DailyLogFormData['animalHealth']>(k: K, v: DailyLogFormData['animalHealth'][K]) => void;
  updateEnclosure: <K extends keyof DailyLogFormData['enclosureReport']>(k: K, v: DailyLogFormData['enclosureReport'][K]) => void;
}

function ReviewStep({ formData, recordingTime, updateHealth, updateEnclosure }: ReviewStepProps) {
  const { animalHealth, enclosureReport } = formData;
  return (
    <View style={rv.wrap}>
      {/* Notice */}
      <View style={rv.notice}>
        <Ionicons name="checkmark-circle" size={20} color="#7C3AED" />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={rv.noticeTitle}>Auto-Generated from Voice Recording</Text>
          <Text style={rv.noticeSub}>
            Review the info below and edit before submitting. Your{' '}
            {formatTime(recordingTime)} voice recording will be saved with this report.
          </Text>
        </View>
      </View>

      {/* Section A */}
      <Text style={rv.sectionTitle}>Section A: Daily Animal Health</Text>

      {/* Feeding */}
      <View style={rv.card}>
        <Text style={rv.cardTitle}>1. Feeding & Drinking</Text>
        <Text style={rv.fieldLabel}>Feed Consumed</Text>
        <View style={rv.pillRow}>
          {FEED_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[rv.pill, animalHealth.feedConsumed === opt && rv.pillActive]}
              onPress={() => updateHealth('feedConsumed', opt)}
            >
              <Text style={[rv.pillText, animalHealth.feedConsumed === opt && rv.pillTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[rv.fieldLabel, { marginTop: 12 }]}>Quantity (kg/L)</Text>
        <TextInput
          style={rv.input}
          value={animalHealth.feedQuantity}
          onChangeText={(v) => updateHealth('feedQuantity', v)}
          placeholder="e.g., 5 kg"
          placeholderTextColor="#9CA3AF"
        />

        <SwitchRow
          label="Water consumption normal"
          value={animalHealth.waterNormal}
          onChange={(v) => updateHealth('waterNormal', v)}
        />
        <SwitchRow
          label="Digestion problem noticed"
          value={animalHealth.digestionProblem}
          onChange={(v) => updateHealth('digestionProblem', v)}
        />
      </View>

      {/* Health */}
      <View style={rv.card}>
        <Text style={rv.cardTitle}>2. Health & Physical Condition</Text>
        <SwitchRow
          label="Injury / illness noticed"
          value={animalHealth.injuryNoticed}
          onChange={(v) => updateHealth('injuryNoticed', v)}
        />
        <SwitchRow
          label="Weak / lethargic"
          value={animalHealth.weaknessNoticed}
          onChange={(v) => updateHealth('weaknessNoticed', v)}
        />
      </View>

      {/* Behaviour */}
      <View style={rv.card}>
        <Text style={rv.cardTitle}>3. Behaviour & Activity</Text>
        <Text style={rv.fieldLabel}>Activity Level</Text>
        <View style={rv.pillRow}>
          {ACTIVITY_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[rv.pill, animalHealth.activityLevel === opt && rv.pillActive]}
              onPress={() => updateHealth('activityLevel', opt)}
            >
              <Text style={[rv.pillText, animalHealth.activityLevel === opt && rv.pillTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <SwitchRow
          label="Alert and responsive"
          value={animalHealth.alertResponsive}
          onChange={(v) => updateHealth('alertResponsive', v)}
        />
      </View>

      {/* Hygiene */}
      <View style={rv.card}>
        <Text style={rv.cardTitle}>4. Hygiene, Pest & Safety</Text>
        <SwitchRow
          label="Pests noticed"
          value={animalHealth.pestsNoticed}
          onChange={(v) => updateHealth('pestsNoticed', v)}
        />
        <SwitchRow
          label="Safety risks noticed"
          value={animalHealth.safetyRisks}
          onChange={(v) => updateHealth('safetyRisks', v)}
        />
      </View>

      {/* Additional */}
      <View style={rv.card}>
        <Text style={rv.cardTitle}>5. Additional Observations</Text>
        <TextInput
          style={[rv.input, { height: 80, textAlignVertical: 'top' }]}
          value={animalHealth.additionalNotes}
          onChangeText={(v) => updateHealth('additionalNotes', v)}
          placeholder="Any unusual or important observations..."
          placeholderTextColor="#9CA3AF"
          multiline
        />
      </View>

      {/* Section B */}
      <Text style={[rv.sectionTitle, { marginTop: 8 }]}>Section B: Enclosure Report</Text>

      <View style={rv.card}>
        <Text style={rv.cardTitle}>1. Cleanliness & Maintenance</Text>
        <Text style={rv.fieldLabel}>Cleaning Time</Text>
        <TextInput
          style={rv.input}
          value={enclosureReport.cleaningTime}
          onChangeText={(v) => updateEnclosure('cleaningTime', v)}
          placeholder="e.g., 08:30 AM"
          placeholderTextColor="#9CA3AF"
        />
        <SwitchRow label="Waste removed" value={enclosureReport.wasteRemoved} onChange={(v) => updateEnclosure('wasteRemoved', v)} />
        <SwitchRow label="Water trough cleaned" value={enclosureReport.waterTroughCleaned} onChange={(v) => updateEnclosure('waterTroughCleaned', v)} />
        <SwitchRow label="Fresh water available" value={enclosureReport.freshWaterAvailable} onChange={(v) => updateEnclosure('freshWaterAvailable', v)} />
      </View>

      <View style={rv.card}>
        <Text style={rv.cardTitle}>2. Security & Safety</Text>
        <SwitchRow label="Fencing secure" value={enclosureReport.fencingSecure} onChange={(v) => updateEnclosure('fencingSecure', v)} />
        <SwitchRow label="All gates secured" value={enclosureReport.allSecured} onChange={(v) => updateEnclosure('allSecured', v)} />
      </View>

      <View style={rv.card}>
        <Text style={rv.cardTitle}>3. Remarks</Text>
        <TextInput
          style={[rv.input, { height: 70, textAlignVertical: 'top' }]}
          value={enclosureReport.remarks}
          onChangeText={(v) => updateEnclosure('remarks', v)}
          placeholder="Any additional remarks or pending issues..."
          placeholderTextColor="#9CA3AF"
          multiline
        />
      </View>

      <View style={{ height: 16 }} />
    </View>
  );
}

function SwitchRow({
  label, value, onChange,
}: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={rv.switchRow}>
      <Text style={rv.switchLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#E5E7EB', true: '#DDD6FE' }}
        thumbColor={value ? '#7C3AED' : '#9CA3AF'}
      />
    </View>
  );
}

const rv = StyleSheet.create({
  wrap: { padding: 16 },
  notice: {
    flexDirection: 'row',
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  noticeTitle: { fontSize: 13, fontWeight: '600', color: '#111827', marginBottom: 3 },
  noticeSub: { fontSize: 12, color: '#6B7280', lineHeight: 18 },
  sectionTitle: {
    fontSize: 15, fontWeight: '700', color: '#111827',
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB,',
    paddingBottom: 8, marginBottom: 12,
  },
  card: {
    backgroundColor: '#F9FAFB', borderRadius: 12,
    padding: 14, marginBottom: 12,
  },
  cardTitle: { fontSize: 13, fontWeight: '600', color: '#111827', marginBottom: 10 },
  fieldLabel: { fontSize: 12, fontWeight: '500', color: '#6B7280', marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9,
    fontSize: 14, color: '#111827',
  },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 8, backgroundColor: '#FFFFFF',
  },
  pillActive: { borderColor: '#7C3AED', backgroundColor: '#F5F3FF' },
  pillText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  pillTextActive: { color: '#7C3AED', fontWeight: '600' },
  switchRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 8,
  },
  switchLabel: { fontSize: 14, color: '#374151', flex: 1 },
});

// ── Modal styles ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingHorizontal: 16, paddingTop: 20, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  headerSub: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  closeBtn: { padding: 4, marginLeft: 8 },
  body: { flex: 1 },
  footer: {
    flexDirection: 'row', gap: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderTopWidth: 1, borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  cancelBtn: {
    flex: 1, borderWidth: 1, borderColor: '#E5E7EB,',
    borderRadius: 12, paddingVertical: 13, alignItems: 'center',
  },
  cancelBtnText: { fontSize: 14, fontWeight: '500', color: '#374151' },
  submitBtn: {
    flex: 1, backgroundColor: '#7C3AED',
    borderRadius: 12, paddingVertical: 13, alignItems: 'center',
  },
  submitBtnText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});
