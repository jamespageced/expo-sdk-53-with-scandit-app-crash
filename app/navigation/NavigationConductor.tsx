import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, SimpleScandit } from '@app/screens';
import { navRoutesToTitles, navScreens } from '@app/utils';
import type { StackParamsList } from '@app/types';

const Stack = createStackNavigator<StackParamsList>();

export default function NavigationConductor() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={navScreens.home.route}
        screenOptions={({ route }) => ({
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#003069' },
          headerRightContainerStyle: { paddingRight: 20 },
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
            fontWeight: 'normal',
            color: 'hsla(0,0%,100%,.8)'
          },
          headerTintColor: 'hsla(0,0%,100%,.8)',
          headerTitle: navRoutesToTitles[route.name],
          headerRight: null as any,
          headerLeft: null as any
        })}
      >
        <Stack.Group>
          <Stack.Screen name={navScreens.home.route} component={Home} />
          <Stack.Screen
            name={navScreens.simpleScandit.route}
            component={SimpleScandit}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
