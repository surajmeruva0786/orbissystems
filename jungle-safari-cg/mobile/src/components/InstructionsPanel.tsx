import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Instruction } from '../types';

interface Props {
  instructions: Instruction[];
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function InstructionsPanel({ instructions }: Props) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const unreadCount = instructions.filter((i) => !i.read).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setCollapsed((v) => !v)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="notifications" size={18} color="#7C3AED" />
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Instructions</Text>
            <Text style={styles.headerSub}>
              {instructions.length} instruction{instructions.length !== 1 ? 's' : ''} received
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount} new</Text>
            </View>
          )}
          <Ionicons
            name={collapsed ? 'chevron-down' : 'chevron-up'}
            size={18}
            color="#6B7280"
            style={{ marginLeft: 8 }}
          />
        </View>
      </TouchableOpacity>

      {/* List */}
      {!collapsed && (
        <View>
          {instructions.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="notifications-off-outline" size={32} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No Instructions Yet</Text>
              <Text style={styles.emptySub}>
                Instructions from admins and vets will appear here
              </Text>
            </View>
          ) : (
            instructions.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.item,
                  !item.read && styles.itemUnread,
                  index < instructions.length - 1 && styles.itemBorder,
                ]}
              >
                {/* Icon */}
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: item.type === 'voice' ? '#EDE9FE' : '#DBEAFE' },
                  ]}
                >
                  <Ionicons
                    name={item.type === 'voice' ? 'volume-high' : 'chatbubble-ellipses'}
                    size={18}
                    color={item.type === 'voice' ? '#7C3AED' : '#2563EB'}
                  />
                </View>

                {/* Content */}
                <View style={styles.itemContent}>
                  <View style={styles.metaRow}>
                    <View
                      style={[
                        styles.typePill,
                        { backgroundColor: item.type === 'voice' ? '#EDE9FE' : '#DBEAFE' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.typePillText,
                          { color: item.type === 'voice' ? '#7C3AED' : '#1D4ED8' },
                        ]}
                      >
                        {item.type === 'voice' ? 'Voice' : 'Text'}
                      </Text>
                    </View>
                    {!item.read && (
                      <View style={styles.newPill}>
                        <Text style={styles.newPillText}>New</Text>
                      </View>
                    )}
                    <Text style={styles.time}>{formatTimestamp(item.timestamp)}</Text>
                  </View>

                  <Text style={styles.sender}>
                    From: <Text style={styles.senderName}>{item.sender}</Text>
                  </Text>

                  {item.type === 'text' ? (
                    <Text style={styles.messageText}>{item.content}</Text>
                  ) : (
                    <TouchableOpacity
                      style={styles.playBtn}
                      onPress={() =>
                        setPlayingId(playingId === item.id ? null : item.id)
                      }
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name={playingId === item.id ? 'pause' : 'play'}
                        size={14}
                        color="#FFFFFF"
                      />
                      <Text style={styles.playBtnText}>
                        {playingId === item.id ? 'Pause' : 'Play'}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {item.type === 'voice' && (
                    <Text style={styles.voiceLabel}>{item.content}</Text>
                  )}
                </View>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTextWrap: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  headerSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#FEE2E2',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B91C1C',
  },
  empty: {
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginTop: 12,
  },
  emptySub: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 4,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  itemUnread: {
    backgroundColor: '#EFF6FF',
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemContent: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  typePill: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typePillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  newPill: {
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  newPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B91C1C',
  },
  time: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  sender: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  senderName: {
    fontWeight: '600',
    color: '#111827',
  },
  messageText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  playBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  voiceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
  },
});
