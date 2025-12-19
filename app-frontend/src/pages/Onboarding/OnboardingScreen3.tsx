import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import SecondaryButton from '../../components/secondaryButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import InputField from '../../components/input';
import PrimaryButton from '../../components/primaryButton';

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
      console.log('sending data to api');
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
      console.log('success');

      await AsyncStorage.setItem('onboardingFinished', 'true');

      navigation.replace('Main');
    } catch (error) {
      console.error('Fehler beim Onboarding', error);
    }
  }

  // TODO Can 
  // like onboardingscreen2, add errors etc.

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Header />
            <Text style={styles.title}>Fast fertig!</Text>

            <InputField
              title="Größe (cm)"
              value={height}
              placeholder="z.B. 180"
              onChange={setHeight}
            ></InputField>

            <Text style={styles.label}>Geschlecht</Text>
            <Picker
              selectedValue={gender}
              onValueChange={value => setGender(value)}
            >
              <Picker.Item label="Keine Angabe" value="not specified" />
              <Picker.Item label="Männlich" value="male" />
              <Picker.Item label="Weiblich" value="female" />
              <Picker.Item label="Divers" value="other" />
            </Picker>

            <Text style={styles.label}>Geschlecht</Text>
            <Picker
              selectedValue={fitnessLevel}
              onValueChange={value => setFitnessLevel(value)}
            >
              <Picker.Item label="Anfänger" value="beginner" />
              <Picker.Item label="Fortgeschritten" value="intermediate" />
              <Picker.Item label="Experte" value="advanced" />
            </Picker>

            <Text style={styles.label}>Trainingshäufigkeit</Text>
            <Picker
              selectedValue={trainingFrequency}
              onValueChange={value => setTrainingFrequency(value)}
            >
              <Picker.Item label="1–2x pro Woche" value="1-2" />
              <Picker.Item label="3–4x pro Woche" value="3-4" />
              <Picker.Item label="5+ pro Woche" value="5+" />
            </Picker>

            <Text style={styles.label}>Primäres Ziel</Text>
            <Picker
              selectedValue={primaryGoal}
              onValueChange={value => setPrimaryGoal(value)}
            >
              <Picker.Item label="Muskelaufbau" value="muscle_gain" />
              <Picker.Item label="Abnehmen" value="weight_loss" />
              <Picker.Item label="Fitness verbessern" value="fitness" />
            </Picker>

            <SecondaryButton
              text="LOS GEHT'S!"
              onPress={submitOnboarding}
            ></SecondaryButton>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
  label: {
    marginTop: 20,
    marginBottom: 4,
    fontWeight: '500',
  },
});
