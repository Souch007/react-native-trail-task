import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppStack from './src/navigation/app-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApiProvider } from './src/hooks/useAppConfig';
import { View } from 'react-native';


function App(): React.JSX.Element {
 
  return (
    <SafeAreaProvider >
      <GestureHandlerRootView style={{ flex: 1 }}>
          <ApiProvider>
            <AppStack />
          </ApiProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
