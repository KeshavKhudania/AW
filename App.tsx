import React, {useState, useCallback, useEffect} from 'react';
import {StatusBar, useColorScheme, View, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/components/SplashScreen';
import LoginScreen from './src/components/LoginScreen';
import HomeScreen from './src/components/HomeScreen';
import ProfileScreen from './src/components/ProfileScreen';
import QRScannerScreen from './src/components/QRScannerScreen';

type AppFlow = 'splash' | 'login' | 'app';
type MainScreen = 'home' | 'scanner' | 'profile';

function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [flow, setFlow] = useState<AppFlow>('splash');
  const [currentScreen, setCurrentScreen] = useState<MainScreen>('home');

  const handleSplashFinish = useCallback(async () => {
    try {
      const authKey = await AsyncStorage.getItem('auth_key');
      setFlow(authKey ? 'app' : 'login');
    } catch {
      setFlow('login');
    }
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setFlow('app');
    setCurrentScreen('home');
  }, []);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem('auth_key');
    setFlow('login');
  }, []);

  const renderScreen = () => {
    if (flow === 'splash') {
      return <SplashScreen onFinish={handleSplashFinish} />;
    }
    
    if (flow === 'login') {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    // Main App Flow
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onScanPress={() => setCurrentScreen('scanner')}
            onProfilePress={() => setCurrentScreen('profile')}
            onLogout={handleLogout}
          />
        );
      case 'scanner':
        return (
          <QRScannerScreen 
            onBack={() => setCurrentScreen('home')}
            onScanComplete={(data) => {
              console.log('Scanned:', data);
              setCurrentScreen('home');
            }}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            onBack={() => setCurrentScreen('home')}
            onLogout={handleLogout}
          />
        );
      default:
        return <HomeScreen 
          onScanPress={() => setCurrentScreen('scanner')}
          onProfilePress={() => setCurrentScreen('profile')}
          onLogout={handleLogout}
        />;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          translucent
          backgroundColor="transparent"
        />
        {renderScreen()}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAF5',
  },
});

export default App;




