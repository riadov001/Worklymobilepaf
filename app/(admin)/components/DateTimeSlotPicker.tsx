import React, { useState, useMemo } from "react";
import {
  View, Text, StyleSheet, Pressable, ScrollView, Modal, Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/theme";

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

const DAYS_FR = ["L", "M", "M", "J", "V", "S", "D"];
const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Array<{ day: number | null; dateKey: string | null }> = [];
  for (let i = 0; i < offset; i++) days.push({ day: null, dateKey: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({ day: d, dateKey });
  }
  return days;
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateFR(dateKey: string, time?: string) {
  const [y, m, d] = dateKey.split("-");
  const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  const dayName = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
  const dayLabel = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  const datePart = `${dayLabel} ${d} ${MONTHS_FR[parseInt(m) - 1]} ${y}`;
  return time ? `${datePart} à ${time}` : datePart;
}

interface DateTimeSlotPickerProps {
  onSelect: (dateKey: string, timeSlot: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

export function DateTimeSlotPickerButton({
  onSelect, selectedDate, selectedTime,
}: DateTimeSlotPickerProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const [visible, setVisible] = useState(false);

  // Internal date for browsing — separate from confirmed selectedDate
  const [localDate, setLocalDate] = useState<string>(() => selectedDate || "");
  const [calMonth, setCalMonth] = useState<Date>(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split("-");
      return new Date(parseInt(y), parseInt(m) - 1, 1);
    }
    return new Date();
  });

  const calYear = calMonth.getFullYear();
  const calMonthIdx = calMonth.getMonth();
  const today = todayKey();
  const calDays = useMemo(() => buildCalendarDays(calYear, calMonthIdx), [calYear, calMonthIdx]);

  const handleOpen = () => {
    setLocalDate(selectedDate || "");
    if (selectedDate) {
      const [y, m] = selectedDate.split("-");
      setCalMonth(new Date(parseInt(y), parseInt(m) - 1, 1));
    }
    setVisible(true);
  };

  const handleDayPress = (dateKey: string) => {
    Haptics.selectionAsync();
    setLocalDate(dateKey);
  };

  const handleSlotPress = (slot: string) => {
    Haptics.selectionAsync();
    onSelect(localDate, slot);
    setTimeout(() => setVisible(false), 150);
  };

  return (
    <>
      <Pressable
        style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.border }]}
        onPress={handleOpen}
      >
        <Ionicons name="calendar-outline" size={20} color={theme.primary} />
        <Text style={[styles.buttonText, { color: selectedDate ? theme.text : theme.textTertiary }]}>
          {selectedDate && selectedTime
            ? formatDateFR(selectedDate, selectedTime)
            : "Sélectionner date et heure"}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
      </Pressable>

      <Modal visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <View style={[styles.header, { paddingTop: topPad + 12, borderBottomColor: theme.border }]}>
            <Pressable style={styles.closeBtn} onPress={() => setVisible(false)}>
              <Ionicons name="close" size={24} color={theme.text} />
            </Pressable>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Date & Heure</Text>
            <View style={{ width: 44 }} />
          </View>

          <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
            {/* Month navigation */}
            <View style={[styles.calHeader, { borderBottomColor: theme.border }]}>
              <Pressable
                style={[styles.navBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
                onPress={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
              >
                <Ionicons name="chevron-back" size={20} color={theme.text} />
              </Pressable>
              <Text style={[styles.calMonthLabel, { color: theme.text }]}>
                {MONTHS_FR[calMonthIdx]} {calYear}
              </Text>
              <Pressable
                style={[styles.navBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
                onPress={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
              >
                <Ionicons name="chevron-forward" size={20} color={theme.text} />
              </Pressable>
            </View>

            {/* Day labels */}
            <View style={styles.daysHeader}>
              {DAYS_FR.map((d, i) => (
                <Text key={i} style={[styles.dayLabel, { color: theme.textTertiary }]}>{d}</Text>
              ))}
            </View>

            {/* Calendar grid */}
            <View style={styles.calGrid}>
              {calDays.map((cell, i) => {
                if (!cell.day || !cell.dateKey) {
                  return <View key={i} style={styles.calCell} />;
                }
                const isSelected = localDate === cell.dateKey;
                const isToday = cell.dateKey === today;
                const isPast = cell.dateKey < today;

                return (
                  <Pressable
                    key={i}
                    style={[
                      styles.calCell,
                      isSelected && { backgroundColor: theme.primary, borderRadius: 10 },
                      isToday && !isSelected && { borderWidth: 1.5, borderColor: theme.primary, borderRadius: 10 },
                      isPast && { opacity: 0.35 },
                    ]}
                    onPress={() => !isPast && handleDayPress(cell.dateKey!)}
                    disabled={isPast}
                  >
                    <Text style={[
                      styles.calCellText,
                      { color: isSelected ? "#fff" : (isToday ? theme.primary : theme.text) },
                    ]}>
                      {cell.day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Time slots — shown once a date is selected */}
            {localDate ? (
              <View style={styles.slotsContainer}>
                <Text style={[styles.slotsTitle, { color: theme.text }]}>
                  Créneau — {formatDateFR(localDate)}
                </Text>
                <View style={styles.slotsGrid}>
                  {TIME_SLOTS.map((slot) => {
                    const isSelectedSlot = selectedDate === localDate && selectedTime === slot;
                    return (
                      <Pressable
                        key={slot}
                        style={[
                          styles.slot,
                          {
                            backgroundColor: isSelectedSlot ? theme.primary : theme.surface,
                            borderColor: isSelectedSlot ? theme.primary : theme.border,
                          },
                        ]}
                        onPress={() => handleSlotPress(slot)}
                      >
                        <Text style={[styles.slotText, { color: isSelectedSlot ? "#fff" : theme.text }]}>
                          {slot}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View style={styles.hint}>
                <Ionicons name="hand-left-outline" size={32} color={theme.textTertiary} />
                <Text style={[styles.hintText, { color: theme.textTertiary }]}>
                  Sélectionnez une date pour voir les créneaux
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  closeBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  calHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calMonthLabel: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  daysHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  dayLabel: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingVertical: 4,
  },
  calGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 28,
  },
  calCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  calCellText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  slotsContainer: {
    marginTop: 4,
  },
  slotsTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  slot: {
    width: "30%",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slotText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  hint: {
    alignItems: "center",
    paddingTop: 32,
    gap: 12,
  },
  hintText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
});
