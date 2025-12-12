import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import SecondaryButton from '../../components/secondaryButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function OnboardingScreen3() {
  const navigation = useNavigation<any>();

  const [firstName, setFirstName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  useEffect(function () {
    async function loadData() {
      setFirstName(await AsyncStorage.getItem('onboarding_firstName'));
      setEmail(await AsyncStorage.getItem('onboarding_email'));
      setBirthDate(await AsyncStorage.getItem('onboarding_birthDate'));
      setPassword(await AsyncStorage.getItem('onboarding_password'));
    }

    loadData();
  }, []);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<
    'male' | 'female' | 'other' | 'not specified'
  >('not specified');

  const [fitnessLevel, setFitnessLevel] = useState('');
  const [trainingFrequency, setTrainingFrequency] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');

  async function submitOnboarding() {
    if (!firstName || !email || !password || !birthDate) {
      return;
    }

    try {
      await axios.post('https://api.properform.app/users/createUser', {
        firstname: firstName,
        birthdate: birthDate,
        email: email,
        password: password,
        weight: Number(weight),
        height: Number(height),
        gender: gender,
        onboarding_completed: true,
        fitness_level: fitnessLevel,
        training_frequency: trainingFrequency,
        primary_goal: primaryGoal,
      });

      await AsyncStorage.setItem('onboardingFinished', 'true');
    } catch (error) {
      console.error('Fehler beim Onboarding', error);
    }
  }

  // TODO Can 11.12
  // add try and catch to submit onboarding, create ui

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Header />
        <Text style={styles.title}>Fast fertig!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
});
