import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DesignSystem} from '../theme/DesignSystem';

const {width} = Dimensions.get('window');

interface HomeScreenProps {
  onScanPress: () => void;
  onProfilePress: () => void;
  onLogout: () => void;
}

const HomeScreen = ({onScanPress, onProfilePress, onLogout}: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXMPpsKadhXRdMGAaylAbciwThbrekMR581REsE_psWSVb14M54V88_ZJyTWfO8Meh_8VoxOZLVv20v8KyfftzhN2AKZCpcQYzyVgWZYJR8oIhFd0GhVorY4tudLqPy5KwtGI238RgSr-DZKV7cTo4ADwEe59WBzbwmvkwGUEXaFQ-6sF2bm39GjVCpBvsuIGq7cR6uFyPlcYGT5sN0XB2RgaJNyoR7rGDVoPNTZGp-fy4DOcdOPm-OqVaurSTXe6MtAeQJpeVqcB3' }}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>AttendWise</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyW2N4WDeBTCTfICNRkZQ2PmCxgSrtxlJd-e3Z2cBuuvCpa0YTashpiOmHnFQcYjyXZT7CilLx00z7_Zn-bW3G8g3dVv_-ypJjEzrC9i-WbdLuLgziY3CVTh_Jt77tDLZPjtnPLSyLekGJblzYixlYkWZRrh6R77xMFXcgcIv6eMLf-d6WshvwEryv83L6BDQvD3_YW_7oKn8OWRudpOLnMcCurKHggCexveqwgSWznLPJeTDdAw4VF8PwM9kUm7Yh6gn1k4_-c9Ii' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome back, Alex</Text>
          <Text style={styles.welcomeSub}>Your academic progress is looking strong this semester.</Text>
        </View>

        {/* Overall Stats Card */}
        <View style={styles.mainStatsCard}>
          <View style={styles.statsCardContent}>
            <Text style={styles.statsLabel}>OVERALL ATTENDANCE</Text>
            <View style={styles.percentageRow}>
              <Text style={styles.percentageText}>94.2%</Text>
              <View style={styles.trendBadge}>
                <Text style={styles.trendText}>▲ 2.1%</Text>
              </View>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, {width: '94.2%'}]} />
            </View>
            
            <Text style={styles.statsInfo}>Exceeding university average by 12%</Text>
          </View>
          {/* Decorative element */}
          <View style={styles.cardDecoration} />
        </View>

        {/* Mini Stats Grid */}
        <View style={styles.miniStatsGrid}>
          <View style={styles.miniStatCard}>
            <View style={styles.iconBox}>
               {/* Icon placeholder */}
               <View style={[styles.icon, {backgroundColor: DesignSystem.colors.surfaceContainerHigh}]} />
            </View>
            <Text style={styles.miniStatLabel}>Total Classes</Text>
            <Text style={styles.miniStatValue}>156</Text>
          </View>
          <View style={styles.miniStatCard}>
            <View style={styles.iconBox}>
               {/* Icon placeholder */}
               <View style={[styles.icon, {backgroundColor: DesignSystem.colors.surfaceContainerHigh}]} />
            </View>
            <Text style={styles.miniStatLabel}>Attended</Text>
            <Text style={styles.miniStatValue}>147</Text>
          </View>
        </View>

        {/* Recent Attendance */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Attendance</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recordsList}>
          <AttendanceItem 
            course="Advanced Organic Chemistry" 
            code="CHM-402 • Prof. Thorne"
            date="Oct 24 • 09:00 AM"
            status="Present"
          />
          <AttendanceItem 
            course="Macroeconomics & Policy" 
            code="ECO-210 • Prof. Sterling"
            date="Oct 23 • 02:30 PM"
            status="Absent"
          />
          <AttendanceItem 
            course="Statistical Mechanics" 
            code="PHY-305 • Prof. Aris"
            date="Oct 23 • 11:00 AM"
            status="Present"
          />
          <AttendanceItem 
            course="Medieval Literature" 
            code="ENG-150 • Prof. Whitmore"
            date="Oct 22 • 10:00 AM"
            status="Present"
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
           <View style={styles.navIconActive} />
           <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onScanPress}>
           <View style={styles.navIcon} />
           <Text style={styles.navText}>Scan QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onProfilePress}>
           <View style={styles.navIcon} />
           <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const AttendanceItem = ({course, code, date, status}: any) => {
  const isPresent = status === 'Present';
  
  return (
    <View style={styles.recordItem}>
      <View style={styles.recordInfo}>
        <Text style={styles.courseName}>{course}</Text>
        <Text style={styles.courseCode}>{code}</Text>
        <Text style={styles.recordDate}>{date}</Text>
      </View>
      <View style={[
        styles.statusBadge, 
        isPresent ? styles.statusPresent : styles.statusAbsent
      ]}>
        <Text style={[
          styles.statusText,
          isPresent ? styles.statusTextPresent : styles.statusTextAbsent
        ]}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignSystem.colors.background,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: DesignSystem.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: DesignSystem.colors.outlineVariant,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  headerTitle: {
    ...DesignSystem.typography.headlineMedium,
    fontSize: 20,
    color: DesignSystem.colors.primary,
    fontWeight: '700',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: DesignSystem.colors.primary,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  welcomeSection: {
    padding: 24,
  },
  welcomeTitle: {
    ...DesignSystem.typography.headlineLarge,
    fontSize: 28,
    color: DesignSystem.colors.primary,
    marginBottom: 4,
  },
  welcomeSub: {
    ...DesignSystem.typography.bodyMedium,
    color: DesignSystem.colors.onSurfaceVariant,
  },
  mainStatsCard: {
    margin: 16,
    borderRadius: DesignSystem.roundness.xl,
    backgroundColor: DesignSystem.colors.primary,
    padding: 24,
    overflow: 'hidden',
    ...DesignSystem.shadows.organic,
  },
  statsCardContent: {
    zIndex: 1,
  },
  statsLabel: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.onPrimaryContainer,
    letterSpacing: 2,
  },
  percentageRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
    gap: 12,
  },
  percentageText: {
    ...DesignSystem.typography.displayLarge,
    color: DesignSystem.colors.white,
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
  },
  trendText: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.onPrimaryContainer,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginTop: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: DesignSystem.colors.white,
  },
  statsInfo: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.onPrimaryContainer,
    marginTop: 12,
  },
  cardDecoration: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  miniStatsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 32,
  },
  miniStatCard: {
    flex: 1,
    backgroundColor: DesignSystem.colors.white,
    borderRadius: DesignSystem.roundness.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: DesignSystem.colors.outlineVariant,
  },
  iconBox: {
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  miniStatLabel: {
    ...DesignSystem.typography.labelLarge,
    color: DesignSystem.colors.onSurfaceVariant,
  },
  miniStatValue: {
    ...DesignSystem.typography.headlineMedium,
    color: DesignSystem.colors.primary,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    ...DesignSystem.typography.headlineMedium,
    fontSize: 20,
    color: DesignSystem.colors.primary,
  },
  viewMore: {
    ...DesignSystem.typography.labelLarge,
    color: DesignSystem.colors.secondary,
  },
  recordsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: DesignSystem.colors.white,
    borderRadius: DesignSystem.roundness.lg,
    borderWidth: 1,
    borderColor: DesignSystem.colors.outlineVariant,
  },
  recordInfo: {
    flex: 1,
  },
  courseName: {
    ...DesignSystem.typography.bodyMedium,
    fontWeight: '600',
    color: DesignSystem.colors.primary,
  },
  courseCode: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.onSurfaceVariant,
    marginTop: 2,
  },
  recordDate: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.onSurface,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: DesignSystem.roundness.full,
    borderWidth: 1,
  },
  statusPresent: {
    backgroundColor: DesignSystem.colors.surfaceContainerHighest,
    borderColor: 'rgba(24, 44, 23, 0.1)',
  },
  statusAbsent: {
    backgroundColor: DesignSystem.colors.secondaryContainer,
    borderColor: 'rgba(125, 84, 80, 0.1)',
  },
  statusText: {
    ...DesignSystem.typography.labelSmall,
    fontWeight: '600',
  },
  statusTextPresent: {
    color: DesignSystem.colors.primary,
  },
  statusTextAbsent: {
    color: DesignSystem.colors.onSecondaryContainer,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: DesignSystem.colors.surfaceContainer,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...DesignSystem.shadows.organic,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navItemActive: {
    backgroundColor: DesignSystem.colors.primaryContainer,
    paddingVertical: 8,
    borderRadius: 20,
  },
  navIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: DesignSystem.colors.onSurfaceVariant,
    opacity: 0.5,
    marginBottom: 4,
  },
  navIconActive: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: DesignSystem.colors.onPrimaryContainer,
    marginBottom: 4,
  },
  navText: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.onSurfaceVariant,
  },
  navTextActive: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.onPrimaryContainer,
    fontWeight: '600',
  },
});

export default HomeScreen;
