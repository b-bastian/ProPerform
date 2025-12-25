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
import { parseDecimal } from '../../utils/number';

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
  const [trainingFrequency, setTrainingFrequency] = useState<number | null>(
    null,
  );
  const [primaryGoal, setPrimaryGoal] = useState('');

  async function submitOnboarding() {
    if (!firstName || !email || !password || !birthDate) {
      console.log('missing base fields ');
      return;
    }
    const weightNum = parseDecimal(weight);
    const heightNum = parseDecimal(height);

    if (weightNum === null || heightNum === null) {
      console.log('invalid weight or height');
      return;
    }

    if (!fitnessLevel) {
      console.log('missing fitness level');
      return;
    }

    if (trainingFrequency === null) {
      console.log('missing training frequency');
      return;
    }

    if (!primaryGoal) {
      console.log('missing primary goal');
      return;
    }

    const requestBody = {
      firstname: firstName,
      birthdate: birthDate,
      email,
      password,
      weight: weightNum,
      height: heightNum,
      gender,
      onboarding_completed: true,
      fitness_level: fitnessLevel,
      training_frequency: trainingFrequency,
      primary_goal: primaryGoal,
    };

    try {
      console.log('sending data to api', requestBody);

      await axios.post(
        'https://api.properform.app/users/createUser',
        requestBody,
      );

      await AsyncStorage.setItem('onboardingFinished', 'true');
    } catch (error: any) {
      if (error.response) {
        console.log('STATUS:', error.response.status);
        console.log('DATA:', error.response.data);
        console.log('HEADERS:', error.response.headers);
      } else {
        console.log('ERROR:', error.message);
      }
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
              placeholder="z.B. 180.4"
              onChange={setHeight}
            ></InputField>

            <InputField
              title="Gewicht (kg)"
              value={weight}
              placeholder="z.B. 80.7"
              onChange={setWeight}
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

            <Text style={styles.label}>Fitness-Level</Text>
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
              <Picker.Item label="Bitte wählen" value={null} />
              <Picker.Item label="1–2x pro Woche" value={2} />
              <Picker.Item label="3–4x pro Woche" value={4} />
              <Picker.Item label="5+ pro Woche" value={7} />
            </Picker>

            <Text style={styles.label}>Primäres Ziel</Text>
            <Picker
              selectedValue={primaryGoal}
              onValueChange={value => setPrimaryGoal(value)}
            >
              <Picker.Item label="Bitte wählen" value={null} />
              <Picker.Item label="Muskelaufbau" value="build muscle" />
              <Picker.Item label="Abnehmen" value="lose weight" />
              <Picker.Item label="Gewicht halten" value="stay at weight" />
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
