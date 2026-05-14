import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DesignSystem} from '../theme/DesignSystem';

const {width, height} = Dimensions.get('window');

interface QRScannerScreenProps {
  onBack: () => void;
  onScanComplete: (data: string) => void;
}

const QRScannerScreen = ({onBack, onScanComplete}: QRScannerScreenProps) => {
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      scanLineAnim.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [scanLineAnim]);

  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 260], // Based on viewfinder height
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Simulated Camera Background */}
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCZR_TITrfZ8ZBXZr7WHuSK7XIyQu2c2pKA8ED0WoLmre9eS-6_GMe-XRyifDOFqk2Xe1DaN2LEbPPCbH1_NkAME0-jnvrBifUc0-lU_-RZIV8ltaJg-aaw-Qxinpl9cyg8Pr-AqbOINmubWlIVWzFg1Fli0fiEmgiWwd6LdPi_G16p7tTAYfr9DGoMLDZIiYYdtms1zZI_H_fhYSCGkoNX5-rbTkpLg6vto4ME5FkIhHs27W_b1TqNQ_2HaOlj5_AWlnMP1z3C6t4' }}
        style={styles.cameraSim}
      />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <View style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
             <Image
               source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXMPpsKadhXRdMGAaylAbciwThbrekMR581REsE_psWSVb14M54V88_ZJyTWfO8Meh_8VoxOZLVv20v8KyfftzhN2AKZCpcQYzyVgWZYJR8oIhFd0GhVorY4tudLqPy5KwtGI238RgSr-DZKV7cTo4ADwEe59WBzbwmvkwGUEXaFQ-6sF2bm39GjVCpBvsuIGq7cR6uFyPlcYGT5sN0XB2RgaJNyoR7rGDVoPNTZGp-fy4DOcdOPm-OqVaurSTXe6MtAeQJpeVqcB3' }}
               style={styles.headerLogo}
               resizeMode="contain"
             />
             <Text style={styles.headerTitle}>AttendWise</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Instructions */}
          <View style={styles.instructionsCard}>
            <View style={styles.qrIconBox}>
               <View style={styles.qrIconInner} />
            </View>
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionTitle}>Scan to Attend</Text>
              <Text style={styles.instructionSub}>Point your camera at the session QR code.</Text>
            </View>
          </View>

          {/* Viewfinder */}
          <View style={styles.viewfinderContainer}>
            <View style={styles.viewfinder}>
               {/* Corner Guides */}
               <View style={[styles.corner, styles.topLeft]} />
               <View style={[styles.corner, styles.topRight]} />
               <View style={[styles.corner, styles.bottomLeft]} />
               <View style={[styles.corner, styles.bottomRight]} />
               
               {/* Scanning Line */}
               <Animated.View style={[styles.scanLine, {transform: [{translateY}]}]} />
               
               <View style={styles.hintBadge}>
                 <Text style={styles.hintText}>Align QR Code</Text>
               </View>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
             <View style={styles.buttonRow}>
               <TouchableOpacity style={styles.controlBtn}>
                 <View style={styles.controlIcon} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.controlBtn}>
                 <View style={styles.controlIcon} />
               </TouchableOpacity>
             </View>
             
             <View style={styles.courseBadge}>
               <Text style={styles.courseBadgeText}>Current: Intro to Botany</Text>
             </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraSim: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
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
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerLogo: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    ...DesignSystem.typography.headlineMedium,
    fontSize: 18,
    color: DesignSystem.colors.white,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  instructionsCard: {
    width: width * 0.85,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: DesignSystem.roundness.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 2,
    borderBottomColor: DesignSystem.colors.primary,
  },
  qrIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: DesignSystem.colors.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrIconInner: {
    width: 24,
    height: 24,
    backgroundColor: DesignSystem.colors.primary,
  },
  instructionTextContainer: {
    flex: 1,
  },
  instructionTitle: {
    ...DesignSystem.typography.headlineMedium,
    fontSize: 18,
    color: DesignSystem.colors.primary,
  },
  instructionSub: {
    ...DesignSystem.typography.bodyMedium,
    fontSize: 12,
    color: DesignSystem.colors.onSurfaceVariant,
  },
  viewfinderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewfinder: {
    width: 280,
    height: 280,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#96ae91',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 12,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    width: '90%',
    height: 2,
    backgroundColor: '#96ae91',
    shadowColor: '#96ae91',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  hintBadge: {
    backgroundColor: 'rgba(24, 44, 23, 0.4)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(180, 205, 174, 0.3)',
  },
  hintText: {
    ...DesignSystem.typography.labelLarge,
    color: '#fff',
  },
  controls: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },
  controlBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DesignSystem.colors.outlineVariant,
  },
  controlIcon: {
    width: 32,
    height: 32,
    backgroundColor: DesignSystem.colors.primary,
    opacity: 0.8,
  },
  courseBadge: {
    backgroundColor: 'rgba(125, 84, 80, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: DesignSystem.colors.secondary,
  },
  courseBadgeText: {
    ...DesignSystem.typography.labelLarge,
    color: '#fff',
  },
});

export default QRScannerScreen;
