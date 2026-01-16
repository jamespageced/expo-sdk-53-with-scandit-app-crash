import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationConductor } from '@app/navigation';

export default function App(): ReactComponent {
  return (
    <SafeAreaProvider>
      <NavigationConductor />
    </SafeAreaProvider>
  );
}
