import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DesignSystem} from '../theme/DesignSystem';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const ProfileScreen = ({onBack, onLogout}: ProfileScreenProps) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Identity Card */}
        <View style={styles.identityCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvaEjWx3Id7JgApwSI6WCdUYMCDpMlA1-YgKKcYje_aOF1jxC2uXe5oxHV_rBYmyuF395wnh1WQ1R1gC1vPeP7csiHsOpIAbu0UyIyvSLLENn_8n794gcZcl3-QcXE4wNNT1A7-4q53rx4jW6cPFE3gLdmiT0yCTWwzL3UYTOkOq-BaN4f_dvOmelLzHljX0RZecZ_wVFtDjTqdD4X-A2395vaxlI015eEm8Msl2MD5D7qDn4AVSfCXEg6SxLkXJ9N56VkS52TyGQf' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarBtn}>
               {/* Icon placeholder */}
               <View style={styles.editIcon} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.identityInfo}>
            <Text style={styles.studentName}>Julian Thorne</Text>
            <Text style={styles.rollNo}>Roll No: 2024-ENG-042</Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>DEPARTMENT</Text>
              <Text style={styles.detailValue}>Computer Science</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>SEMESTER</Text>
              <Text style={styles.detailValue}>6th Sem</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>GPA</Text>
              <Text style={[styles.detailValue, {color: DesignSystem.colors.primary}]}>3.88</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
           <View style={styles.statsHeader}>
              <View style={styles.statsIconBox} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Active Scholar</Text>
              </View>
           </View>
           <View style={styles.statsMain}>
              <Text style={styles.statsTitle}>Attendance</Text>
              <View style={styles.statsRow}>
                 <Text style={styles.statsPercentage}>94%</Text>
                 <Text style={styles.statsSub}>Overall</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, {width: '94%'}]} />
              </View>
           </View>
        </View>

        {/* Current Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Courses</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.courseItem}>
            <View style={[styles.courseIconBox, {backgroundColor: DesignSystem.colors.tertiaryContainer}]} />
            <View style={styles.courseContent}>
              <Text style={styles.courseName}>Algorithms & Data Structures</Text>
              <Text style={styles.courseInfo}>Mon, Wed • Room 302</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>

          <View style={styles.courseItem}>
            <View style={[styles.courseIconBox, {backgroundColor: DesignSystem.colors.secondaryContainer}]} />
            <View style={styles.courseContent}>
              <Text style={styles.courseName}>Database Management</Text>
              <Text style={styles.courseInfo}>Tue, Thu • Lab 04</Text>
            </View>
            <View style={[styles.statusBadge, styles.statusLate]}>
              <Text style={[styles.statusText, styles.statusTextLate]}>Late</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.settingsGroup}>
            <SettingsItem icon="edit" label="Edit Profile" />
            <SettingsItem icon="notifications" label="Notifications" />
            <SettingsItem icon="security" label="Security & Password" />
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <View style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsItem = ({icon, label}: any) => (
  <TouchableOpacity style={styles.settingsItem}>
    <View style={styles.settingsIconBox} />
    <Text style={styles.settingsLabel}>{label}</Text>
    <View style={styles.chevron} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignSystem.colors.background,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: DesignSystem.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: DesignSystem.colors.outlineVariant,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: DesignSystem.colors.onSurfaceVariant,
    opacity: 0.5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    ...DesignSystem.typography.headlineMedium,
    fontSize: 18,
    color: DesignSystem.colors.primary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  identityCard: {
    margin: 16,
    backgroundColor: DesignSystem.colors.white,
    borderRadius: DesignSystem.roundness.xl,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DesignSystem.colors.outlineVariant,
    ...DesignSystem.shadows.organic,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: DesignSystem.colors.primaryContainer,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: DesignSystem.colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: DesignSystem.colors.white,
  },
  editIcon: {
    width: 16,
    height: 16,
    backgroundColor: DesignSystem.colors.white,
  },
  identityInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  studentName: {
    ...DesignSystem.typography.headlineLarge,
    fontSize: 24,
    color: DesignSystem.colors.primary,
    marginBottom: 4,
  },
  rollNo: {
    ...DesignSystem.typography.bodyMedium,
    color: DesignSystem.colors.onSurfaceVariant,
  },
  detailsGrid: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  detailBox: {
    flex: 1,
    backgroundColor: DesignSystem.colors.surfaceContainer,
    padding: 12,
    borderRadius: DesignSystem.roundness.md,
    alignItems: 'center',
  },
  detailLabel: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.outline,
    marginBottom: 4,
  },
  detailValue: {
    ...DesignSystem.typography.labelLarge,
    fontSize: 13,
    color: DesignSystem.colors.onSurface,
    fontWeight: '700',
    textAlign: 'center',
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: DesignSystem.colors.primaryContainer,
    borderRadius: DesignSystem.roundness.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: DesignSystem.colors.primary,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: DesignSystem.colors.primary,
    opacity: 0.2,
  },
  badge: {
    backgroundColor: DesignSystem.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.white,
  },
  statsMain: {
    marginTop: 20,
  },
  statsTitle: {
    ...DesignSystem.typography.headlineMedium,
    color: DesignSystem.colors.white,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  statsPercentage: {
    ...DesignSystem.typography.displayLarge,
    fontSize: 36,
    color: DesignSystem.colors.white,
  },
  statsSub: {
    ...DesignSystem.typography.labelLarge,
    color: DesignSystem.colors.onPrimaryContainer,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: DesignSystem.colors.primary,
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: DesignSystem.colors.onPrimaryContainer,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...DesignSystem.typography.headlineMedium,
    fontSize: 20,
    color: DesignSystem.colors.primary,
    marginBottom: 16,
  },
  viewAll: {
    ...DesignSystem.typography.labelLarge,
    color: DesignSystem.colors.secondary,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignSystem.colors.white,
    padding: 12,
    borderRadius: DesignSystem.roundness.lg,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DesignSystem.colors.outlineVariant,
  },
  courseIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 12,
  },
  courseContent: {
    flex: 1,
  },
  courseName: {
    ...DesignSystem.typography.bodyMedium,
    fontWeight: '600',
    color: DesignSystem.colors.onSurface,
  },
  courseInfo: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.onSurfaceVariant,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: DesignSystem.colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusLate: {
    backgroundColor: DesignSystem.colors.secondaryContainer,
  },
  statusText: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.primary,
  },
  statusTextLate: {
    color: DesignSystem.colors.onSecondaryContainer,
  },
  settingsGroup: {
    backgroundColor: DesignSystem.colors.white,
    borderRadius: DesignSystem.roundness.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: DesignSystem.colors.outlineVariant,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: DesignSystem.colors.surfaceContainer,
  },
  settingsIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: DesignSystem.colors.surfaceContainer,
    marginRight: 16,
  },
  settingsLabel: {
    flex: 1,
    ...DesignSystem.typography.bodyMedium,
    color: DesignSystem.colors.onSurface,
  },
  chevron: {
    width: 16,
    height: 16,
    backgroundColor: DesignSystem.colors.outline,
    opacity: 0.3,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: DesignSystem.colors.surfaceVariant,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    backgroundColor: DesignSystem.colors.error,
    marginRight: 16,
    opacity: 0.8,
  },
  logoutText: {
    ...DesignSystem.typography.bodyMedium,
    fontWeight: '700',
    color: DesignSystem.colors.error,
  },
});

export default ProfileScreen;
