import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../pages/HomeScreen';
import ProfileScreen from '../pages/ProfileScreen';
import OnboardingScreen from '../pages/Onboarding/OnboardingScreen';
import OnboardingScreen2 from '../pages/Onboarding/OnboardingScreen2';
import OnboardingScreen3 from '../pages/Onboarding/OnboardingScreen3';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon = route.name === 'Home' ? 'home' : 'person';
          return <Icon name={icon} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const finished = await AsyncStorage.getItem('onboardingFinished');
      setShowOnboarding(!finished);
    })();
  }, []);

  if (showOnboarding === null) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding ? (
        <>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen
            name="OnboardingScreen2"
            component={OnboardingScreen2}
          />
          <Stack.Screen
            name="OnboardingScreen3"
            component={OnboardingScreen3}
          />
        </>
      ) : (
        <Stack.Screen name="Main" component={MainTabs} />
      )}
    </Stack.Navigator>
  );
}
