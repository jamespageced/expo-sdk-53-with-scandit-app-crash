import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;

export const HomePage = () => {
  const navigation = useNavigation<HomePageNavigationProp>();

  const handleNavigateToScan = async () => {
    navigation.navigate('scan');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>BarcodeCaptureSimple</Text>
        <Text style={styles.subtitle}>Test the most advanced barcode scanning software</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToScan}>
        <Text style={styles.buttonText}>Click&nbsp;To&nbsp;Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 60
  },
  contentContainer: {
    width: '100%',
    maxWidth: 350,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24
  },
  title: {
    color: '#077F8A',
    fontFamily: 'Inter',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 38,
    letterSpacing: 0.5
  },
  subtitle: {
    color: '#16191C',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16191C',
    borderRadius: 8,
    width: '100%',
    maxWidth: 350,
    gap: 8
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.5
  }
});
