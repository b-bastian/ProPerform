import React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PrimaryButton from '../components/primaryButton';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Profile: undefined;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View>
      <Text>🏠 Home</Text>
      <PrimaryButton
        text="Go to Profile"
        onPress={() => console.log('Go to Profile pressed')}
      />
    </View>
  );
}
