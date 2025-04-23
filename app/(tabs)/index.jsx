import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import PinLock from './pinLock';
import HomeScreen from './home';


export default function App() {
  const [unlocked, setUnlocked] = useState(true);

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
