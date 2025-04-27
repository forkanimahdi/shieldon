import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import PinLock from './pinLock';
import HomeScreen from './home';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [unlocked, setUnlocked] = useState(true);

  useEffect(() => {
    const loadPIN = async () => {
      const saved = await AsyncStorage.getItem("securePIN");
      console.log(saved);

      if (saved) {
        setUnlocked(false)
      }
    };
    loadPIN();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!unlocked ? (
        <PinLock onSuccess={() => setUnlocked(true)} />
      ) : (
        <HomeScreen />
      )}
    </SafeAreaView>
  );
}
