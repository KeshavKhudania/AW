import React, {useState, useRef, useCallback} from 'react';
import axios from 'axios';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  useColorScheme,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DesignSystem} from '../theme/DesignSystem';

// ── Device ID helper ───────────────────────────────────────────
const getDeviceId = async (): Promise<string> => {
  let deviceId = await AsyncStorage.getItem('device_id');
  if (!deviceId) {
    deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    await AsyncStorage.setItem('device_id', deviceId);
  }
  return deviceId;
};

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen = ({onLoginSuccess}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Animation values
  const buttonScale = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Input refs for keyboard navigation
  const rollNumberRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const clearError = useCallback(() => {
    if (error) {
      setError('');
    }
  }, [error]);

  const shakeError = useCallback(() => {
    Animated.sequence([
      Animated.timing(shakeAnim, {toValue: 8, duration: 60, useNativeDriver: true}),
      Animated.timing(shakeAnim, {toValue: -8, duration: 60, useNativeDriver: true}),
      Animated.timing(shakeAnim, {toValue: 6, duration: 60, useNativeDriver: true}),
      Animated.timing(shakeAnim, {toValue: 0, duration: 60, useNativeDriver: true}),
    ]).start();
  }, [shakeAnim]);

  const handlePressIn = useCallback(() => {
    Animated.spring(buttonScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  }, [buttonScale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [buttonScale]);

  const handleLogin = useCallback(async () => {
    if (!email.trim()) {
      setError('Please enter your university email');
      shakeError();
      return;
    }
    if (!rollNumber.trim()) {
      setError('Please enter your roll number');
      shakeError();
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      shakeError();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const deviceId = await getDeviceId();

      const response = await axios.post(
        'https://attendance.attendwise.in/api/student/auth/login',
        {
          login: email.trim(),
          roll_number: rollNumber.trim(),
          password: password,
          device_id: deviceId,
          fcm_token: null,
          platform: Platform.OS,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const data = response.data;

      if (data.key || data.token) {
        const key = data.key || data.token;
        await AsyncStorage.setItem('auth_key', key);
        await AsyncStorage.setItem('auth_data', JSON.stringify(data));
        onLoginSuccess();
      }
    } catch (err: any) {
      if (err.response) {
        const errorMsg =
          err.response.data?.message ||
          err.response.data?.error ||
          'Invalid credentials. Please try again.';
        setError(errorMsg);
      } else if (err.request) {
        setError('No internet connection.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      shakeError();
    } finally {
      setLoading(false);
    }
  }, [email, rollNumber, password, onLoginSuccess, shakeError]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Background Decoration */}
      <View style={styles.bgDecorationContainer}>
        <View style={styles.topCircle} />
        <View style={styles.bottomCircle} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXMPpsKadhXRdMGAaylAbciwThbrekMR581REsE_psWSVb14M54V88_ZJyTWfO8Meh_8VoxOZLVv20v8KyfftzhN2AKZCpcQYzyVgWZYJR8oIhFd0GhVorY4tudLqPy5KwtGI238RgSr-DZKV7cTo4ADwEe59WBzbwmvkwGUEXaFQ-6sF2bm39GjVCpBvsuIGq7cR6uFyPlcYGT5sN0XB2RgaJNyoR7rGDVoPNTZGp-fy4DOcdOPm-OqVaurSTXe6MtAeQJpeVqcB3' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSub}>Please enter your university credentials.</Text>
          </View>

          {/* Form */}
          <Animated.View style={[styles.form, {transform: [{translateX: shakeAnim}]}]}>
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Roll Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Roll No.</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 2024-ENG-001"
                  placeholderTextColor={DesignSystem.colors.outline}
                  value={rollNumber}
                  onChangeText={text => {
                    setRollNumber(text);
                    clearError();
                  }}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => rollNumberRef.current?.focus()}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>University Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={rollNumberRef}
                  style={styles.input}
                  placeholder="student@university.edu"
                  placeholderTextColor={DesignSystem.colors.outline}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    clearError();
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={DesignSystem.colors.outline}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    clearError();
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="go"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(prev => !prev)}>
                  <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me */}
            <TouchableOpacity style={styles.rememberRow} activeOpacity={0.7}>
              <View style={styles.checkboxPlaceholder} />
              <Text style={styles.rememberText}>Remember this device</Text>
            </TouchableOpacity>

            {/* Action Button */}
            <Animated.View style={{transform: [{scale: buttonScale}]}}>
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={DesignSystem.colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Sign In to Portal</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.enrollText}>
              New student? <Text style={styles.enrollLink}>Request Enrollment</Text>
            </Text>
            <View style={styles.footerLinks}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
              <Text style={styles.footerLink}>Terms of Service</Text>
              <Text style={styles.footerLink}>IT Support</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignSystem.colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  bgDecorationContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: -1,
  },
  topCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: DesignSystem.colors.primary,
    opacity: 0.05,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: DesignSystem.colors.secondary,
    opacity: 0.05,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    height: 80,
    width: 160,
    marginBottom: 24,
  },
  welcomeTitle: {
    ...DesignSystem.typography.headlineMedium,
    color: DesignSystem.colors.onSurface,
    marginBottom: 8,
  },
  welcomeSub: {
    ...DesignSystem.typography.bodyMedium,
    color: DesignSystem.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  errorBox: {
    backgroundColor: DesignSystem.colors.errorContainer,
    borderRadius: DesignSystem.roundness.md,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: DesignSystem.colors.error,
  },
  errorText: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.error,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    ...DesignSystem.typography.labelLarge,
    color: DesignSystem.colors.onSurfaceVariant,
    marginLeft: 4,
  },
  forgotText: {
    ...DesignSystem.typography.labelLarge,
    color: DesignSystem.colors.secondary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignSystem.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: DesignSystem.colors.outlineVariant,
    borderRadius: DesignSystem.roundness.xl,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    ...DesignSystem.typography.bodyMedium,
    color: DesignSystem.colors.onSurface,
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: 8,
  },
  eyeText: {
    ...DesignSystem.typography.labelLarge,
    color: DesignSystem.colors.outline,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    marginLeft: 4,
  },
  checkboxPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: DesignSystem.colors.outlineVariant,
    marginRight: 12,
  },
  rememberText: {
    ...DesignSystem.typography.labelLarge,
    color: DesignSystem.colors.onSurfaceVariant,
  },
  button: {
    height: 56,
    backgroundColor: DesignSystem.colors.primary,
    borderRadius: DesignSystem.roundness.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...DesignSystem.shadows.organic,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    ...DesignSystem.typography.labelLarge,
    color: DesignSystem.colors.white,
    fontWeight: '600',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  enrollText: {
    ...DesignSystem.typography.bodyMedium,
    color: DesignSystem.colors.onSurfaceVariant,
    marginBottom: 32,
  },
  enrollLink: {
    color: DesignSystem.colors.secondary,
    fontWeight: '700',
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  footerLink: {
    ...DesignSystem.typography.labelSmall,
    color: DesignSystem.colors.outline,
  },
});

export default LoginScreen;

