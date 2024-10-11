import React from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/Navigation/StackNavigator';
import { View } from 'react-native';
import 'react-native-gesture-handler';


export const navigateRef: any = createNavigationContainerRef();

const App = () => {
  return (
    <NavigationContainer ref={navigateRef}>
      <View style={{ flex: 1 }}>
        <StackNavigator />
      </View>
    </NavigationContainer>
  );
}

export default App;

