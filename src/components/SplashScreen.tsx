import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DesignSystem} from '../theme/DesignSystem';

const SplashScreen = ({onFinish}: {onFinish: () => void}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        onFinish();
      }, 1500);
    });
  }, [fadeAnim, scaleAnim, textOpacity, textTranslateY, onFinish]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Organic Background Elements */}
      <View style={styles.bgDecoration}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>

      <View style={styles.center}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          }}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXMPpsKadhXRdMGAaylAbciwThbrekMR581REsE_psWSVb14M54V88_ZJyTWfO8Meh_8VoxOZLVv20v8KyfftzhN2AKZCpcQYzyVgWZYJR8oIhFd0GhVorY4tudLqPy5KwtGI238RgSr-DZKV7cTo4ADwEe59WBzbwmvkwGUEXaFQ-6sF2bm39GjVCpBvsuIGq7cR6uFyPlcYGT5sN0XB2RgaJNyoR7rGDVoPNTZGp-fy4DOcdOPm-OqVaurSTXe6MtAeQJpeVqcB3' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{translateY: textTranslateY}],
            alignItems: 'center',
          }}>
          <Text style={styles.title}>AttendWise</Text>
          <Text style={styles.subtitle}>Smart Attendance, Simplified</Text>
          <View style={styles.taglineBox}>
            <Text style={styles.taglineText}>Nurturing Intellectual Growth</Text>
          </View>
        </Animated.View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Academic Arbor</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignSystem.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgDecoration: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: -1,
  },
  circle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: DesignSystem.colors.primary,
    opacity: 0.03,
  },
  circle2: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: DesignSystem.colors.secondary,
    opacity: 0.03,
  },
  center: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    width: 180,
    height: 90,
    marginBottom: 32,
  },
  title: {
    ...DesignSystem.typography.headlineLarge,
    color: DesignSystem.colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...DesignSystem.typography.bodyMedium,
    color: DesignSystem.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  taglineBox: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: DesignSystem.colors.surfaceContainer,
    borderRadius: DesignSystem.roundness.full,
    borderWidth: 1,
    borderColor: DesignSystem.colors.outlineVariant,
  },
  taglineText: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.outline,
    letterSpacing: 1,
  },
});

export default SplashScreen;

