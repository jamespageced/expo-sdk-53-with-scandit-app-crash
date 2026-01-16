import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { navScreens } from '@app/utils';
import type { StackParamsList } from '@app/types';

export default function App(): ReactComponent {
  const navigation: any = useNavigation<StackNavigationProp<StackParamsList>>();

  return (
    <View style={styles.container}>
      <Pressable style={styles.btnTapToScan} onPress={() => navigation.navigate(navScreens.simpleScandit.route)}>
        <Text style={styles.btnTapToScanTxt}>TAP&nbsp;TO&nbsp;SCAN</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  btnTapToScan: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 80,
    padding: 16,
    backgroundColor: '#2370B3',
    borderColor: '#2370B3',
    borderWidth: 1
  },
  btnTapToScanTxt: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
    fontWeight: 'normal',
    letterSpacing: 0.4,
    color: '#ffffff'
  }
});
