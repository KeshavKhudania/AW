/**
 * Academic Arbor Design System
 * Sophisticated, trustworthy, and organic.
 */

export const DesignSystem = {
  colors: {
    primary: '#182C17',
    primaryContainer: '#2D422B',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#96AE91',
    
    secondary: '#7D5450',
    secondaryContainer: '#FEC7C2',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#7A514D',
    
    tertiary: '#222A10',
    tertiaryContainer: '#374023',
    onTertiary: '#FFFFFF',
    
    background: '#F9FAF5',
    onBackground: '#1A1C19',
    
    surface: '#F9FAF5',
    surfaceVariant: '#E2E3DE',
    onSurface: '#1A1C19',
    onSurfaceVariant: '#434841',
    
    outline: '#747970',
    outlineVariant: '#C3C8BE',
    
    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#93000A',
    
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F3F4EF',
    surfaceContainer: '#EDEEE9',
    surfaceContainerHigh: '#E7E9E4',
    surfaceContainerHighest: '#E2E3DE',
    
    white: '#FFFFFF',
    transparent: 'transparent',
  },
  
  typography: {
    displayLarge: {
      fontSize: 48,
      fontWeight: '700' as const,
      lineHeight: 56,
      letterSpacing: -0.96,
    },
    headlineLarge: {
      fontSize: 32,
      fontWeight: '600' as const,
      lineHeight: 40,
      letterSpacing: -0.32,
    },
    headlineMedium: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 28,
    },
    bodyMedium: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    labelLarge: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 20,
      letterSpacing: 0.14,
    },
    labelSmall: {
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 16,
      letterSpacing: 0.48,
    },
  },
  
  spacing: {
    unit: 4,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    marginMobile: 16,
    marginDesktop: 48,
    gutter: 24,
  },
  
  roundness: {
    sm: 4,
    default: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  shadows: {
    organic: {
      shadowColor: '#182C17',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 40,
      elevation: 5,
    },
  },
};
